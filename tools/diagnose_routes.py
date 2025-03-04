import os
import json
import re

def diagnosticar_rutas_angular():
    """Diagnosticar problemas de configuración de rutas"""
    rutas = {
        "componentes_sin_ruta": [],
        "rutas_duplicadas": [],
        "componentes_no_exportados": []
    }

    # Buscar componentes en el directorio de landing
    landing_path = 'frontend/src/app/modules/landing'
    
    for componente in os.listdir(landing_path):
        ruta_componente = os.path.join(landing_path, componente)
        
        if os.path.isdir(ruta_componente):
            # Buscar archivo de componente
            archivos_componente = [f for f in os.listdir(ruta_componente) if f.endswith('.component.ts')]
            
            if archivos_componente:
                archivo_ts = os.path.join(ruta_componente, archivos_componente[0])
                
                with open(archivo_ts, 'r', encoding='utf-8') as f:
                    contenido = f.read()
                    
                    # Verificar si el componente está exportado
                    if 'export class' not in contenido:
                        rutas["componentes_no_exportados"].append(componente)

    # Guardar diagnóstico
    with open('frontend/route_diagnostics.json', 'w', encoding='utf-8') as f:
        json.dump(rutas, f, indent=2)

    print("Diagnóstico de rutas completado. Revisa frontend/route_diagnostics.json")

if __name__ == "__main__":
    diagnosticar_rutas_angular() 