import requests
from bs4 import BeautifulSoup
import json
import os
import re
import logging
from urllib.parse import urljoin, urlparse

class WebScrapingTaskManager:
    def __init__(self, url):
        self.url = url
        self.base_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}"
        self.html_structure = {
            "metadata": {
                "url": url,
                "titulo": "",
                "descripcion": "",
                "palabras_clave": []
            },
            "estructura": {
                "secciones_principales": [],
                "componentes_ui": [],
                "flujos_navegacion": []
            },
            "recursos": {
                "imagenes": [],
                "estilos": {
                    "colores_principales": [],
                    "fuentes": []
                },
                "scripts": []
            }
        }
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO, 
            format='%(asctime)s - %(levelname)s: %(message)s',
            filename='web_scraping.log'
        )
        self.logger = logging.getLogger(__name__)

    def scrape_website(self):
        try:
            # Realizar solicitud HTTP
            response = requests.get(self.url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extraer metadatos
            self._extraer_metadatos(soup)
            
            # Identificar secciones principales
            self._identificar_secciones(soup)
            
            # Extraer recursos
            self._extraer_recursos(soup)
            
            # Generar plan de clonación
            self._generar_plan_clonacion()

            # Guardar estructura
            self._guardar_estructura()

            self.logger.info("Scraping completado exitosamente")

        except Exception as e:
            self.logger.error(f"Error en scraping: {e}")
            raise

    def _extraer_metadatos(self, soup):
        """Extraer metadatos del sitio web"""
        # Título
        self.html_structure['metadata']['titulo'] = soup.title.string if soup.title else "Sin título"
        
        # Descripción
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        self.html_structure['metadata']['descripcion'] = meta_desc['content'] if meta_desc else "Sin descripción"
        
        # Palabras clave
        meta_keywords = soup.find('meta', attrs={'name': 'keywords'})
        self.html_structure['metadata']['palabras_clave'] = meta_keywords['content'].split(',') if meta_keywords else []

    def _identificar_secciones(self, soup):
        """Identificar secciones principales y componentes de UI"""
        # Extraer encabezados
        headings = soup.find_all(['h1', 'h2', 'h3'])
        self.html_structure['estructura']['secciones_principales'] = [
            {
                "texto": h.get_text(strip=True),
                "nivel": h.name
            } for h in headings
        ]

        # Identificar componentes de UI
        componentes_ui = [
            "navbar", "footer", "card", "modal", 
            "dropdown", "carousel", "form", "button"
        ]
        
        for componente in componentes_ui:
            elementos = soup.find_all(class_=re.compile(componente))
            if elementos:
                self.html_structure['estructura']['componentes_ui'].append({
                    "tipo": componente,
                    "cantidad": len(elementos)
                })

    def _extraer_recursos(self, soup):
        """Extraer recursos como imágenes, estilos y scripts"""
        # Imágenes
        imagenes = soup.find_all('img', src=True)
        self.html_structure['recursos']['imagenes'] = [
            urljoin(self.base_url, img['src']) for img in imagenes
        ][:20]  # Limitar a 20 imágenes

        # Estilos (básico)
        estilos = soup.find_all('link', rel='stylesheet')
        self.html_structure['recursos']['estilos']['fuentes'] = [
            urljoin(self.base_url, estilo['href']) for estilo in estilos
        ]

        # Scripts
        scripts = soup.find_all('script', src=True)
        self.html_structure['recursos']['scripts'] = [
            urljoin(self.base_url, script['src']) for script in scripts
        ]

    def _generar_plan_clonacion(self):
        """Generar un plan detallado de clonación"""
        self.html_structure['plan_clonacion'] = {
            "tecnologias_detectadas": {
                "frontend": self._detectar_tecnologias_frontend(),
                "backend": self._detectar_tecnologias_backend()
            },
            "complejidad_estimada": self._estimar_complejidad(),
            "tiempo_estimado": self._estimar_tiempo_desarrollo()
        }

    def _detectar_tecnologias_frontend(self):
        """Detectar tecnologías frontend"""
        tecnologias = []
        
        # Detección básica
        if 'react' in str(self.html_structure).lower():
            tecnologias.append('React')
        if 'vue' in str(self.html_structure).lower():
            tecnologias.append('Vue')
        if 'angular' in str(self.html_structure).lower():
            tecnologias.append('Angular')
        
        return tecnologias or ['Vanilla JS']

    def _detectar_tecnologias_backend(self):
        """Detectar tecnologías backend"""
        # Implementación básica de detección
        return ['No detectado']

    def _estimar_complejidad(self):
        """Estimar complejidad del sitio"""
        complejidad = 0
        complejidad += len(self.html_structure['estructura']['secciones_principales'])
        complejidad += len(self.html_structure['estructura']['componentes_ui'])
        complejidad += len(self.html_structure['recursos']['imagenes'])
        
        return (
            "Baja" if complejidad < 10 else
            "Media" if complejidad < 30 else
            "Alta"
        )

    def _estimar_tiempo_desarrollo(self):
        """Estimar tiempo de desarrollo"""
        estimaciones = {
            "Baja": "1-2 semanas",
            "Media": "3-4 semanas",
            "Alta": "5-8 semanas"
        }
        return estimaciones[self._estimar_complejidad()]

    def _guardar_estructura(self):
        """Guardar estructura extraída"""
        os.makedirs('data/scraped', exist_ok=True)
        
        # Guardar estructura HTML
        with open('data/scraped/html_structure.json', 'w', encoding='utf-8') as f:
            json.dump(self.html_structure, f, indent=2, ensure_ascii=False)
        
        # Generar README con plan de clonación
        self._generar_readme_clonacion()

    def _generar_readme_clonacion(self):
        """Generar README con instrucciones de clonación"""
        readme_content = f"""# Plan de Clonación de Sitio Web

## Información del Sitio
- URL Original: {self.html_structure['metadata']['url']}
- Título: {self.html_structure['metadata']['titulo']}
- Descripción: {self.html_structure['metadata']['descripcion']}

## Tecnologías Detectadas
### Frontend
{', '.join(self.html_structure['plan_clonacion']['tecnologias_detectadas']['frontend'])}

### Backend
{', '.join(self.html_structure['plan_clonacion']['tecnologias_detectadas']['backend'])}

## Complejidad del Proyecto
- Nivel: {self.html_structure['plan_clonacion']['complejidad_estimada']}
- Tiempo Estimado: {self.html_structure['plan_clonacion']['tiempo_estimado']}

## Secciones Principales
{json.dumps(self.html_structure['estructura']['secciones_principales'], indent=2)}

## Componentes de UI
{json.dumps(self.html_structure['estructura']['componentes_ui'], indent=2)}

## Próximos Pasos
1. Revisar plan de clonación
2. Seleccionar tecnologías de implementación
3. Comenzar desarrollo de componentes
"""
        
        with open('data/scraped/PLAN_CLONACION.md', 'w', encoding='utf-8') as f:
            f.write(readme_content)

def main():
    url = input("Introduce la URL del sitio web a clonar: ")
    scraper = WebScrapingTaskManager(url)
    scraper.scrape_website()

if __name__ == "__main__":
    main() 