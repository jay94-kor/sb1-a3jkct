import streamlit as st
import os
from typing import Tuple, Optional

def save_uploaded_file(uploaded_file, save_dir: str) -> Tuple[bool, str]:
    """업로드된 파일을 저장하고 파일 경로를 반환"""
    try:
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
            
        file_path = os.path.join(save_dir, uploaded_file.name)
        
        with open(file_path, "wb") as f:
            f.write(uploaded_file.getbuffer())
            
        return True, file_path
        
    except Exception as e:
        return False, str(e)

def validate_file(uploaded_file) -> Tuple[bool, str]:
    """업로드된 파일의 유효성 검사"""
    # 파일 크기 제한 (10MB)
    MAX_FILE_SIZE = 10 * 1024 * 1024
    
    if uploaded_file.size > MAX_FILE_SIZE:
        return False, "파일 크기는 10MB를 초과할 수 없습니다."
    
    # 허용된 파일 확장자
    ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'}
    file_ext = os.path.splitext(uploaded_file.name)[1].lower()
    
    if file_ext not in ALLOWED_EXTENSIONS:
        return False, "허용되지 않는 파일 형식입니다. PDF, DOC, DOCX, JPG, PNG 파일만 업로드 가능합니다."
    
    return True, ""

def handle_file_upload(key: str, label: str, file_types: list = None) -> Optional[bytes]:
    """파일 업로드 처리를 위한 통합 함수"""
    uploaded_file = st.file_uploader(label, type=file_types, key=key)
    
    if uploaded_file is not None:
        is_valid, error_msg = validate_file(uploaded_file)
        
        if not is_valid:
            st.error(error_msg)
            return None
            
        return uploaded_file.read()
        
    return None