import os
import re
import json
import logging
import ast

class ComponentValidator:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s: %(message)s',
            filename='component_validation.log'
        )
        self.errores = []
        self.correcciones = []

    def validar_componentes(self, directorio='frontend/src/app/modules/landing'):
        """Validar y corregir automáticamente los componentes"""
        self.errores = []
        self.correcciones = []
        
        for nombre_componente in os.listdir(directorio):
            ruta_componente = os.path.join(directorio, nombre_componente)
            
            if os.path.isdir(ruta_componente):
                self._validar_y_corregir_componente(ruta_componente, nombre_componente)
        
        # Generar informe de validación
        self._generar_informe()
        
        return len(self.errores) == 0

    def _validar_y_corregir_componente(self, ruta_componente, nombre_componente):
        """Validar y corregir un componente individual"""
        archivos_ts = [f for f in os.listdir(ruta_componente) if f.endswith('.component.ts')]
        
        if not archivos_ts:
            self.errores.append(f"No se encontró archivo .ts para {nombre_componente}")
            return
        
        archivo_ts = os.path.join(ruta_componente, archivos_ts[0])
        
        with open(archivo_ts, 'r', encoding='utf-8') as f:
            contenido = f.read()
            
            # Validar nombre de clase
            patron_clase = r'export\s+class\s+(\w+)Component'
            match = re.search(patron_clase, contenido)
            
            if not match:
                self.errores.append(f"No se encontró definición de clase en {archivo_ts}")
                return
            
            nombre_clase = match.group(1)
            
            # Generar nombre de clase esperado
            nombre_esperado = self._generar_nombre_clase(nombre_componente)
            
            # Corregir si el nombre de clase no coincide
            if nombre_clase != nombre_esperado:
                self._corregir_nombre_clase(archivo_ts, nombre_clase, nombre_esperado)

    def _generar_nombre_clase(self, nombre_componente):
        """Generar nombre de clase en PascalCase"""
        # Eliminar caracteres especiales y convertir a PascalCase
        palabras = re.findall(r'\w+', nombre_componente)
        return ''.join(palabra.capitalize() for palabra in palabras) + 'Component'

    def _corregir_nombre_clase(self, archivo_ts, nombre_actual, nombre_esperado):
        """Corregir el nombre de la clase en el archivo"""
        try:
            with open(archivo_ts, 'r', encoding='utf-8') as f:
                contenido = f.read()
            
            # Corregir diferentes variaciones de nombres de clase
            patrones = [
                rf'export\s+class\s+{nombre_actual}Component',
                rf'export\s+class\s+{nombre_actual}',
                rf'export\s+class\s+{nombre_actual.replace("-", "")}Component'
            ]
            
            nombre_corregido = nombre_esperado if nombre_esperado.endswith('Component') else f'{nombre_esperado}Component'
            
            # Intentar diferentes patrones de reemplazo
            corregido = False
            for patron in patrones:
                contenido_corregido = re.sub(
                    patron,
                    f'export class {nombre_corregido}',
                    contenido
                )
                
                if contenido_corregido != contenido:
                    contenido = contenido_corregido
                    corregido = True
                    break
            
            if corregido:
                with open(archivo_ts, 'w', encoding='utf-8') as f:
                    f.write(contenido)
                
                # Registrar corrección
                self.correcciones.append({
                    'archivo': archivo_ts,
                    'nombre_anterior': nombre_actual,
                    'nombre_corregido': nombre_corregido
                })
                
                self.logger.info(f"Corregido nombre de clase en {archivo_ts}: "
                                 f"{nombre_actual} -> {nombre_corregido}")
            
        except Exception as e:
            self.errores.append(f"Error al corregir {archivo_ts}: {e}")

    def _generar_informe(self):
        """Generar informe de validación y correcciones"""
        informe = {
            "total_componentes": len(os.listdir('frontend/src/app/modules/landing')),
            "componentes_con_errores": len(self.errores),
            "errores": self.errores,
            "correcciones": self.correcciones
        }
        
        with open('frontend/component_validation_report.json', 'w', encoding='utf-8') as f:
            json.dump(informe, f, indent=2, ensure_ascii=False)
        
        # Registrar errores y correcciones en el log
        for error in self.errores:
            self.logger.error(error)
        
        for correccion in self.correcciones:
            self.logger.info(f"Corrección: {correccion}")

def main():
    validator = ComponentValidator()
    if not validator.validar_componentes():
        print("Se encontraron y corrigieron errores en los componentes. Revisa component_validation_report.json")
    else:
        print("Todos los componentes validados correctamente")

if __name__ == "__main__":
    main() 