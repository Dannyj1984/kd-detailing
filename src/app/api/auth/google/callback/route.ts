import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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
    console.log('🔄 AUTH CALLBACK STARTED - Getting tokens with code:', code);
    const { tokens } = await oauth2Client.getToken(code);
    
    // Log tokens in a clear format for copying to .env.local
    console.log('\n🎯🎯🎯 GOOGLE CALENDAR TOKENS 🎯🎯🎯');
    console.log('----------------------------------------');
    console.log('❗ ADD THESE TO YOUR .env.local FILE ❗\n');
    console.log(`GOOGLE_ACCESS_TOKEN=${tokens.access_token}`);
    if (tokens.refresh_token) {
      console.log(`\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    } else {
      console.log('\n⚠️ WARNING: No refresh token received!');
      console.log('You need to revoke access at https://myaccount.google.com/permissions and try again.');
    }
    console.log('\n----------------------------------------');
    console.log('🎯🎯🎯 END OF TOKENS 🎯🎯🎯\n');
    
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
