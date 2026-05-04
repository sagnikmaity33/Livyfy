import json
from langchain_openai import ChatOpenAI
import os
import re

llm = ChatOpenAI(
    model="openrouter/owl-alpha",
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

async def budget_agent(state):

    prompt = f"""
User wants: {state['query']}

Listings:
{state['listings']}

Return JSON:
{{
 "votes": {{ "1": 8 }},
 "reasons": {{ "1": "cheap" }}
}}
"""

    response = await llm.ainvoke(prompt)

    raw = response.content
    json_match = re.search(r"\{.*\}", raw, re.DOTALL)
    parsed = json.loads(json_match.group()) if json_match else {}
    print("RAW LLM OUTPUT:", response.content)

    for lid, score in parsed["votes"].items():
        state["votes"][int(lid)] = state["votes"].get(int(lid), 0) + score

    state["reasoning"]["budget"] = parsed["reasons"]

    return state