import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for demonstration
    const data = {
        value: Math.floor(Math.random() * 70),
        change: Math.floor(Math.random() * 10),
        period: "yesterday",
      } as { value: number; change: number; period: string };


    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching bus frequency data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 