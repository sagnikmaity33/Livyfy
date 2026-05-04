import json
from langchain_openai import ChatOpenAI
import os

llm = ChatOpenAI(
    model="openrouter/owl-alpha",
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

async def final_decision_agent(state):

    votes = state.get("votes", {})
    reasoning = state.get("reasoning", {})
    listings = state.get("listings", [])

    # ---- SORT LISTINGS ----
    sorted_ids = sorted(votes, key=votes.get, reverse=True)
    top_ids = sorted_ids[:3]

    # ---- MAP LISTINGS ----
    listing_map = {l["id"]: l for l in listings}

    top_listings = []
    for lid in top_ids:
        if lid in listing_map:
            l = listing_map[lid]
            l["score"] = votes.get(lid, 0)
            top_listings.append(l)

    # ---- LLM EXPLANATION ----
    prompt = f"""
You are a smart housing advisor.

User query: {state['query']}

Top listings (with scores):
{top_listings}

Agent reasoning:
{reasoning}

Task:
- Pick BEST 2–3 listings
- Explain clearly WHY they are best
- Mention tradeoffs
- Keep it user-friendly

Return STRICT JSON:

{{
  "best_choices": [
    {{
      "id": 1,
      "title": "PG name",
      "score": 8.5,
      "why_best": "Best balance of price and commute",
      "pros": ["cheap", "close"],
      "cons": ["slightly crowded"]
    }}
  ]
}}
"""

    response = await llm.ainvoke(prompt)

    raw = response.content
    print("FINAL AGENT RAW:", raw)

    # ---- SAFE PARSE ----
    import re
    try:
        json_match = re.search(r"\{.*\}", raw, re.DOTALL)
        parsed = json.loads(json_match.group()) if json_match else {}
    except:
        parsed = {}

    state["final"] = parsed

    return state