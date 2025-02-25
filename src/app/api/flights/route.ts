import { NextResponse } from 'next/server';

const endpoint = 'https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5';
export async function GET() {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch flight data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.result.records);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 