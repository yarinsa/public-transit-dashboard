import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for demonstration
    const data = {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      frequencies: [100, 150, 120, 130, 160, 90, 60],
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching bus frequency data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 