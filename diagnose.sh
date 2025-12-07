#!/bin/bash

echo "🔍 ============================================"
echo "🔍 DIAGNÓSTICO DE CONFIGURACIÓN - Clerk + Supabase"
echo "🔍 ============================================"
echo ""

# Función para verificar si una variable existe
check_env() {
    local var_name=$1
    local var_value=$(grep "^$var_name=" .env.local 2>/dev/null | cut -d '=' -f2-)
    
    if [ -z "$var_value" ]; then
        echo "❌ $var_name: NO CONFIGURADA"
        return 1
    else
        # Mostrar solo los primeros caracteres para seguridad
        local preview="${var_value:0:20}..."
        echo "✅ $var_name: $preview"
        return 0
    fi
}

echo "📋 VERIFICANDO VARIABLES DE ENTORNO"
echo "======================================"
echo ""

# Variables de Clerk
echo "🔐 Clerk Variables:"
check_env "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
check_env "CLERK_SECRET_KEY"
check_env "CLERK_WEBHOOK_SECRET"
echo ""

# Variables de Supabase
echo "🗄️  Supabase Variables:"
check_env "NEXT_PUBLIC_SUPABASE_URL"
check_env "NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""

# Verificar si el webhook secret existe
webhook_secret=$(grep "^CLERK_WEBHOOK_SECRET=" .env.local 2>/dev/null | cut -d '=' -f2-)

if [ -z "$webhook_secret" ]; then
    echo "⚠️  PROBLEMA CRÍTICO DETECTADO:"
    echo ""
    echo "   CLERK_WEBHOOK_SECRET no está configurado"
    echo ""
    echo "   🔧 SOLUCIÓN:"
    echo "   1. Ve a https://dashboard.clerk.com/"
    echo "   2. Click en tu aplicación"
    echo "   3. Ve a 'Webhooks' en el menú lateral"
    echo "   4. Si no tienes un endpoint, crea uno nuevo"
    echo "   5. Copia el 'Signing Secret' (empieza con whsec_)"
    echo "   6. Agrégalo a .env.local:"
    echo ""
    echo "      CLERK_WEBHOOK_SECRET=whsec_tu_secret_aqui"
    echo ""
fi

# Verificar si hay un servidor corriendo
echo "======================================"
echo "🌐 VERIFICANDO SERVIDOR"
echo "======================================"
echo ""

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Servidor corriendo en puerto 3000"
    echo ""
    echo "   Para ver logs del webhook, mantén la terminal abierta"
    echo "   donde ejecutaste 'npm run dev'"
else
    echo "❌ No hay servidor corriendo en puerto 3000"
    echo ""
    echo "   Ejecuta: npm run dev"
fi

echo ""
echo "======================================"
echo "🔔 CONFIGURACIÓN DE WEBHOOK EN CLERK"
echo "======================================"
echo ""

if [ -n "$webhook_secret" ]; then
    echo "✅ Webhook Secret configurado"
    echo ""
    echo "   Ahora verifica en Clerk Dashboard que:"
    echo ""
    echo "   1. El endpoint del webhook esté configurado"
    echo "   2. La URL sea correcta:"
    echo ""
    
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "      Para desarrollo local (necesitas ngrok):"
        echo "      → https://TU-SUBDOMINIO.ngrok-free.app/api/webhooks/clerk"
        echo ""
        echo "      Para ejecutar ngrok:"
        echo "      → En otra terminal: ngrok http 3000"
    fi
    
    echo ""
    echo "      Para producción:"
    echo "      → https://tu-dominio.vercel.app/api/webhooks/clerk"
    echo ""
    echo "   3. Los eventos estén seleccionados:"
    echo "      ✅ user.created"
    echo "      ✅ user.updated"
    echo ""
else
    echo "⚠️  No se puede verificar webhook - falta CLERK_WEBHOOK_SECRET"
fi

echo ""
echo "======================================"
echo "🧪 CÓMO PROBAR"
echo "======================================"
echo ""
echo "1. Asegúrate de que el servidor esté corriendo (npm run dev)"
echo ""
echo "2. Si estás en desarrollo local:"
echo "   - Ejecuta: ngrok http 3000"
echo "   - Copia la URL de ngrok"
echo "   - Actualiza el webhook en Clerk Dashboard"
echo ""
echo "3. Haz una prueba:"
echo "   - Ve a Clerk Dashboard → Webhooks → Tu endpoint"
echo "   - Click en 'Testing' o 'Send test event'"
echo "   - Deberías ver logs en tu consola"
echo ""
echo "4. Registra un NUEVO usuario:"
echo "   - Ve a /sign-up"
echo "   - Usa un email que NUNCA hayas usado"
echo "   - Verifica los logs en tu consola"
echo ""
echo "======================================"
echo ""
echo "📖 Para más información, lee: WEBHOOK_DEBUGGING.md"
echo ""
