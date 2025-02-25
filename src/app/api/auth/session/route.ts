import { cookies } from 'next/headers';

import auth from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Hello, world!' });
    const cookieStore = await cookies();
    const user_email = cookieStore.get(auth.cookieName);
    return NextResponse.json({ user_email });
}   