@echo off
REM Script de configuración para Windows usando py

REM Verificar versión de Python
py --version

REM Crear entorno virtual
py -m venv venv

REM Activar entorno virtual
call venv\Scripts\activate

REM Instalar dependencias de Python
py -m pip install --upgrade pip
py -m pip install requests beautifulsoup4 fastapi uvicorn pytest black isort

REM Inicializar proyecto Node.js con nombre válido
npm init -y
npm pkg set name="epic-academy"

REM Instalar dependencias de Node.js
npm install react react-dom tailwindcss postcss autoprefixer jest @testing-library/react cypress

REM Crear estructura de directorios
mkdir tools\data\scraped
mkdir frontend\src\components
mkdir frontend\src\data
mkdir backend\src

REM Configurar Tailwind CSS
npx tailwindcss init -p

echo Configuración completada
pause 