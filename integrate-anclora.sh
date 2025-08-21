#!/bin/bash
# 🚀 Script de integración completa del Anclora Design System
# Ejecuta: chmod +x integrate-anclora.sh && ./integrate-anclora.sh

echo "🌊 ANCLORA DESIGN SYSTEM - INTEGRACIÓN COMPLETA"
echo "================================================"

# Crear estructura de carpetas
echo "📁 Creando estructura de carpetas..."
mkdir -p src/css
mkdir -p src/js  
mkdir -p config
mkdir -p docs
mkdir -p examples
mkdir -p dist

# Backup del proyecto actual
echo "💾 Creando backup del proyecto actual..."
mkdir -p backup/$(date +%Y%m%d_%H%M%S)
cp index.html backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || echo "No index.html encontrado"
cp app.js backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || echo "No app.js encontrado"

echo "✅ Backup creado en backup/$(date +%Y%m%d_%H%M%S)/"

# Instrucciones para el usuario
echo ""
echo "📋 PASOS SIGUIENTES:"
echo "1. Copia los archivos generados a las siguientes ubicaciones:"
echo ""
echo "   📄 package.json → raíz del proyecto"
echo "   📄 tailwind.config.js → raíz del proyecto" 
echo "   🎨 src-css-anclora-complete.css → src/css/anclora-complete.css"
echo "   ⚡ src-js-anclora-complete.js → src/js/anclora-complete.js"
echo "   📚 README.md → docs/README.md"
echo "   🧪 index-complete.html → index.html (reemplaza el actual)"
echo ""
echo "2. Instala las dependencias:"
echo "   npm install"
echo ""
echo "3. Inicia el servidor de desarrollo:"
echo "   npm run dev"
echo ""
echo "🎯 Tu proyecto estará disponible en http://localhost:3000"
echo ""
echo "⚠️  IMPORTANTE: Tu código actual está respaldado en la carpeta backup/"