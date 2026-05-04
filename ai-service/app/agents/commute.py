import json
from langchain_openai import ChatOpenAI
import os
import re


llm = ChatOpenAI(
    model="openrouter/owl-alpha",
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

async def commute_agent(state):

    prompt = f"""
STRICT RULES:
- ONLY return valid JSON
- votes MUST be numbers between 1 and 10
- DO NOT return words like "up/down"
- DO NOT use titles as keys, ONLY numeric IDs

Listings:
{state['listings']}

Return EXACT:
{{
  "votes": {{
    "1": 8,
    "2": 6
  }},
  "reasons": {{
    "1": "cheap and close",
    "2": "far but affordable"
  }}
}}
"""

    response = await llm.ainvoke(prompt)

    raw = response.content
    json_match = re.search(r"\{.*\}", raw, re.DOTALL)
    parsed = json.loads(json_match.group()) if json_match else {}
    
    print("RAW LLM OUTPUT:", response.content)

    for lid, score in parsed.get("votes", {}).items():
        # ---- FIX ID ----
        try:
            lid_int = int(lid)
        except:
            continue
        
        try:
            score_val = float(score)
        except:
            # handle "up/down" or garbage
            if str(score).lower() in ["up", "good", "yes"]:
                score_val = 8
            elif str(score).lower() in ["down", "bad", "no"]:
                score_val = 4
            else:
                continue  # skip garbage 
            
            
        state["votes"][lid_int] = state["votes"].get(lid_int, 0) + score_val    

    return state