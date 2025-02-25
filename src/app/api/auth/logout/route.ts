import auth from '@/lib/auth';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
const isLoggedIn = await auth.isLoggedIn();
  if (!isLoggedIn) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL('/', request.url), { status: 302 });
  response.cookies.delete(auth.cookieName);
  return response;
}