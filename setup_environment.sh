#!/bin/bash

# Configurar entorno virtual de Python
python3 -m venv venv
source venv/bin/activate

# Instalar dependencias de Python
pip install \
    requests \
    beautifulsoup4 \
    fastapi \
    uvicorn \
    pytest \
    black \
    isort

# Configurar Node.js y npm
npm init -y
npm install -g create-react-app

# Instalar dependencias de frontend
npm install \
    react \
    react-dom \
    tailwindcss \
    postcss \
    autoprefixer \
    jest \
    @testing-library/react \
    cypress

# Configurar Tailwind CSS
npx tailwindcss init -p

# Crear estructura de directorios
mkdir -p tools data/scraped frontend/src/components frontend/src/data backend/src

# Desactivar entorno virtual
deactivate 