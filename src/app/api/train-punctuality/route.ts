import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for demonstration
    const data = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      punctualityRates: [90, 85, 88, 92, 89, 94, 87],
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching train punctuality data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 