import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getDB } from '@/db/data-source';
import { ClientEntity, type Client } from '@/db/entities/Client';

export async function GET() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    const db = await getDB();
    const repo = db.getRepository<Client>(ClientEntity);

    // Lookup by clerkId first, fallback to email
    let client = await repo.findOneBy({ clerkId: clerkUser.id })
      || await repo.findOneBy({ email });

    // Auto-create DB record if user exists in Clerk but not in DB
    if (!client) {
      const hasGoogle = clerkUser.externalAccounts?.some(
        (account) => account.provider === 'oauth_google'
      );

      client = await repo.save(repo.create({
        email,
        clerkId: clerkUser.id,
        firstName: clerkUser.firstName,
        secondName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        username: clerkUser.username,
        registration_type: hasGoogle ? 'google' : 'email',
      }));
    }

    return NextResponse.json({
      id: client.id,
      email: client.email,
      role: client.role,
      firstName: client.firstName,
      imageUrl: client.imageUrl,
      username: client.username,
      clerkId: client.clerkId,
    });
  } catch (error) {
    console.error('Error /api/me:', error);
    return NextResponse.json({ role: null }, { status: 500 });
  }
}
