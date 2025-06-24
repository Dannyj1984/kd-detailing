import { NextResponse } from 'next/server';
import { getAvailableSlots, getCalendarInstance } from '@/app/lib/google-calendar';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 });
  }

  try {
    console.log('📅 Fetching available slots for date:', date);
    const slots = await getAvailableSlots(new Date(date));
    console.log('✅ Successfully fetched slots:', slots.length, 'available slots');
    return NextResponse.json({ slots });
  } catch (error) {
    console.error('❌ Error fetching available slots:', error);
    if (error instanceof Error && error.message === 'Google Calendar credentials not configured') {
      console.log('🔑 No credentials found - redirecting to auth...');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch available slots' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, notes, startTime, endTime } = body;

    const event = {
      summary: `Car Detailing Appointment - ${service}`,
      description: `Client: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nNotes: ${notes}`,
      start: {
        dateTime: startTime,
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: endTime,
        timeZone: 'Europe/London',
      },
      attendees: [
        { email: email },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    };

    const calendar = getCalendarInstance();
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all',
    });

    return NextResponse.json({ event: response.data });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    if (error instanceof Error && error.message === 'Not authenticated') {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
