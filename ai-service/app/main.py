from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from sentence_transformers import SentenceTransformer

app = FastAPI()

# init
client = chromadb.Client(
    settings=chromadb.config.Settings(
        persist_directory="/data"
    )
)

collection = client.get_or_create_collection("listings")

model = SentenceTransformer("all-MiniLM-L6-v2")

class QueryRequest(BaseModel):
    query: str

class ListingItem(BaseModel):
    id: str
    text: str

# 🔹 ADD LISTING TO VECTOR DB
@app.post("/add")
def add_listing(item: ListingItem):
    embedding = model.encode(item.text).tolist()

    collection.add(
        ids=[item.id],
        documents=[item.text],
        embeddings=[embedding]
    )
    client.persist()

    return {"status": "added"}

# 🔹 QUERY
@app.post("/query")
def query_ai(req: QueryRequest):

    query_embedding = model.encode(req.query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    return {
        "results": results["documents"][0]
    }

 @app.post("/rank")
 def rank_listings(data: dict):

     query = data["query"]
     documents = data["documents"]

     query_embedding = model.encode(query)

     doc_embeddings = model.encode(documents)

     # cosine similarity
     import numpy as np

     scores = np.dot(doc_embeddings, query_embedding)

     ranked = [
         doc for _, doc in sorted(
             zip(scores, documents),
             reverse=True
         )
     ]

     return {"results": ranked}