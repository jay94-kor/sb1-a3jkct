import streamlit as st
from components.po_form import render_po_form
from utils.db_handler import get_projects, save_po
from datetime import datetime

def po_issue():
    st.title("PO Issue")
    
    # Get projects
    projects = get_projects()
    if not projects:
        st.warning("No projects found. Please create a project first.")
        return
        
    # Project selection
    selected_project = st.selectbox(
        "Select Project",
        options=[p['project_id'] for p in projects],
        format_func=lambda x: next(p['project_name'] for p in projects if p['project_id'] == x)
    )
    
    # Render PO form
    po_data = render_po_form()
    
    if po_data:
        # Generate PO number
        po_number = f"PO-{datetime.now().year}-{datetime.now().month:02d}-{len(projects):04d}"
        po_data['po_number'] = po_number
        po_data['project_id'] = selected_project
        
        # Save PO
        if save_po(po_data):
            st.success(f"PO {po_number} issued successfully")
        else:
            st.error("Error issuing PO")