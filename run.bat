@echo off
REM Sobe o site com um unico comando: duplo clique ou "run.bat"
REM Na primeira vez instala as dependencias; nas proximas so inicia.
cd /d "%~dp0"

where npm >nul 2>nul || (echo npm nao encontrado. Instale o Node.js 18+. & pause & exit /b 1)

if not exist node_modules call npm install
call npm run dev
