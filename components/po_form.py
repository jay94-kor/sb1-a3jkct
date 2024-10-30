import streamlit as st
from typing import Dict, Any, Optional
from utils.calculations import calculate_amounts
from utils.file_handler import handle_file_upload

def render_po_form() -> Optional[Dict[str, Any]]:
    """PO 입력 폼 렌더링"""
    with st.form("po_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            supplier_name = st.text_input("공급자명")
            description = st.text_area(
                "거래 내용",
                help="발주 내용을 상세하게 작성해주세요. (최소 10글자)"
            )
            total_amount = st.number_input("총액", min_value=0, step=10000)
            detailed_memo = st.text_area(
                "상세 메모",
                help="규격, 상세 사항 등을 자유롭게 입력하세요."
            )
            
        with col2:
            category = st.selectbox(
                "거래 분류",
                ["부가세 10%", "원천세 3.3%", "강사 인건비 8.8%"]
            )
            advance_rate = st.slider("선금 비율 (%)", 0, 100, 50)
        
        st.subheader("필요 서류")
        doc_col1, doc_col2 = st.columns(2)
        
        with doc_col1:
            contract_file = handle_file_upload(
                "contract",
                "계약서",
                ['pdf', 'doc', 'docx']
            )
            estimate_file = handle_file_upload(
                "estimate",
                "견적서",
                ['pdf', 'doc', 'docx']
            )
            
        with doc_col2:
            business_cert_file = handle_file_upload(
                "business_cert",
                "사업자등록증",
                ['pdf', 'jpg', 'jpeg', 'png']
            )
            bank_file = handle_file_upload(
                "bank",
                "통장사본",
                ['pdf', 'jpg', 'jpeg', 'png']
            )
        
        submitted = st.form_submit_button("PO 발행")
        
        if submitted:
            # 필수 입력값 검증
            if not all([
                supplier_name,
                description,
                total_amount,
                contract_file,
                estimate_file,
                business_cert_file,
                bank_file
            ]):
                st.error("모든 필수 항목을 입력해주세요.")
                return None
            
            # 거래 내용 글자 수 검증
            if len(description.replace(" ", "")) < 10:
                st.error("거래 내용은 최소 10글자 이상 작성해주세요. (공백 제외)")
                return None
            
            # 금액 계산
            amounts = calculate_amounts(total_amount, advance_rate / 100, category)
            
            return {
                'supplier_name': supplier_name,
                'description': description,
                'detailed_memo': detailed_memo,
                'total_amount': total_amount,
                'category': category,
                'advance_rate': advance_rate / 100,
                'contract_file': contract_file,
                'estimate_file': estimate_file,
                'business_cert_file': business_cert_file,
                'bank_file': bank_file,
                **amounts
            }
            
        return None