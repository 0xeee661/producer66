import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/beats - Obtener todos los beats
export async function GET() {
  console.log("HERE GET!!")

  try {
    const { data: beats, error } = await supabase
      .from('beats')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

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
  console.log("HERE POST!!")

  try {
    const data = await request.json();

    // Validar datos
    if (!data.title || !data.bpm || !data.key || !data.price || !data.tag) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: beat, error } = await supabase
      .from('beats')
      .insert({
        title: data.title,
        bpm: parseInt(data.bpm),
        key: data.key,
        price: parseFloat(data.price),
        tag: data.tag,
        audioUrl: data.audioUrl || null
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(beat, { status: 201 });
  } catch (error) {
    console.error('Error creating beat:', error);
    return NextResponse.json(
      { error: 'Failed to create beat' },
      { status: 500 }
    );
  }
}
