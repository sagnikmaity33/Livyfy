from langgraph.graph import StateGraph, END
from app.agents.budget import budget_agent
from app.agents.commute import commute_agent

def build_graph():

    workflow = StateGraph(dict)

    workflow.add_node("budget", budget_agent)
    workflow.add_node("commute", commute_agent)

    workflow.set_entry_point("budget")

    workflow.add_edge("budget", "commute")
    workflow.add_edge("commute", END)

    return workflow.compile()