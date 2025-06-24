import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    console.log('No code provided in callback');
    return NextResponse.redirect('/book?error=missing_code');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Create response with cookies
    const response = new Response(null, {
      status: 302,
      headers: {
        'Location': '/book?success=true',
      }
    });

    // Set cookies
    if (tokens.access_token) {
      response.headers.append('Set-Cookie', 
        `google_access_token=${tokens.access_token}; ` +
        `Path=/; ` +
        `HttpOnly; ` +
        `SameSite=Lax; ` +
        `Max-Age=3600`
      );
    }

    if (tokens.refresh_token) {
      response.headers.append('Set-Cookie', 
        `google_refresh_token=${tokens.refresh_token}; ` +
        `Path=/; ` +
        `HttpOnly; ` +
        `SameSite=Lax`
      );
    }

    return response;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return NextResponse.redirect('/book?error=auth_failed');
  }
}
