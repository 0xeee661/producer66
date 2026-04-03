import { currentUser } from '@clerk/nextjs/server';
import { getDB } from '@/db/data-source';
import { ClientEntity, type Client } from '@/db/entities/Client';

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
      return null;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      return null;
    }

    const registrationType = getRegistrationType(clerkUser);

    const db = await getDB();
    const repo = db.getRepository<Client>(ClientEntity);

    // Lookup by clerkId first (more reliable), fallback to email
    const existing = await repo.findOneBy({ clerkId: clerkUser.id })
      || await repo.findOneBy({ email });

    const userData = {
      email,
      clerkId: clerkUser.id,
      registration_type: registrationType,
      firstName: clerkUser.firstName,
      secondName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
      username: clerkUser.username,
    };

    let client: Client;

    if (existing) {
      await repo.update({ id: existing.id }, userData);
      client = { ...existing, ...userData };
    } else {
      client = await repo.save(repo.create(userData));
    }

    return client;

  } catch (error) {
    console.error('Error syncCurrentUser:', error);
    return null;
  }
}

export async function getCurrentClient() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) return null;

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) return null;

    const db = await getDB();
    const repo = db.getRepository<Client>(ClientEntity);

    // Lookup by clerkId first, fallback to email
    const client = await repo.findOneBy({ clerkId: clerkUser.id })
      || await repo.findOneBy({ email });

    if (!client) {
      return null;
    }

    return client;
  } catch (error) {
    console.error('Error getCurrentClient:', error);
    return null;
  }
}
