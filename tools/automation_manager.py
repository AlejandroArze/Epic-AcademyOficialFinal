import subprocess
import json
import os
import sys
import logging
from web_scraper import WebScrapingTaskManager
from generate_frontend import FrontendGenerationTaskManager
from frontend_tests import FrontendTestManager
from validate_components import ComponentValidator

class AutomationManager:
    def __init__(self, url):
        self.url = url
        self.log_file = 'automation_log.txt'
        self.error_log_file = 'automation_error_log.txt'
        
        # Configurar logging con codificación UTF-8
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s: %(message)s',
            handlers=[
                logging.FileHandler(self.log_file, encoding='utf-8'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)

    def _log(self, message, error=False):
        """Registra mensajes en el archivo de log"""
        try:
            if error:
                self.logger.error(message)
            else:
                self.logger.info(message)
        except Exception as e:
            print(f"Error al registrar log: {e}")

    def run_web_scraping(self):
        """Ejecuta el web scraping"""
        try:
            self._log("Iniciando Web Scraping...")
            scraper = WebScrapingTaskManager(self.url)
            scraper.scrape_website()
            self._log("Web Scraping completado exitosamente")
            return True
        except Exception as e:
            self._log(f"Error en Web Scraping: {e}", error=True)
            return False

    def generate_frontend(self):
        """Genera componentes frontend"""
        try:
            self._log("Generando Frontend...")
            with open('data/scraped/html_structure.json', 'r', encoding='utf-8') as f:
                html_structure = json.load(f)
            
            frontend_generator = FrontendGenerationTaskManager(html_structure)
            frontend_generator.generate_angular_components()
            
            self._log("Generación de Frontend completada")
            return True
        except Exception as e:
            self._log(f"Error en Generación de Frontend: {e}", error=True)
            return False

    def validate_frontend_components(self):
        """Validar componentes generados"""
        try:
            self._log("Validando Componentes de Frontend...")
            validator = ComponentValidator()
            
            if not validator.validar_componentes():
                self._log("Errores en validación de componentes", error=True)
                return False
            
            self._log("Validación de Componentes completada")
            return True
        except Exception as e:
            self._log(f"Error en Validación de Componentes: {e}", error=True)
            return False

    def run_frontend_tests(self):
        """Ejecuta pruebas de frontend"""
        try:
            self._log("Ejecutando Pruebas de Frontend...")
            test_manager = FrontendTestManager()
            test_manager.ejecutar_pruebas()
            
            # Verificar resultados de pruebas
            with open('frontend/test_report.json', 'r', encoding='utf-8') as f:
                test_results = json.load(f)
            
            if not test_results['componentes']['exitoso']:
                raise Exception("Pruebas de componentes fallaron")
            
            self._log("Pruebas de Frontend completadas")
            return True
        except Exception as e:
            self._log(f"Error en Pruebas de Frontend: {e}", error=True)
            return False

    def generate_project_structure_report(self):
        """Genera un informe de la estructura del proyecto"""
        project_structure = {
            "directorios": {},
            "archivos": {}
        }

        for root, dirs, files in os.walk('.'):
            project_structure["directorios"][root] = dirs
            project_structure["archivos"][root] = files

        with open('project_structure_report.json', 'w', encoding='utf-8') as f:
            json.dump(project_structure, f, indent=2)

    def run_automation_workflow(self):
        """Flujo principal de automatización"""
        self._log("Iniciando Automatización de Clonación Web")
        
        # Etapas de automatización
        stages = [
            self.run_web_scraping,
            self.generate_frontend,
            self.validate_frontend_components,
            self.run_frontend_tests,
        ]

        for stage in stages:
            if not stage():
                self._log("Proceso de automatización detenido", error=True)
                return False

        # Generar informe final
        self.generate_project_structure_report()
        
        self._log("Automatización completada exitosamente")
        return True

def main():
    url = input("Introduce la URL del sitio web a clonar: ")
    automation_manager = AutomationManager(url)
    automation_manager.run_automation_workflow()

if __name__ == "__main__":
    main() 