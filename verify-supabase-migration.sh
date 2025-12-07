#!/bin/bash

echo "=================================================="
echo "  🧪 Verificación de Migración a Supabase"
echo "=================================================="
echo ""

echo "✅ 1. Verificando .env:"
if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env; then
    echo "   ✅ URL Configurada"
else
    echo "   ❌ URL Faltante"
fi

if grep -q "DATABASE_URL" .env; then
    echo "   ⚠️  DATABASE_URL todavía existe (debería haberse eliminado o ignorado)"
else
    echo "   ✅ DATABASE_URL eliminada (Correcto)"
fi

echo ""
echo "✅ 2. Verificando eliminación de Prisma:"
if [ -d "prisma" ]; then
    echo "   ❌ Carpeta prisma/ todavía existe"
else
    echo "   ✅ Carpeta prisma/ eliminada"
fi

if [ -f "src/lib/prisma.ts" ]; then
    echo "   ❌ src/lib/prisma.ts todavía existe"
else
    echo "   ✅ src/lib/prisma.ts eliminado"
fi

echo ""
echo "✅ 3. Verificando Cliente Supabase:"
if [ -f "src/lib/supabase.ts" ]; then
    echo "   ✅ src/lib/supabase.ts existe"
else
    echo "   ❌ src/lib/supabase.ts no encontrado"
fi

echo ""
echo "✅ 4. Verificando Sincronización de Usuarios:"
if grep -q "from 'clients'" src/lib/user-sync.ts; then
    echo "   ✅ user-sync.ts usa tabla 'clients'"
else
    echo "   ❌ user-sync.ts no parece estar actualizado"
fi

echo ""
echo "=================================================="
echo "  📋 PASO CRÍTICO: CREAR TABLAS"
echo "=================================================="
echo ""
echo "Debes ejecutar el SQL en Supabase Dashboard:"
echo "1. Ve a https://supabase.com/dashboard/project/xwrjiepxkgyqalsordws/sql"
echo "2. Haz clic en 'New Query'"
echo "3. Copia el contenido de SUPABASE_SCHEMA.sql"
echo "4. Haz clic en 'Run'"
echo ""
echo "Si no haces esto, obtendrás error: 'relation \"clients\" does not exist'"
echo ""
echo "=================================================="
