import json
import os
import re
import logging

class FrontendGenerationTaskManager:
    def __init__(self, html_structure):
        self.html_structure = html_structure
        
        # Configurar logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s: %(message)s',
            filename='frontend_generation.log'
        )
        self.logger = logging.getLogger(__name__)
        
        # Conjunto para rastrear componentes únicos
        self.componentes_generados = set()

    def generate_angular_components(self):
        """Método principal para generar componentes Angular"""
        try:
            # Analizar estructura extraída
            self._analizar_estructura()
            
            # Generar componentes principales
            self._generar_componentes_principales()
            
            # Generar servicios
            self._generar_servicios()
            
            # Generar rutas
            self._generar_rutas()
            
            # Generar informe de generación
            self._generar_informe()
            
            self.logger.info("Generación de frontend completada")
        except Exception as e:
            self.logger.error(f"Error en generación de frontend: {e}")
            raise

    def _analizar_estructura(self):
        """Analizar la estructura HTML extraída"""
        # Identificar secciones principales
        secciones = self.html_structure.get('estructura', {}).get('secciones_principales', [])
        self.componentes_necesarios = [
            seccion['texto'].lower().replace(' ', '-') 
            for seccion in secciones
        ]

    def _limpiar_nombre_componente(self, nombre):
        """Limpiar nombres de componentes para que sean válidos como nombres de directorio"""
        # Eliminar caracteres especiales y reemplazar espacios
        nombre_limpio = re.sub(r'[^\w\s-]', '', nombre)
        # Convertir a minúsculas y reemplazar espacios por guiones
        nombre_limpio = re.sub(r'\s+', '-', nombre_limpio).lower()
        return nombre_limpio

    def _generar_componentes_principales(self):
        """Generar componentes Angular para cada sección"""
        secciones = self.html_structure.get('estructura', {}).get('secciones_principales', [])
        
        # Componentes base predefinidos
        componentes_base = [
            'home', 
            'cursos', 
            'escuelas', 
            'planes', 
            'blog'
        ]
        
        # Agregar componentes base
        for base in componentes_base:
            self._crear_componente_angular(base)
        
        # Generar componentes de secciones únicas
        for seccion in secciones:
            # Usar el texto de la sección
            nombre = self._limpiar_nombre_componente(seccion['texto'])
            
            # Solo crear componente si el nombre no está vacío y no ha sido generado
            if nombre and nombre not in self.componentes_generados:
                self._crear_componente_angular(nombre)
                self.componentes_generados.add(nombre)

    def _crear_componente_angular(self, nombre):
        """Crear un componente Angular básico"""
        # Ruta base de componentes
        base_path = 'frontend/src/app/modules/landing'
        os.makedirs(base_path, exist_ok=True)

        # Convertir nombre a formato PascalCase para el nombre de la clase
        nombre_clase = ''.join(word.capitalize() for word in nombre.split('-'))

        # Crear archivos de componente
        component_path = os.path.join(base_path, nombre)
        os.makedirs(component_path, exist_ok=True)

        # Archivos del componente
        archivos = {
            'component.ts': f"""
import {{ Component, OnInit }} from '@angular/core';

@Component({{
  selector: 'app-{nombre}',
  templateUrl: './{nombre}.component.html',
  styleUrls: ['./{nombre}.component.scss']
}})
export class {nombre_clase}Component implements OnInit {{
  constructor() {{ }}

  ngOnInit(): void {{
    // Lógica de inicialización
  }}
}}
""",
            'component.html': f"""
<div class="{nombre}-container">
  <h1>{nombre.replace('-', ' ').title()}</h1>
  <!-- Contenido del componente {nombre} -->
</div>
""",
            'component.scss': f"""
.{nombre}-container {{
  // Estilos para {nombre}
  padding: 20px;
  background-color: #f5f5f5;
}}
"""
        }

        # Escribir archivos
        for nombre_archivo, contenido in archivos.items():
            with open(os.path.join(component_path, f'{nombre}.{nombre_archivo}'), 'w', encoding='utf-8') as f:
                f.write(contenido)

        self.logger.info(f"Componente generado: {nombre}")

    def _generar_servicios(self):
        """Generar servicios para manejar datos"""
        servicios_path = 'frontend/src/app/core/services'
        os.makedirs(servicios_path, exist_ok=True)

        # Servicio de datos
        servicio_contenido = """
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  constructor(private http: HttpClient) { }

  // Métodos para obtener datos
  obtenerDatos(): Observable<any> {
    // Implementar lógica de obtención de datos
    return this.http.get('assets/data/datos.json');
  }
}
"""
        
        with open(os.path.join(servicios_path, 'datos.service.ts'), 'w', encoding='utf-8') as f:
            f.write(servicio_contenido)

    def _generar_rutas(self):
        """Generar configuración de rutas"""
        rutas_contenido = """
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Rutas generadas dinámicamente
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
"""
        
        with open('frontend/src/app/app-routing.module.ts', 'w', encoding='utf-8') as f:
            f.write(rutas_contenido)

    def _generar_informe(self):
        """Generar informe de generación de frontend"""
        informe = {
            "componentes_generados": self.componentes_necesarios,
            "servicios_generados": ["DatosService"],
            "rutas_generadas": True
        }

        with open('frontend/frontend_generation_report.json', 'w', encoding='utf-8') as f:
            json.dump(informe, f, indent=2)

def main():
    with open('data/scraped/html_structure.json', 'r', encoding='utf-8') as f:
        html_structure = json.load(f)
    
    frontend_generator = FrontendGenerationTaskManager(html_structure)
    frontend_generator.generate_angular_components()

if __name__ == "__main__":
    main() 