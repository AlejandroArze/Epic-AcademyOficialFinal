from fastapi import FastAPI
import json
import os

def generate_fastapi_app(html_structure):
    # Crear directorio backend
    os.makedirs('backend/src', exist_ok=True)

    backend_code = f"""
from fastapi import FastAPI
from typing import List, Dict

app = FastAPI()

@app.get("/")
async def root():
    return {{"title": "{html_structure.get('title', 'Sitio Web Clonado')}"}}

@app.get("/headings")
async def get_headings() -> List[str]:
    return {json.dumps(html_structure.get('headings', []))}

@app.get("/links")
async def get_links() -> List[str]:
    return {json.dumps(html_structure.get('links', []))}
"""

    # Guardar código backend
    with open('backend/src/main.py', 'w') as f:
        f.write(backend_code)

def main():
    with open('data/scraped/html_structure.json', 'r') as f:
        html_structure = json.load(f)
    
    generate_fastapi_app(html_structure)

if __name__ == "__main__":
    main() 