import { NextResponse } from 'next/server';
import { getDB } from '@/db/data-source';
import { BeatEntity, type Beat } from '@/db/entities/Beat';

// GET /api/beats - Obtener todos los beats
export async function GET() {
  try {
    const db = await getDB();
    const repo = db.getRepository<Beat>(BeatEntity);

    const beats = await repo.find({
      order: { created_at: 'DESC' },
      take: 10,
    });

    return NextResponse.json(beats);
  } catch (error) {
    console.error('Error fetching beats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch beats' },
      { status: 500 }
    );
  }
}

// POST /api/beats - Crear un nuevo beat
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || !data.bpm || !data.key || !data.price || !data.tag) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDB();
    const repo = db.getRepository<Beat>(BeatEntity);

    const beat = await repo.save(
      repo.create({
        title: data.title,
        bpm: parseInt(data.bpm),
        key: data.key,
        price: parseFloat(data.price),
        tag: data.tag,
        audioUrl: data.audioUrl || null,
      })
    );

    return NextResponse.json(beat, { status: 201 });
  } catch (error) {
    console.error('Error creating beat:', error);
    return NextResponse.json(
      { error: 'Failed to create beat' },
      { status: 500 }
    );
  }
}
