'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';

/**
 * 🔄 COMPONENTE DE SINCRONIZACIÓN AUTOMÁTICA
 * 
 * Este componente detecta cuando un usuario se registra o loguea con Clerk
 * y automáticamente envía sus datos a Supabase.
 * 
 * 📍 DÓNDE OCURRE LA CONEXIÓN:
 * 1. useUser() - Hook de Clerk que detecta el usuario actual
 * 2. useEffect() - Se ejecuta automáticamente cuando el usuario cambia
 * 3. fetch('/api/sync-user') - Llamada al API route que guarda en Supabase
 */
export default function UserSync() {
  const { user, isLoaded } = useUser();
  const hasSync = useRef(false);

  useEffect(() => {
    // 🔍 PUNTO DE CONEXIÓN #1: Detectar usuario de Clerk
    console.log('🔄 UserSync - Estado:', {
      isLoaded,
      hasUser: !!user,
      userId: user?.id,
      email: user?.emailAddresses[0]?.emailAddress,
    });

    // Solo sincronizar si:
    // 1. Clerk está cargado
    // 2. Hay un usuario logueado
    // 3. No hemos sincronizado ya (evitar duplicados)
    if (isLoaded && user && !hasSync.current) {
      hasSync.current = true;

      console.log('✅ Usuario detectado, sincronizando con Supabase...');

      // 🔍 PUNTO DE CONEXIÓN #2: Llamar al API route
      syncUserToSupabase(user);
    }
  }, [user, isLoaded]);

  // Esta función no renderiza nada visible
  return null;
}

/**
 * 📡 FUNCIÓN QUE ENVÍA DATOS A SUPABASE
 * 
 * Esta función toma los datos del usuario de Clerk y los envía
 * a nuestro API route que se encarga de guardarlos en Supabase.
 */
async function syncUserToSupabase(user: any) {
  try {
    console.log('📤 Enviando datos a /api/sync-user...');
    console.log('📋 Datos del usuario:', {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      username: user.username,
    });

    // 🔍 PUNTO DE CONEXIÓN #3: Fetch al API route
    //PROBLEMA !
    const response = await fetch('/api/sync-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || null,
        lastName: user.lastName || null,
        imageUrl: user.imageUrl || null,
        username: user.username || null,
        // Detectar tipo de registro
        registrationType: user.externalAccounts?.some(
          (account: any) => account.provider === 'oauth_google'
        ) ? 'google' : 'email',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Usuario sincronizado exitosamente:', data);
      console.log('💾 ID en Supabase:', data.client?.id);
    } else {
      console.error('❌ Error al sincronizar:', data.error);
    }
  } catch (error) {
    console.error('❌ Error de red al sincronizar:', error);
  }
}
