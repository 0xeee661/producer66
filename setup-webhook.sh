#!/bin/bash

echo "🚀 ============================================"
echo "🚀 CONFIGURACIÓN RÁPIDA - Clerk Webhook"
echo "🚀 ============================================"
echo ""

# Verificar si ngrok está instalado
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok no está instalado"
    echo ""
    echo "Instálalo con:"
    echo "  brew install ngrok"
    echo ""
    echo "O descárgalo desde: https://ngrok.com/download"
    exit 1
fi

echo "✅ ngrok está instalado"
echo ""

# Verificar si hay un servidor corriendo
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  No hay servidor corriendo en puerto 3000"
    echo ""
    echo "En OTRA TERMINAL, ejecuta:"
    echo "  npm run dev"
    echo ""
    echo "Luego vuelve a ejecutar este script"
    exit 1
fi

echo "✅ Servidor corriendo en puerto 3000"
echo ""

# Instrucciones
echo "📋 INSTRUCCIONES:"
echo "======================================"
echo ""
echo "1️⃣  En OTRA TERMINAL, ejecuta:"
echo "    ngrok http 3000"
echo ""
echo "2️⃣  Ngrok te dará una URL como:"
echo "    https://xxxx-xx-xx.ngrok-free.app"
echo ""
echo "3️⃣  Copia esa URL y configúrala en Clerk:"
echo ""
echo "    a) Ve a: https://dashboard.clerk.com/"
echo "    b) Selecciona tu aplicación"
echo "    c) Click en 'Webhooks' en el menú lateral"
echo "    d) Click en '+ Add Endpoint'"
echo "    e) Pega la URL de ngrok seguida de:"
echo "       /api/webhooks/clerk"
echo ""
echo "       Ejemplo completo:"
echo "       https://xxxx-xx-xx.ngrok-free.app/api/webhooks/clerk"
echo ""
echo "    f) Selecciona eventos:"
echo "       ✅ user.created"
echo "       ✅ user.updated"
echo ""
echo "    g) Click en 'Create'"
echo "    h) Copia el 'Signing Secret' (empieza con whsec_)"
echo "    i) Agrégalo a .env.local:"
echo ""
echo "       CLERK_WEBHOOK_SECRET=whsec_tu_secret_aqui"
echo ""
echo "    j) Reinicia el servidor (Ctrl+C y npm run dev)"
echo ""
echo "4️⃣  Prueba registrando un NUEVO usuario en:"
echo "    http://localhost:3000/sign-up"
echo ""
echo "5️⃣  Verifica los logs en la terminal donde corre npm run dev"
echo "    Deberías ver:"
echo "    🚀 WEBHOOK CLERK - INICIO DE EJECUCIÓN"
echo ""
echo "======================================"
echo ""
echo "💡 TIP: Cada vez que reinicias ngrok, la URL cambia."
echo "        Deberás actualizar el webhook en Clerk Dashboard."
echo ""
echo "📖 Para más información: DIAGNOSTICO_RESUMEN.md"
echo ""
