#!/bin/bash

# Script helper para configurar ngrok + webhook de Clerk
# Este script te guía paso a paso

clear

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🔧 CONFIGURACIÓN GUIADA - Clerk Webhook"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Paso 1: Verificar ngrok
echo "📦 Paso 1/5: Verificando ngrok..."
echo ""

if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok no está instalado"
    echo ""
    echo "Necesitas instalarlo con:"
    echo "  brew install ngrok"
    echo ""
    echo "O descárgalo desde: https://ngrok.com/download"
    echo ""
    echo "Después de instalarlo, vuelve a ejecutar este script."
    exit 1
fi

echo "✅ ngrok está instalado"
echo ""

# Paso 2: Verificar servidor
echo "📦 Paso 2/5: Verificando servidor Next.js..."
echo ""

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Servidor corriendo en puerto 3000"
    echo ""
else
    echo "❌ No hay servidor corriendo"
    echo ""
    echo "Por favor:"
    echo "  1. Abre OTRA terminal (no esta)"
    echo "  2. Navega a: cd $(pwd)"
    echo "  3. Ejecuta: npm run dev"
    echo "  4. Espera a ver: ✓ Ready on http://localhost:3000"
    echo "  5. Vuelve a ejecutar este script"
    echo ""
    exit 1
fi

# Paso 3: Instrucciones de ngrok
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Paso 3/5: Iniciar ngrok"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Ahora necesitas iniciar ngrok en OTRA terminal."
echo ""
echo "IMPORTANTE: Abre UNA NUEVA TERMINAL (no uses esta)"
echo ""
echo "En la nueva terminal, ejecuta:"
echo ""
echo "  ngrok http 3000"
echo ""
echo "Ngrok te mostrará algo como:"
echo ""
echo "  ┌──────────────────────────────────────┐"
echo "  │ Forwarding                           │"
echo "  │ https://a1b2-c3-d4.ngrok-free.app    │"
echo "  │ → http://localhost:3000              │"
echo "  └──────────────────────────────────────┘"
echo ""
echo "COPIA la URL de ngrok (la que empieza con https://)"
echo ""
read -p "Pega aquí la URL de ngrok: " NGROK_URL

# Validar URL
if [[ ! $NGROK_URL =~ ^https:// ]]; then
    echo ""
    echo "❌ La URL debe empezar con 'https://'"
    echo ""
    echo "Ejemplo correcto: https://a1b2-c3-d4.ngrok-free.app"
    exit 1
fi

# Remover trailing slash si existe
NGROK_URL=${NGROK_URL%/}

WEBHOOK_URL="${NGROK_URL}/api/webhooks/clerk"

echo ""
echo "✅ URL del webhook generada:"
echo "   $WEBHOOK_URL"
echo ""

# Paso 4: Configurar en Clerk
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Paso 4/5: Configurar en Clerk Dashboard"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Ahora ve a tu navegador y sigue estos pasos:"
echo ""
echo "1. Abre: https://dashboard.clerk.com/"
echo ""
echo "2. Selecciona tu aplicación"
echo ""
echo "3. Click en 'Webhooks' en el menú lateral"
echo ""
echo "4. Click en '+ Add Endpoint' o 'Create'"
echo ""
echo "5. En 'Endpoint URL', pega EXACTAMENTE:"
echo ""
echo "   $WEBHOOK_URL"
echo ""
echo "   (Puedes copiar esta URL de arriba)"
echo ""
echo "6. En 'Subscribe to events', selecciona:"
echo "   ✅ user.created"
echo "   ✅ user.updated"
echo ""
echo "7. Click en 'Create' o 'Add Endpoint'"
echo ""
echo "8. Clerk te mostrará un 'Signing Secret'"
echo "   (Empieza con 'whsec_')"
echo ""
read -p "Pega aquí el Signing Secret: " WEBHOOK_SECRET

# Validar secret
if [[ ! $WEBHOOK_SECRET =~ ^whsec_ ]]; then
    echo ""
    echo "⚠️  El secret debe empezar con 'whsec_'"
    echo ""
    echo "¿Estás seguro que copiaste el Signing Secret correcto?"
    read -p "Continuar de todos modos? (y/n): " confirm
    if [[ $confirm != "y" ]]; then
        exit 1
    fi
fi

# Paso 5: Actualizar .env.local
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Paso 5/5: Actualizando .env.local"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar si ya existe CLERK_WEBHOOK_SECRET
if grep -q "^CLERK_WEBHOOK_SECRET=" .env.local 2>/dev/null; then
    echo "Reemplazando CLERK_WEBHOOK_SECRET existente..."
    # macOS compatible
    sed -i '' "s|^CLERK_WEBHOOK_SECRET=.*|CLERK_WEBHOOK_SECRET=$WEBHOOK_SECRET|" .env.local
else
    echo "Agregando CLERK_WEBHOOK_SECRET..."
    echo "" >> .env.local
    echo "CLERK_WEBHOOK_SECRET=$WEBHOOK_SECRET" >> .env.local
fi

echo "✅ .env.local actualizado"
echo ""

# Resumen final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ¡CONFIGURACIÓN COMPLETADA!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Resumen:"
echo "  • Webhook URL: $WEBHOOK_URL"
echo "  • Webhook Secret: Guardado en .env.local"
echo "  • Eventos: user.created, user.updated"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠️  ÚLTIMO PASO: Reiniciar el servidor"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Para que el nuevo secret tome efecto:"
echo ""
echo "1. Ve a la terminal donde corre 'npm run dev'"
echo "2. Presiona Ctrl+C para detenerlo"
echo "3. Ejecuta nuevamente: npm run dev"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 PROBAR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Después de reiniciar el servidor:"
echo ""
echo "OPCIÓN 1: Enviar evento de prueba desde Clerk"
echo "  • Ve a Clerk Dashboard → Webhooks"
echo "  • Click en tu endpoint"
echo "  • Pestaña 'Testing'"
echo "  • Click 'Send example'"
echo "  • Mira la terminal del servidor"
echo ""
echo "OPCIÓN 2: Registrar un usuario real"
echo "  • Ve a: http://localhost:3000/sign-up"
echo "  • Regístrate con un EMAIL NUEVO"
echo "  • Mira la terminal del servidor"
echo "  • Deberías ver: 🚀 WEBHOOK CLERK - INICIO DE EJECUCIÓN"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "¡Listo! 🎉"
echo ""
