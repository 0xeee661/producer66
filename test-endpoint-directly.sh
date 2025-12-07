#!/bin/bash

echo "🧪 ============================================"
echo "🧪 TEST DIRECTO DEL ENDPOINT"
echo "🧪 ============================================"
echo ""

# Verificar si el servidor está corriendo
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "❌ NO HAY SERVIDOR CORRIENDO EN PUERTO 3000"
    echo ""
    echo "El endpoint NO puede ejecutarse porque el servidor no está corriendo."
    echo ""
    echo "SOLUCIÓN:"
    echo "  1. Abre una terminal"
    echo "  2. Ve a: cd /Users/esauguerra/Desktop/thundev/producer66"
    echo "  3. Ejecuta: npm run dev"
    echo "  4. Espera a ver: '✓ Ready on http://localhost:3000'"
    echo "  5. DEJA ESA TERMINAL ABIERTA"
    echo "  6. Los logs aparecerán AHÍ, no aquí"
    echo ""
    exit 1
fi

echo "✅ Servidor está corriendo en puerto 3000"
echo ""
echo "🔍 Probando el endpoint con una petición simulada..."
echo ""
echo "IMPORTANTE: Los logs aparecerán en la terminal donde ejecutaste 'npm run dev'"
echo "            NO aparecerán aquí."
echo ""
echo "Enviando petición de prueba..."
echo ""

# Crear payload de prueba (simplificado, sin firma válida)
response=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/webhooks/clerk \
  -H "Content-Type: application/json" \
  -d '{"type": "test", "data": {}}' 2>&1)

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

echo "📊 RESULTADO:"
echo "  HTTP Status: $http_code"
echo "  Response: $body"
echo ""

if [ "$http_code" == "400" ]; then
    echo "✅ EL ENDPOINT SE EJECUTÓ (respondió con 400 por falta de headers)"
    echo ""
    echo "Esto confirma que:"
    echo "  ✅ El endpoint /api/webhooks/clerk EXISTE"
    echo "  ✅ El código se está EJECUTANDO"
    echo "  ✅ El servidor está funcionando"
    echo ""
    echo "⚠️  PERO: Error 400 = 'Error: no svix headers'"
    echo "   Esto es NORMAL para una petición de prueba sin firma"
    echo ""
    echo "🔍 AHORA VERIFICA EN LA TERMINAL DONDE CORRE 'npm run dev'"
    echo "   Deberías ver los logs como:"
    echo "   🚀 WEBHOOK CLERK - INICIO DE EJECUCIÓN"
    echo "   📋 Headers recibidos:"
    echo "   ..."
    echo ""
elif [ "$http_code" == "200" ]; then
    echo "✅ EL ENDPOINT RESPONDIÓ CORRECTAMENTE"
    echo ""
    echo "🔍 VERIFICA LOS LOGS en la terminal donde corre 'npm run dev'"
    echo ""
elif [ "$http_code" == "404" ]; then
    echo "❌ ERROR 404 - EL ENDPOINT NO EXISTE"
    echo ""
    echo "Esto significa que Next.js no encuentra la ruta."
    echo "Verificando que el archivo existe..."
    echo ""
    if [ -f "src/app/api/webhooks/clerk/route.ts" ]; then
        echo "✅ El archivo existe: src/app/api/webhooks/clerk/route.ts"
        echo ""
        echo "⚠️  PROBLEMA: Next.js no lo está reconociendo"
        echo ""
        echo "SOLUCIÓN:"
        echo "  1. Detén el servidor (Ctrl+C)"
        echo "  2. Borra la carpeta .next: rm -rf .next"
        echo "  3. Reinicia: npm run dev"
    else
        echo "❌ El archivo NO existe!"
        echo "   Esperado en: src/app/api/webhooks/clerk/route.ts"
    fi
else
    echo "⚠️  Respuesta inesperada: $http_code"
    echo ""
    echo "🔍 VERIFICA LA TERMINAL donde corre 'npm run dev'"
    echo "   para ver los errores completos"
fi

echo ""
echo "============================================"
echo "📍 DÓNDE VER LOS LOGS"
echo "============================================"
echo ""
echo "Los console.log() del webhook aparecen en:"
echo ""
echo "  ➜ La terminal donde ejecutaste 'npm run dev'"
echo "  ➜ NO en el navegador"
echo "  ➜ NO en esta terminal"
echo "  ➜ NO en ninguna otra terminal"
echo ""
echo "Si tienes MÚLTIPLES terminales abiertas:"
echo "  1. Busca la que tiene este texto:"
echo "     '✓ Ready on http://localhost:3000'"
echo "  2. Esa es donde aparecen los logs del webhook"
echo ""
