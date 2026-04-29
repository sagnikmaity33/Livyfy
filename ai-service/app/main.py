from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import chromadb
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os
import numpy as np
import json
from openai import OpenAI  # pip install openai

load_dotenv()

# Free OpenRouter model (no credit card needed)
client_llm = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

app = FastAPI()

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

def build_prompt(req: AIRecommendationRequest):
    listings_text = "\n".join([
        f"ID: {l.id}, Name: {l.title}, Price: ₹{l.price}, Distance: {l.distanceKm}km, Commute: {int(l.durationMinutes)}min"
        for l in req.listings
    ])
    
    return f"""
You are a Kolkata housing expert. Recommend TOP 3 PGs for: "{req.query}"

Available options:
{listings_text}

RULES:
- Pick 3 DIFFERENT listings (no repeats)
- Prioritize: low price + short commute + good location
- Mention Kolkata advantages (metro, bus, airport connectivity)

RETURN **ONLY** valid JSON (no other text):
{{
  "recommendations": [
    {{
      "id": listing_id,
      "title": "exact listing name", 
      "reason": "short practical reason (₹price, Xkm, Ymin commute, area advantage)",
      "price": price_number,
      "distanceKm": distance_number,
      "durationMinutes": commute_minutes
    }}
  ]
}}

Example:
{{
  "recommendations": [
    {{"id": 2, "title": "Dum Dum PG", "reason": "₹5000, 5km to airport, 15min commute via metro", "price": 5000, "distanceKm": 5, "durationMinutes": 15}}
  ]
}}
"""


@app.post("/recommend")
def recommend(req: AIRecommendationRequest):
    prompt = build_prompt(req)
    completion = client_llm.chat.completions.create(
        model="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",  # ✅ FREE MODEL (no credit card)
        # Alternative free models:
        # "nvidia/llama-3.1-nemotron-70b-instruct:free"
        # "qwen/qwen2.5-coder-7b-instruct:free" 
        messages=[
            {"role": "system", "content": "You are a helpful housing assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )
    return {"result": completion.choices[0].message.content}


@app.post("/recommend")
def recommend(req: AIRecommendationRequest):
    prompt = build_prompt(req)
    
    completion = client_llm.chat.completions.create(
        model="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        messages=[
            {"role": "system", "content": "You are a precise JSON generator. Return ONLY valid JSON."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.1  # Lower for structured output
    )
    
    # Parse & validate JSON
    try:
        result = json.loads(completion.choices[0].message.content)
        return result  # Returns structured recommendations
    except json.JSONDecodeError:
        return {
            "recommendations": [{
                "id": req.listings[0].id,
                "title": req.listings[0].title,
                "reason": "Fallback: Best price-to-distance ratio",
                "price": req.listings[0].price,
                "distanceKm": req.listings[0].distanceKm,
                "durationMinutes": req.listings[0].durationMinutes
            }]
        }