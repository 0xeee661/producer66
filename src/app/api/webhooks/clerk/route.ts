import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { getDB } from '@/db/data-source';
import { ClientEntity, type Client } from '@/db/entities/Client';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

function getRegistrationType(data: any): 'email' | 'google' {
  const hasGoogleAccount = data.external_accounts?.some(
    (account: any) => account.provider === 'google'
  );
  return hasGoogleAccount ? 'google' : 'email';
}

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Error: no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);

  let evt: any;

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as any;
  } catch (err) {
    console.error('Error verificando webhook:', err);
    return new NextResponse('Error verifying webhook', { status: 400 });
  }

  const eventType = evt.type;

  try {
    const db = await getDB();
    const repo = db.getRepository<Client>(ClientEntity);

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;
      const registrationType = getRegistrationType(evt.data);
      const email = email_addresses?.[0]?.email_address || '';

      const userData = {
        email,
        clerkId: id,
        registration_type: registrationType,
        firstName: first_name || null,
        secondName: last_name || null,
        imageUrl: image_url || null,
        username: username || null,
      };

      // Lookup by clerkId first, fallback to email
      const existing = await repo.findOneBy({ clerkId: id })
        || await repo.findOneBy({ email });

      let client: Client;

      if (existing) {
        await repo.update({ id: existing.id }, userData);
        client = { ...existing, ...userData };
      } else {
        client = await repo.save(repo.create(userData));
      }

      return NextResponse.json({ success: true, clientId: client.id });
    }

    if (eventType === 'user.deleted') {
      const clerkId = evt.data.id;
      if (clerkId) {
        await repo.delete({ clerkId });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(`Error procesando ${eventType}:`, error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
