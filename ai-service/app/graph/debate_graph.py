# from langgraph.graph import StateGraph, END
# from app.agents.budget import budget_agent
# from app.agents.commute import commute_agent
# from app.agents.final import final_decision_agent

# def build_graph():

#     workflow = StateGraph(dict)

#     workflow.add_node("budget", budget_agent)
#     workflow.add_node("commute", commute_agent)
#     workflow.add_node("final", final_decision_agent)

#     workflow.set_entry_point("budget")

#     workflow.add_edge("budget", "commute")
#     workflow.add_edge("commute", "final")
#     workflow.add_edge("final", END)

#     return workflow.compile()


from langgraph.graph import StateGraph, END
from app.agents.budget import budget_agent
from app.agents.commute_agent import commute_agent
from app.agents.final import final_decision_agent


def build_graph():
    # ✅ workflow defined here
    workflow = StateGraph(dict)  # ✅ Missing line!
    
    workflow.add_node("budget", budget_agent)
    workflow.add_node("commute", commute_agent)
    workflow.add_node("final", final_decision_agent)
    
    
    workflow.set_entry_point("budget")
    
    workflow.add_edge("budget", "commute")
    workflow.add_edge("commute", "final")
    workflow.add_edge("final", END)
    
    return workflow.compile()