import json
import re
from langchain_openai import ChatOpenAI
import os

llm = ChatOpenAI(
    model="openrouter/owl-alpha",
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

async def commute_agent(state):

    listings = state.get("listings", [])
    votes = state.get("votes", {})
    reasoning = state.get("reasoning", {})

    commute_reasoning = {}

    for l in listings:
        lid = l["id"]
        distance = l.get("distanceKm", 0)
        duration = l.get("durationMinutes", 0)

        # 🧠 LLM judges REAL commute (not fake)
        prompt = f"""
You are a commute expert.

Listing:
- Distance: {distance} km
- Travel time: {duration} minutes

Rules:
- Score commute from 1 to 10
- Consider realistic usability (traffic, fatigue, distance)
- Shorter + faster = better

Return JSON:
{{
  "score": 8,
  "reason": "short commute and manageable distance"
}}
"""

        response = await llm.ainvoke(prompt)

        raw = response.content

        try:
            match = re.search(r"\{.*\}", raw, re.DOTALL)
            parsed = json.loads(match.group()) if match else {}
        except:
            parsed = {"score": 5, "reason": "default"}

        score = float(parsed.get("score", 5))

        votes[lid] = votes.get(lid, 0) + score
        commute_reasoning[lid] = parsed.get("reason", "")

    reasoning["commute"] = commute_reasoning

    state["votes"] = votes
    state["reasoning"] = reasoning

    return state