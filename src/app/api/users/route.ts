import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getDB } from '@/db/data-source';
import { ClientEntity, type Client } from '@/db/entities/Client';

// GET /api/users - Get all clients (requires authenticated Clerk user)
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDB();
    const repo = db.getRepository<Client>(ClientEntity);

    const clients = await repo.find({
      order: { created_at: 'DESC' },
    });

    return NextResponse.json({
      success: true,
      count: clients.length,
      clients,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clients',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Ensure current client exists in DB and return it
export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registrationType: 'email' | 'google' =
      user.externalAccounts?.some((account) => account.provider === 'google')
        ? 'google'
        : 'email';

    const email = user.emailAddresses?.[0]?.emailAddress ?? '';

    const db = await getDB();
    const repo = db.getRepository<Client>(ClientEntity);

    const existing = await repo.findOneBy({ email });

    const payload = {
      email,
      registration_type: registrationType,
      firstName: user.firstName ?? null,
      secondName: user.lastName ?? null,
    };

    let client: Client;

    if (existing) {
      await repo.update({ email }, payload);
      client = { ...existing, ...payload };
    } else {
      client = await repo.save(repo.create(payload));
    }

    return NextResponse.json({
      success: true,
      client,
    });
  } catch (error) {
    console.error('Error fetching current client:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch client',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
