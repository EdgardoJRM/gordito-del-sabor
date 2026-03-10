#!/bin/bash

# Script para automatizar el despliegue en GitHub y Vercel
# Uso: bash deploy.sh

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  El Gordito del Sabor - Script de Despliegue                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_step() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "package.json no encontrado. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

print_step "Verificando configuración de Git..."

# Verificar si git está inicializado
if [ ! -d ".git" ]; then
    print_info "Inicializando Git..."
    git init
    print_step "Git inicializado"
fi

# Verificar si hay cambios sin hacer commit
if [ -n "$(git status --porcelain)" ]; then
    print_info "Hay cambios sin hacer commit"
    print_step "Agregando todos los archivos..."
    git add .
    
    print_step "Haciendo commit..."
    git commit -m "Initial commit: Professional website for El Gordito del Sabor"
else
    print_info "No hay cambios nuevos para hacer commit"
fi

# Verificar si el remote existe
if ! git remote get-url origin > /dev/null 2>&1; then
    print_info "No hay remote configurado"
    echo ""
    echo "Para continuar, necesitas:"
    echo "1. Crear un repositorio en GitHub: https://github.com/new"
    echo "2. Ejecutar este comando con tu usuario:"
    echo ""
    echo "   git remote add origin https://github.com/TU_USUARIO/gordito-del-sabor.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    exit 1
fi

print_step "Remote configurado: $(git remote get-url origin)"

# Verificar rama
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_info "Cambiando a rama main..."
    git branch -M main
    print_step "Rama cambiada a main"
fi

# Verificar si hay commits para hacer push
if [ -n "$(git log origin/main..HEAD 2>/dev/null)" ] || [ -z "$(git rev-parse origin/main 2>/dev/null)" ]; then
    print_step "Haciendo push a GitHub..."
    git push -u origin main
    print_step "Push completado"
else
    print_info "Ya está sincronizado con GitHub"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ¡Próximos Pasos!                                             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "1. Ve a https://vercel.com"
echo "2. Haz clic en 'Add New Project'"
echo "3. Selecciona tu repositorio 'gordito-del-sabor'"
echo "4. Haz clic en 'Deploy'"
echo ""
echo "Una vez desplegado en Vercel:"
echo "1. Ve a Settings → Domains"
echo "2. Agrega tu dominio: gorditodelsabor.com"
echo "3. En GoDaddy, actualiza los nameservers"
echo "4. Espera 24-48 horas para que se propague"
echo ""
print_step "¡Despliegue completado!"
