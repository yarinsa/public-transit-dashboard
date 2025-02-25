import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for demonstration
    const data = {
      onTimeRate: {
        value: 92.4,
        change: 2.1,
        period: 'last week',
      },
      dailyRiders: {
        value: 145832,
        change: -1.3,
        period: 'yesterday',
      },
      activeBuses: {
        value: 126,
        total: 130,
      },
      averageSpeed: {
        value: 28,
        change: 1.5,
        period: 'last month',
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching transport metrics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 