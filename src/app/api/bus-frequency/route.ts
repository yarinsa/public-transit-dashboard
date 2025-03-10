import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for demonstration
    const data = [
      {day: 'Mon', frequency: 100},
      {day: 'Tue', frequency: 150},
      {day: 'Wed', frequency: 120},
      {day: 'Thu', frequency: 130},
      {day: 'Fri', frequency: 160},
      {day: 'Sat', frequency: 90},
      {day: 'Sun', frequency: 60},
    ]


    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching bus frequency data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 