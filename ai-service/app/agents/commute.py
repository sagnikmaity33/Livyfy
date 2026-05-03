import json
from langchain_openai import ChatOpenAI
import os
import re


llm = ChatOpenAI(
    model="minimax/minimax-m2.5:free",
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

async def commute_agent(state):

    prompt = f"""
You are a commute expert.

Listings:
{state['listings']}

Return JSON votes + reasons.
"""

    response = await llm.ainvoke(prompt)

    raw = response.content
    json_match = re.search(r"\{.*\}", raw, re.DOTALL)
    parsed = json.loads(json_match.group()) if json_match else {}

    for lid, score in parsed["votes"].items():
        state["votes"][int(lid)] += score

    state["reasoning"]["commute"] = parsed["reasons"]

    return state