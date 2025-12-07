const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

async function inspectTable() {
  console.log('🔍 Inspeccionando tabla "clients"...');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan variables de entorno');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Intentamos insertar un registro dummy para ver el error y deducir columnas
  // O mejor, hacemos un select simple
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error al leer tabla:', error.message);
    if (error.code === '42P01') {
      console.error('👉 La tabla "clients" NO EXISTE en la base de datos.');
      console.error('   Debes ejecutar el archivo SUPABASE_SCHEMA_V2.sql en el SQL Editor de Supabase.');
    }
    return;
  }

  console.log('✅ La tabla "clients" existe.');

  if (data && data.length > 0) {
    console.log('📋 Columnas detectadas en el primer registro:', Object.keys(data[0]));
  } else {
    console.log('⚠️ La tabla está vacía, no puedo detectar columnas automáticamente.');
    console.log('   Por favor, ejecuta SUPABASE_SCHEMA_V2.sql para asegurar la estructura correcta.');
  }
}

inspectTable();
