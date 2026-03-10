#!/bin/bash

# Script para convertir imágenes PNG a WebP
# Esto reduce el tamaño de las imágenes del hero scroll

HERO_DIR="/Users/gardo/gordito-del-sabor/public/images/hero"
WEBP_DIR="$HERO_DIR/webp"

# Crear directorio para WebP si no existe
mkdir -p "$WEBP_DIR"

echo "🔄 Iniciando conversión de imágenes PNG a WebP..."
echo "📁 Directorio: $HERO_DIR"
echo ""

# Contar imágenes
TOTAL=$(ls "$HERO_DIR"/ezgif-frame-*.png 2>/dev/null | wc -l)
echo "📊 Total de imágenes a convertir: $TOTAL"
echo ""

# Convertir cada imagen
COUNT=0
for png_file in "$HERO_DIR"/ezgif-frame-*.png; do
    if [ -f "$png_file" ]; then
        filename=$(basename "$png_file" .png)
        webp_file="$WEBP_DIR/${filename}.webp"
        
        # Mostrar progreso
        COUNT=$((COUNT + 1))
        echo -ne "\r⏳ Convertiendo: $COUNT/$TOTAL - $filename"
        
        # Convertir con ffmpeg (más rápido que ImageMagick)
        ffmpeg -i "$png_file" -q:v 80 "$webp_file" -y 2>/dev/null
    fi
done

echo ""
echo ""
echo "✅ Conversión completada!"
echo ""

# Mostrar estadísticas
echo "📊 Estadísticas de tamaño:"
echo ""
echo "PNG (original):"
du -sh "$HERO_DIR" | grep -v webp

echo ""
echo "WebP (optimizado):"
du -sh "$WEBP_DIR"

echo ""
echo "💾 Ahorro de espacio:"
PNG_SIZE=$(du -sb "$HERO_DIR" | grep -v webp | awk '{print $1}')
WEBP_SIZE=$(du -sb "$WEBP_DIR" | awk '{print $1}')
SAVED=$((PNG_SIZE - WEBP_SIZE))
PERCENT=$((SAVED * 100 / PNG_SIZE))

echo "Reducción: ~$PERCENT% (Ahorrados ~$(($SAVED / 1024 / 1024))MB)"
