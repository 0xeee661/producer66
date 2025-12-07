import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

/**
 * 📡 API ROUTE: /api/sync-user
 * 
 * Este endpoint se llama desde el FRONTEND cuando un usuario se registra/loguea.
 * Recibe los datos del usuario y los guarda en Supabase.
 * 
 * 🔒 SEGURIDAD: Verifica que el usuario esté autenticado con Clerk
 */
export async function POST(req: Request) {
  console.log('🚀 ============================================');
  console.log('🚀 API /sync-user - INICIO');
  console.log('🚀 Timestamp:', new Date().toISOString());
  console.log('🚀 ============================================');

  try {
    // 🔒 Verificar autenticación
    const clerkUser = await currentUser();

    if (!clerkUser) {
      console.error('❌ Usuario no autenticado');
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }

    console.log('✅ Usuario autenticado:', clerkUser.id);

    // Leer los datos del body
    const body = await req.json();
    console.log('📥 Datos recibidos del frontend:', body);

    // Validar email
    if (!body.email) {
      console.error('❌ Email es requerido');
      return NextResponse.json(
        { success: false, error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Preparar datos para Supabase (usando columnas reales)
    const userData = {
      email: body.email,
      registration_type: body.registrationType || 'email',
      firstName: body.firstName || null,
      secondName: body.lastName || null,
    };

    console.log('💾 Guardando en Supabase:', userData);

    // Guardar en Supabase usando upsert (crear o actualizar)
    const { data, error } = await supabase
      .from('clients')
      .upsert(userData, { onConflict: 'email' })
      .select()
      .single();

    if (error) {
      console.error('❌ Error de Supabase:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Usuario guardado exitosamente en Supabase');
    console.log('📊 Datos guardados:', data);
    console.log('🆔 ID en Supabase:', data.id);
    console.log('🚀 ============================================');

    return NextResponse.json({
      success: true,
      client: data,
      message: 'Usuario sincronizado correctamente',
    });

  } catch (error: any) {
    console.error('❌ Error general:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error interno' },
      { status: 500 }
    );
  }
}
