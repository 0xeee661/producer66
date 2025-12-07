import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

// GET /api/users - Get all clients (requires authenticated Clerk user)
export async function GET() {
  console.log("HERE!!")

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("HERE1!!")

    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    console.log("HERE2!!")

    return NextResponse.json({
      success: true,
      count: clients.length,
      clients
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clients',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Ensure current client exists in DB and return it
export async function POST() {
  console.log("HERE3!!")

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

    const payload = {
      email: user.emailAddresses?.[0]?.emailAddress ?? '',
      registration_type: registrationType,
      firstName: user.firstName ?? null,
      secondName: user.lastName ?? null,
    };

    const { data: client, error } = await supabase
      .from('clients')
      .upsert(payload, { onConflict: 'email' })
      .select()
      .single();

    if (error || !client) {
      console.error('Error ensuring client:', error?.message);
      return NextResponse.json(
        { error: 'Failed to ensure client in database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      client
    });
  } catch (error) {
    console.error('Error fetching current client:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch client',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
