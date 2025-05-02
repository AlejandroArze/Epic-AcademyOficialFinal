# Flujo de Trabajo para Ingeniería Inversa de Páginas Web - EDTeam

## 0. Preparación Inicial
- Herramientas necesarias:
  - Chrome DevTools
  - Firefox Developer Tools
  - Extensiones de navegador:
    - React/Vue DevTools
    - Web Developer
    - ColorZilla
    - Full Page Screen Capture
  - Software de captura:
    - Screenpresso
    - Snagit
    - OBS Studio (para grabaciones)
  - Editor de código
  - Herramientas de análisis web

## 1. Captura Inicial de Página

### 1.1 Capturas de Pantalla
- Captura pantalla completa
- Capturas de secciones específicas
- Capturas en diferentes resoluciones:
  - Móvil (375x667)
  - Tablet (768x1024)
  - Desktop (1920x1080)
- Capturar estados interactivos:
  - Hover
  - Active
  - Focus
  - Disabled

### 1.2 Registro de Información
- URL completa
- Título de página
- Metadatos
- Etiquetas Open Graph
- Estructura de encabezados (H1, H2, etc.)

## 2. Análisis Estructural HTML

### 2.1 Estructura DOM
- Árbol de elementos HTML
- Identificar componentes principales
- Capturar estructura de contenedores
- Documentar clases y IDs
- Registrar atributos semánticos

### 2.2 Herramientas de Análisis
- Usar Chrome DevTools
- Exportar estructura HTML
- Capturar código fuente
- Analizar elementos con:
  - React DevTools
  - Vue DevTools

### 2.3 Documentación HTML
- Crear documento de análisis con:
  - Estructura de componentes
  - Jerarquía de elementos
  - Atributos especiales
  - Comentarios relevantes

## 3. Análisis de Estilos CSS

### 3.1 Extracción de Estilos
- Capturar hojas de estilo
- Identificar framework (Tailwind, Bootstrap)
- Extraer variables de estilo
- Documentar:
  - Paleta de colores
  - Tipografías
  - Espaciados
  - Breakpoints responsive

### 3.2 Herramientas de Análisis
- Usar Computed Styles en DevTools
- Extensión PerfectPixel
- ColorZilla para paleta
- WhatFont para tipografías

### 3.3 Documentación CSS
- Crear documento con:
  - Tokens de diseño
  - Variables CSS
  - Media queries
  - Estilos condicionales

## 4. Análisis de Interactividad JavaScript

### 4.1 Comportamiento Dinámico
- Identificar eventos
- Capturar flujos de interacción
- Analizar:
  - Cambios de estado
  - Animaciones
  - Transiciones
  - Validaciones

### 4.2 Herramientas
- Chrome Performance Tab
- React/Vue DevTools
- Network Tab
- Sources Tab para depuración

### 4.3 Documentación JS
- Diagrama de flujo de interacciones
- Listado de eventos
- Comportamientos detectados

## 5. Análisis de Rendimiento

### 5.1 Métricas
- Tiempo de carga
- Tamaño de página
- Solicitudes de red
- Puntuación Lighthouse

### 5.2 Herramientas
- Google Lighthouse
- WebPageTest
- GTmetrix
- Chrome Performance Tab

## 6. Análisis de Accesibilidad

### 6.1 Verificaciones
- Estructura semántica
- Contrastes de color
- Navegación por teclado
- Etiquetas ARIA
- Alternativas para multimedia

### 6.2 Herramientas
- WAVE
- aXe
- Lighthouse Accessibility
- Screen readers

## 7. Documentación Final

### 7.1 Informe Consolidado
- Resumen ejecutivo
- Capturas de pantalla
- Estructura HTML
- Análisis de estilos
- Comportamiento interactivo
- Métricas de rendimiento
- Hallazgos de accesibilidad

### 7.2 Estructura de Documentación
```markdown
# Análisis Página: [NOMBRE_PÁGINA]

## 1. Información General
- URL
- Propósito
- Tipo de página

## 2. Capturas de Pantalla
- [Enlace a capturas]

## 3. Estructura HTML
- Árbol de componentes
- Código fuente

## 4. Estilos
- Paleta de colores
- Tipografías
- Tokens de diseño

## 5. Interactividad
- Eventos principales
- Flujos de interacción

## 6. Rendimiento
- Métricas Lighthouse
- Tiempo de carga
- Tamaño

## 7. Accesibilidad
- Hallazgos principales
- Áreas de mejora
```

## 8. Páginas a Analizar
1. Página de Inicio
2. Catálogo de Cursos
3. Página de Curso Individual
4. Comunidad
5. Blog
6. Área de Usuarios
7. Planes (Gratuito/Premium)
8. Página de Perfil
9. Área de Configuración

## 9. Consideraciones Finales
- Respetar derechos de autor
- Usar como referencia de aprendizaje
- No clonar para competencia directa

## 10. Herramientas Recomendadas
- Visual Studio Code
- Figma
- Sketch
- Adobe XD
- Excalidraw (diagramas)

## Apéndice: Prompts para IA

### Prompt Base para Análisis
```
Analiza la página [URL] de EDTeam, detallando:
- Estructura HTML semántica
- Componentes principales
- Flujos de interacción
- Estilos y diseño
- Comportamiento dinámico
- Consideraciones de accesibilidad
```

### Prompt para Replicación
```
Replica el componente [NOMBRE_COMPONENTE] considerando:
- Estructura HTML idéntica
- Estilos CSS precisos
- Interacciones originales
- Responsive design
- Accesibilidad
``` 