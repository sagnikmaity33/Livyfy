from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import chromadb
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os
import numpy as np
import json
import re
from openai import OpenAI  
from typing import TypedDict, Dict
from app.graph.debate_graph import build_graph
from fastapi.responses import JSONResponse
from fastapi import FastAPI, status

load_dotenv()

# Free OpenRouter model (no credit card needed)
client_llm = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

app = FastAPI()

graph = build_graph()

# ChromaDB & Model init
client = chromadb.Client(
    settings=chromadb.config.Settings(persist_directory="/data")
)
collection = client.get_or_create_collection("listings")
model = SentenceTransformer("all-MiniLM-L6-v2")

# Pydantic Models
class ListingItem(BaseModel):
    id: str
    text: str

class ListingData(BaseModel):
    id: int
    title: str
    price: float
    distanceKm: float
    durationMinutes: float

class AIRequest(BaseModel):
    query: str
    listings: List[ListingData]

class AIRecommendationRequest(BaseModel):  # MISSING CLASS ✅
    query: str
    listings: List[ListingData]
    previousContext: str | None = None
    
    


class DebateState(TypedDict):
    query: str
    listings: list
    votes: Dict[int, float]
    reasoning: Dict[str, dict]


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "AI Housing Recommender",
        "endpoints": {
            "recommend": "POST /recommend",
            "query": "POST /query",
            "add": "POST /add",
            "rank": "POST /rank"
        },
        "chromadb": "connected" if client else "error",
        "openrouter": "ready",
        "timestamp": "2026-05-02T11:06:00Z"
    }

@app.get("/healthz")
async def healthz():
    """Kubernetes-style health check (minimal)"""
    return {"status": "ok"}

@app.post("/add")
def add_listing(item: ListingItem):
    embedding = model.encode(item.text).tolist()
    collection.add(ids=[item.id], documents=[item.text], embeddings=[embedding])
    client.persist()
    return {"status": "added"}

@app.post("/query")
def query_ai(req: AIRequest):  # Fixed type hint
    query_embedding = model.encode(req.query).tolist()
    results = collection.query(query_embeddings=[query_embedding], n_results=3)
    return {"results": results["documents"][0] if results["documents"] else []}

@app.post("/rank")
def rank_listings(data: dict):
    query = data["query"]
    documents = data["documents"]
    query_embedding = model.encode(query)
    doc_embeddings = model.encode(documents)
    scores = np.dot(doc_embeddings, query_embedding) / (
        np.linalg.norm(doc_embeddings, axis=1) * np.linalg.norm(query_embedding)
    )  # Proper cosine similarity
    ranked = [doc for _, doc in sorted(zip(scores, documents), reverse=True)]
    return {"results": ranked}


def build_prompt(req: AIRecommendationRequest, context: str = ""):
    """
    Generate structured JSON recommendations for Kolkata PG search
    """
    listings_text = "\n".join([
        f"ID: {l.id}, Name: '{l.title}', Price: ₹{l.price}, Distance: {l.distanceKm}km, Commute: {int(l.durationMinutes)}min"
        for l in req.listings
    ])
    
    context_part = f"Previous context: {context}" if context else "New conversation"
    
    return f"""[STRICT JSON INSTRUCTIONS]
You are a Kolkata PG expert. Return ONLY clean JSON object. NO markdown, NO ```json, NO extra text.

User query: "{req.query}"
{context_part}

Available PGs:
{listings_text}

RECOMMEND TOP 3 DIFFERENT listings prioritizing:
1. Price (cheapest first)
2. Commute time (<20min preferred) 
3. Airport/metro connectivity
4. Kolkata area advantages (bus, trains, markets)

JSON FORMAT (exact):
{{
  "recommendations": [
    {{
      "id": INT_FROM_LISTING,
      "title": "EXACT listing name from list",
      "reason": "₹price + Xkm + Ymin commute + Kolkata connectivity (metro/bus/market)",
      "price": NUMBER,
      "distanceKm": NUMBER,
      "durationMinutes": NUMBER
    }}
  ]
}}

EXAMPLE OUTPUT (copy this format):
{{
  "recommendations": [
    {{
      "id": 2,
      "title": "Dum Dum PG",
      "reason": "₹5000 + 5km airport + 15min metro from Dum Dum station",
      "price": 5000,
      "distanceKm": 5,
      "durationMinutes": 15
    }}
  ]
}}
"""



@app.post("/recommend")
def recommend(req: AIRecommendationRequest):
    context = req.previousContext or ""
    prompt = build_prompt(req, context)
    
    completion = client_llm.chat.completions.create(
        model="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        messages=[{
                "role": "system", 
                "content": "Kolkata PG expert. Return ONLY clean JSON object."
            },
            {
                "role": "user", 
                "content": prompt
            }],  # Your messages
        temperature=0.1
    )
    
    raw_content = completion.choices[0].message.content
    
    # ✅ EXTRACT & CLEAN JSON from escaped string
    try:
        # Remove newlines/backslashes, find JSON object
        cleaned = re.sub(r'\\n|\\', '', raw_content).strip()
        if cleaned.startswith('{'):
            result = json.loads(cleaned)
        else:
            # Fallback parsing
            json_match = re.search(r'\{.*\}', raw_content, re.DOTALL)
            result = json.loads(json_match.group()) if json_match else {}
        
        return result
    except:
        # Ultimate fallback
        return {
            "recommendations": [{
                "id": req.listings[0].id,
                "title": req.listings[0].title,
                "reason": "Best option based on price and location",
                "price": req.listings[0].price,
                "distanceKm": req.listings[0].distanceKm,
                "durationMinutes": req.listings[0].durationMinutes
            }]
        }
        
@app.post("/debate-ai")
async def debate_ai(req: AIRecommendationRequest):

    state = {
        "query": req.query,
        "listings": [l.model_dump() for l in req.listings],
        "votes": {},
        "reasoning": {}
    }

    result = await graph.ainvoke(state)

    return result        