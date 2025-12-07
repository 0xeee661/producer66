import { currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

function getRegistrationType(clerkUser: any): 'email' | 'google' {
  const hasGoogleAccount = clerkUser.externalAccounts?.some(
    (account: any) => account.provider === 'oauth_google'
  );
  return hasGoogleAccount ? 'google' : 'email';
}

export async function syncCurrentUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      console.log('❌ No hay usuario de Clerk');
      return null;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      console.error('❌ Usuario no tiene email');
      return null;
    }

    const registrationType = getRegistrationType(clerkUser);

    console.log(`🔄 Sincronizando usuario en Supabase: ${email}`);

    // Mapeo a columnas de la tabla clients
    const userData = {
      email: email,
      registration_type: registrationType,
      firstName: clerkUser.firstName, // campo correcto en DB
      secondName: clerkUser.lastName, // campo correcto en DB
    };

    // Verificamos si existe antes para loguear correctamente
    const { data: existing } = await supabase
      .from('clients')
      .select('id')
      .eq('email', email)
      .single();

    const isNewUser = !existing;

    const { data, error } = await supabase
      .from('clients')
      .upsert(userData, { onConflict: 'email' })
      .select()
      .single();

    if (error) {
      console.error('❌ Error Supabase:', error.message);
      return null;
    }

    if (isNewUser) {
      console.log(`✨ USUARIO NUEVO CREADO: ${email} (ID: ${data.id})`);
    } else {
      console.log(`🔄 Usuario existente actualizado: ${email} (ID: ${data.id})`);
    }

    return data;

  } catch (error) {
    console.error('❌ Error general:', error);
    return null;
  }
}

export async function getCurrentClient() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) return null;

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) return null;

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching client:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting current client:', error);
    return null;
  }
}
