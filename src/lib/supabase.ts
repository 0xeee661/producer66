import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Nota: No lanzamos error aquí para no bloquear la carga de los route handlers
// y permitir que se ejecuten los console.log de debugging aunque falten vars.
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// Cliente estándar para uso general
// Si las envs faltan, se usará un placeholder; las operaciones fallarán,
// pero no bloquearán la carga de las APIs ni la ejecución de console.log iniciales.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
