# 🏗️ LIVYFY BACKEND CONTEXT DOCUMENT

---

# 🧠 PROJECT OVERVIEW

**Livyfy** is a **campus housing marketplace platform** connecting:

* 🧑‍🎓 Renters (clients)
* 🏠 Owners (property listers)

Core idea:

> Smart housing search using **filters + AI semantic ranking**

---

# 🎯 CURRENT GOAL (MVP → NEXT PHASE)

### ✅ Completed (Current State)

* Listing CRUD
* Search (filter-based)
* AI Semantic Search (ChromaDB)
* Hybrid Search (DB + AI ranking)
* Dockerized system (backend + db + AI)

---

### 🚀 Next Goals

* Improve ranking quality
* Add booking flow
* Add authentication (JWT)
* Add monetization (subscription/promotion)

---

# 🧱 ARCHITECTURE STYLE

👉 Feature-based modular architecture

Each module = independent feature

```
controller → service → repository → model → dto
```

---

# 📁 BACKEND FOLDER STRUCTURE

```
backend/
└── src/main/java/com/Ai4EveryOne/Livyfy/
    ├── common/
    │   ├── config/        # Beans (RestTemplate, etc.)
    │   ├── exception/     # Global exception handler
    │   ├── response/      # ApiResponse wrapper
    │
    ├── listing/
    │   ├── controller/
    │   ├── service/
    │   ├── repository/
    │   ├── model/
    │   └── dto/
    │
    ├── search/
    │   ├── controller/
    │   ├── service/
    │   └── dto/
    │
    ├── chatbot/ (AI bridge)
    │   ├── controller/
    │   ├── service/
    │   └── client/
    │
    └── LivyfyApplication.java
```

---

# 🐳 DOCKER ARCHITECTURE

```
docker-compose.yml
```

### Services:

* backend (Spring Boot)
* db (PostgreSQL)
* ai-service (FastAPI + ChromaDB)

### Flow:

```
User → Backend → DB
              → AI Service
```

---

# 🤖 AI SERVICE ARCHITECTURE

### Stack:

* FastAPI
* ChromaDB (vector DB)
* SentenceTransformers (embeddings)

---

### Endpoints:

| Endpoint | Purpose                 |
| -------- | ----------------------- |
| `/add`   | Store listing embedding |
| `/query` | Semantic search         |
| `/rank`  | Rank given documents    |

---

### Persistence:

```python
persist_directory="/data"
```

Docker volume:

```
chroma_data:/data
```

---

# 🔁 CORE FLOW

## 🏠 Listing Creation

```
POST /listings
→ Save in DB
→ Send to AI (/add)
→ Store embedding
```

---

## 🔍 Hybrid Search

```
POST /search/hybrid

1. Apply DB filters
2. Send filtered results to AI (/rank)
3. AI ranks results
4. Return sorted listings
```

---

# 🔌 API ENDPOINTS

---

## 📍 LISTING

```
POST   /api/v1/listings
GET    /api/v1/listings
GET    /api/v1/listings/{id}
PATCH  /api/v1/listings/{id}/verify
```

---

## 🔍 SEARCH

```
POST /api/v1/search/hybrid
```

---

## 🤖 AI

```
POST /api/v1/ai/query
GET  /api/v1/ai/test
```

---

# 🧠 HYBRID SEARCH LOGIC

```text
User Query
   ↓
DB Filter (location, price, verified)
   ↓
Shortlisted Listings
   ↓
AI Ranking (semantic similarity)
   ↓
Sorted Results
```

---

# ⚙️ IMPORTANT CONFIGS

---

## 🔹 RestTemplate Bean

```java
@Bean
public RestTemplate restTemplate() {
    return new RestTemplate();
}
```

---

## 🔹 ApiResponse Wrapper

Standard response format:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

---

## 🔹 Exception Handling

Global handler in:

```
common/exception/
```

---

# 🧪 TESTING FLOW

---

## 1. Start system

```
docker compose up --build
```

---

## 2. Create listing

```
POST /listings
```

---

## 3. Query AI

```
POST /ai/query
```

---

## 4. Hybrid search

```
POST /search/hybrid
```

---

# 🚨 KNOWN LIMITATIONS (CURRENT)

* No authentication (JWT pending)
* No booking system
* No pagination in search
* No geo search
* AI ranking is basic (cosine similarity only)

---

# 🚀 NEXT ARCHITECTURAL STEPS

---

## 🔥 HIGH PRIORITY

* Improve ranking logic
* Add pagination
* Add JWT authentication

---

## ⚡ MEDIUM

* Booking system
* Owner ↔ renter workflow
* Listing verification automation

---

## 🧠 ADVANCED

* Geo search (lat/lng)
* Landmark-based queries
* Recommendation system

---

# 💬 FINAL NOTE

This system is:

> **Modular + Dockerized + AI-integrated backend**

It is designed to scale into:

* marketplace platform
* AI-powered search engine
* monetizable SaaS product

---

**Status: MVP COMPLETE → ENTERING PRODUCT PHASE**
