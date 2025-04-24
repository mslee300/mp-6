import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // 1) Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }),
  });
  const tokenJson = await tokenRes.json();

  if (!tokenJson.access_token) {
    return NextResponse.json({ error: 'Token exchange failed', details: tokenJson }, { status: 500 });
  }

  // 2) Fetch user info
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokenJson.access_token}` },
  });
  const profile = await userRes.json();

  // 3) Return the JSON to the client page
  return NextResponse.json(profile);
}