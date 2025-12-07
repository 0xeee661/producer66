const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

async function testConnection() {
  console.log('🔍 Probando conexión a Supabase...');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan variables de entorno');
    console.log('URL:', supabaseUrl);
    console.log('KEY:', supabaseKey ? 'Presente' : 'Faltante');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('📡 Intentando insertar usuario de prueba en tabla "clients"...');

  const testUser = {
    email: `test_${Date.now()}@example.com`,
    registration_type: 'test',
    firstName: 'Test',
    secondName: 'User'
  };

  const { data, error } = await supabase
    .from('clients')
    .insert(testUser)
    .select()
    .single();

  if (error) {
    console.error('❌ ERROR AL INSERTAR:', error);

    if (error.code === '42P01') {
      console.error('💡 CAUSA PROBABLE: La tabla "clients" NO EXISTE.');
      console.error('👉 SOLUCIÓN: Ejecuta el SQL de SUPABASE_SCHEMA.sql en tu dashboard.');
    } else if (error.code === '42501') {
      console.error('💡 CAUSA PROBABLE: Permisos denegados (RLS).');
      console.error('👉 SOLUCIÓN: Revisa las políticas RLS en Supabase.');
    }
  } else {
    console.log('✅ ÉXITO: Usuario insertado correctamente.');
    console.log('📄 Datos:', data);

    // Limpiar
    console.log('🧹 Eliminando usuario de prueba...');
    await supabase.from('clients').delete().eq('id', data.id);
  }
}

testConnection();
