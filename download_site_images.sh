#!/bin/bash

# Script para descargar imágenes de gorditodelsabor.com
# Uso: bash download_site_images.sh

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Descargador de Imágenes - El Gordito del Sabor              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

SITE_URL="https://gorditodelsabor.com"
OUTPUT_DIR="/Users/gardo/gordito-del-sabor/public/images"

echo "📍 Sitio: $SITE_URL"
echo "📁 Destino: $OUTPUT_DIR"
echo ""

# Crear directorios si no existen
mkdir -p "$OUTPUT_DIR/recipes"
mkdir -p "$OUTPUT_DIR/hero"
mkdir -p "$OUTPUT_DIR/team"

echo "✓ Directorios creados"
echo ""

# Función para descargar una imagen
download_image() {
    local url=$1
    local filename=$2
    local output_path=$3
    
    if [ -z "$url" ]; then
        echo "⚠ URL vacía, saltando..."
        return
    fi
    
    echo "📥 Descargando: $filename"
    
    if command -v curl &> /dev/null; then
        curl -s -o "$output_path/$filename" "$url"
        if [ $? -eq 0 ]; then
            echo "✓ Descargado: $filename"
        else
            echo "✗ Error descargando: $filename"
        fi
    elif command -v wget &> /dev/null; then
        wget -q -O "$output_path/$filename" "$url"
        if [ $? -eq 0 ]; then
            echo "✓ Descargado: $filename"
        else
            echo "✗ Error descargando: $filename"
        fi
    else
        echo "✗ curl o wget no están instalados"
        return
    fi
}

echo "📥 Descargando imágenes..."
echo ""

# Aquí iría el código para descargar las imágenes
# Necesitarías proporcionar las URLs exactas de las imágenes del sitio antiguo

# Ejemplo:
# download_image "https://gorditodelsabor.com/images/mofongo.jpg" "mofongo.jpg" "$OUTPUT_DIR/recipes"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Instrucciones Manuales                                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Como no tenemos las URLs exactas, aquí está cómo obtenerlas:"
echo ""
echo "1. Abre https://gorditodelsabor.com en tu navegador"
echo "2. Abre DevTools (F12 o Cmd+Option+I)"
echo "3. Ve a la pestaña 'Network'"
echo "4. Recarga la página"
echo "5. Filtra por 'img' para ver todas las imágenes"
echo "6. Haz clic derecho en cada imagen → 'Copy image link'"
echo "7. Descarga manualmente o usa curl:"
echo ""
echo "   curl -o nombre.jpg 'URL_DE_LA_IMAGEN'"
echo ""
echo "8. Guarda en la carpeta correspondiente:"
echo "   - Recetas: $OUTPUT_DIR/recipes/"
echo "   - Hero: $OUTPUT_DIR/hero/"
echo "   - Equipo: $OUTPUT_DIR/team/"
echo ""
echo "✓ Listo!"
