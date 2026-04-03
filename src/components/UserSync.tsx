'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';

export default function UserSync() {
  const { user, isLoaded } = useUser();
  const hasSync = useRef(false);

  useEffect(() => {
    if (isLoaded && user && !hasSync.current) {
      hasSync.current = true;
      syncUserToDB(user);
    }
  }, [user, isLoaded]);

  return null;
}

async function syncUserToDB(user: any) {
  try {
    const response = await fetch('/api/sync-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || null,
        lastName: user.lastName || null,
        imageUrl: user.imageUrl || null,
        username: user.username || null,
        registrationType: user.externalAccounts?.some(
          (account: any) => account.provider === 'oauth_google'
        ) ? 'google' : 'email',
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Error syncing user:', data.error);
    }
  } catch (error) {
    console.error('Network error syncing user:', error);
  }
}
