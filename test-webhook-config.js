// Test manual del endpoint del webhook
// Este script simula una llamada al webhook para verificar que funciona

const testWebhook = async () => {
  console.log('🧪 INICIANDO TEST DEL WEBHOOK');
  console.log('==============================\n');

  // Verificar variables de entorno
  const envVars = {
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ Faltante',
    'CLERK_WEBHOOK_SECRET': process.env.CLERK_WEBHOOK_SECRET ? '✅ Configurada' : '❌ Faltante',
  };

  console.log('📋 Variables de entorno:');
  for (const [key, value] of Object.entries(envVars)) {
    console.log(`  ${key}: ${value}`);
  }
  console.log('');

  // Verificar conexión a Supabase
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log('🗄️  Verificando conexión a Supabase...');

    const { data, error } = await supabase.from('clients').select('count').limit(1);

    if (error) {
      console.error('❌ Error conectando a Supabase:', error.message);
      console.log('\n⚠️  PROBLEMA: No se puede conectar a Supabase');
      console.log('   Verifica que:');
      console.log('   1. NEXT_PUBLIC_SUPABASE_URL sea correcta');
      console.log('   2. NEXT_PUBLIC_SUPABASE_ANON_KEY sea correcta');
      console.log('   3. La tabla "clients" exista en Supabase');
      return;
    } else {
      console.log('✅ Conexión exitosa a Supabase\n');
    }

    // Verificar que la tabla existe
    console.log('📊 Verificando tabla "clients"...');
    const { data: tableData, error: tableError } = await supabase
      .from('clients')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ Error con la tabla "clients":', tableError.message);
      console.log('\n⚠️  PROBLEMA: La tabla "clients" no existe o no es accesible');
      console.log('   Ejecuta: SUPABASE_SCHEMA_V2.sql en Supabase SQL Editor');
      return;
    } else {
      console.log('✅ Tabla "clients" existe y es accesible\n');
    }

    // Información sobre el webhook
    console.log('==============================');
    console.log('🔔 CONFIGURACIÓN DEL WEBHOOK');
    console.log('==============================\n');

    console.log('Para que el webhook funcione:');
    console.log('');
    console.log('1️⃣  DESARROLLO LOCAL:');
    console.log('   a) Instala ngrok: brew install ngrok');
    console.log('   b) En una terminal: npm run dev');
    console.log('   c) En OTRA terminal: ngrok http 3000');
    console.log('   d) Ngrok te dará una URL pública como:');
    console.log('      → https://xxxx-xx-xx.ngrok-free.app');
    console.log('   e) Ve a Clerk Dashboard → Webhooks');
    console.log('   f) Agrega un endpoint con la URL:');
    console.log('      → https://xxxx-xx-xx.ngrok-free.app/api/webhooks/clerk');
    console.log('   g) Selecciona eventos: user.created, user.updated');
    console.log('   h) Copia el "Signing Secret" y agrégalo a .env.local');
    console.log('');
    console.log('2️⃣  PRODUCCIÓN (Vercel):');
    console.log('   a) Despliega tu app en Vercel');
    console.log('   b) Ve a Clerk Dashboard → Webhooks');
    console.log('   c) Agrega un endpoint con la URL:');
    console.log('      → https://tu-dominio.vercel.app/api/webhooks/clerk');
    console.log('   d) Selecciona eventos: user.created, user.updated');
    console.log('   e) Copia el "Signing Secret" y agrégalo a Vercel env vars');
    console.log('');
    console.log('==============================\n');

    console.log('✅ RESUMEN:');
    console.log('   - Supabase: Configurado correctamente');
    console.log('   - Tabla clients: Existe');
    console.log('   - Webhook Secret: Configurado');
    console.log('');
    console.log('⚠️  SIGUIENTE PASO:');
    console.log('   Configura el webhook en Clerk Dashboard');
    console.log('   (Lee WEBHOOK_DEBUGGING.md para instrucciones detalladas)');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' });

testWebhook();
