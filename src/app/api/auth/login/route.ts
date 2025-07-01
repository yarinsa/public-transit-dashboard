import auth from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Encode email to base64
  const encodedEmail = Buffer.from(email).toString('base64');

  // Store the encoded email in a cookie or handle it as needed
  console.log(process.env.NEXT_PUBLIC_API_URL || request.url , request.headers.get('origin'), request.headers.get('referer'))
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_API_URL || request.url));
  response.cookies.set(auth.cookieName, encodedEmail, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
} 