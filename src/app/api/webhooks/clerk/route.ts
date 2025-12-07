import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { supabase } from '@/lib/supabase';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

function getRegistrationType(data: any): 'email' | 'google' {
  console.log("HERE!!")
  const hasGoogleAccount = data.external_accounts?.some(
    (account: any) => account.provider === 'google'
  );
  return hasGoogleAccount ? 'google' : 'email';
}

export async function POST(req: Request) {
  // Log inicial para confirmar que el endpoint se ejecuta
  console.log('🚀 ============================================');
  console.log('🚀 WEBHOOK CLERK - INICIO DE EJECUCIÓN');
  console.log('🚀 Timestamp:', new Date().toISOString());
  console.log('🚀 ============================================');

  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  console.log('📋 Headers recibidos:');
  console.log('  - svix-id:', svixId);
  console.log('  - svix-timestamp:', svixTimestamp);
  console.log('  - svix-signature:', svixSignature ? '✅ presente' : '❌ ausente');
  console.log('  - webhook-secret configurado:', webhookSecret ? '✅' : '❌')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Error: no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log('📦 Payload recibido:', JSON.stringify(payload, null, 2));

  const wh = new Webhook(webhookSecret);

  let evt: any;

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as any;
    console.log('✅ Webhook verificado correctamente');
  } catch (err) {
    console.error('❌ Error verificando webhook:', err);
    return new NextResponse('Error verifying webhook', { status: 400 });
  }

  const eventType = evt.type;
  const { email_addresses, first_name, last_name } = evt.data;

  console.log('📨 Tipo de evento:', eventType);
  console.log('👤 Datos del usuario:');
  console.log('  - Email:', email_addresses?.[0]?.email_address);
  console.log('  - Nombre:', first_name);
  console.log('  - Apellido:', last_name);

  try {

    if (eventType === 'user.created' || eventType === 'user.updated') {
      console.log('🔄 Procesando evento:', eventType);

      const registrationType = getRegistrationType(evt.data);
      console.log('🔐 Tipo de registro detectado:', registrationType);

      // Mapeo a los campos de la tabla clients
      const userData = {
        email: email_addresses?.[0]?.email_address || '',
        registration_type: registrationType,
        firstName: first_name || null,
        secondName: last_name || null,
      };

      console.log('💾 Datos a guardar en Supabase:', JSON.stringify(userData, null, 2));

      const { data, error } = await supabase
        .from('clients')
        .upsert(userData, { onConflict: 'email' })
        .select()
        .single();

      console.log('📊 Resultado de Supabase:');
      console.log('  - Data:', data);
      console.log('  - Error:', error);

      if (error) {
        console.error('❌ Error Supabase Webhook:', error.message);
        console.error('❌ Detalles completos del error:', JSON.stringify(error, null, 2));
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      console.log(`✅ Cliente procesado via webhook: ID=${data.id}`);
      return NextResponse.json({ success: true, clientId: data.id });
    }

    if (eventType === 'user.deleted') {
      const emailToDelete = email_addresses?.[0]?.email_address;
      if (emailToDelete) {
        await supabase.from('clients').delete().eq('email', emailToDelete);
        console.log(`✅ Cliente eliminado via webhook: ${emailToDelete}`);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(`❌ Error procesando ${eventType}:`, error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
