import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getDB } from '@/db/data-source';
import { ClientEntity, type Client } from '@/db/entities/Client';

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.email) {
      return NextResponse.json(
        { success: false, error: 'Email es requerido' },
        { status: 400 }
      );
    }

    const userData = {
      email: body.email,
      clerkId: clerkUser.id,
      registration_type: body.registrationType || 'email',
      firstName: body.firstName || null,
      secondName: body.lastName || null,
      imageUrl: body.imageUrl || null,
      username: body.username || null,
    };

    const db = await getDB();
    const repo = db.getRepository<Client>(ClientEntity);

    // Lookup by clerkId first (more reliable), then fallback to email
    const existing = await repo.findOneBy({ clerkId: clerkUser.id })
      || await repo.findOneBy({ email: userData.email });

    let data: Client;

    if (existing) {
      await repo.update({ id: existing.id }, userData);
      data = { ...existing, ...userData };
    } else {
      data = await repo.save(repo.create(userData));
    }

    return NextResponse.json({
      success: true,
      client: data,
      message: 'Usuario sincronizado correctamente',
    });

  } catch (error: any) {
    console.error('Error sync-user:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error interno' },
      { status: 500 }
    );
  }
}
