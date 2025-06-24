import { google } from 'googleapis';

// Create a single OAuth2 client instance
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials from environment variables
if (process.env.GOOGLE_ACCESS_TOKEN && process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
}

// Get calendar instance
export function getCalendarInstance() {
  console.log('🔍 Checking Google Calendar credentials...');
  
  if (!process.env.GOOGLE_ACCESS_TOKEN || !process.env.GOOGLE_REFRESH_TOKEN) {
    console.log('⚠️ Missing credentials - access_token or refresh_token not found in env');
    throw new Error('Google Calendar credentials not configured');
  }

  console.log('✅ Credentials found, creating calendar instance');
  return google.calendar({ version: 'v3', auth: oauth2Client });
}

// Check if a time slot is available
export async function isTimeSlotAvailable(startTime: Date, endTime: Date) {
  const calendar = getCalendarInstance();
  
  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startTime.toISOString(),
    timeMax: endTime.toISOString(),
    singleEvents: true,
  });

  return (response.data.items || []).length === 0;
}

// Create a new booking
export async function createBooking(booking: {
  startTime: Date;
  endTime: Date;
  customerName: string;
  customerEmail: string;
  service: string;
  notes?: string;
}) {
  const calendar = getCalendarInstance();

  const event = {
    summary: `${booking.service} - ${booking.customerName}`,
    description: `Service: ${booking.service}\nCustomer: ${booking.customerName}\nEmail: ${booking.customerEmail}\nNotes: ${booking.notes || 'None'}`,
    start: {
      dateTime: booking.startTime.toISOString(),
    },
    end: {
      dateTime: booking.endTime.toISOString(),
    },
    attendees: [
      { email: booking.customerEmail }
    ],
    sendUpdates: 'all', // Send email notifications
  };

  return calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
  });
}

// Get available slots for a given date
export async function getAvailableSlots(date: Date) {
  console.log('📆 Getting available slots for date:', date.toISOString());
  const calendar = getCalendarInstance();
  
  // Set business hours
  const startHour = 8; // 8 AM
  const endHour = 16; // 4 PM
  const slotDuration = 2; // 2 hours per slot
  
  // Get existing events for the day
  const dayStart = new Date(date);
  dayStart.setHours(startHour, 0, 0, 0);
  
  const dayEnd = new Date(date);
  dayEnd.setHours(endHour, 0, 0, 0);
  
  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const existingEvents = response.data.items || [];
  
  // Generate all possible slots
  const slots = [];
  for (let hour = startHour; hour < endHour; hour += slotDuration) {
    const slotStart = new Date(date);
    slotStart.setHours(hour, 0, 0, 0);
    
    const slotEnd = new Date(date);
    slotEnd.setHours(hour + slotDuration, 0, 0, 0);
    
    // Check if slot conflicts with any existing event
    const isAvailable = !existingEvents.some(event => {
      const eventStart = new Date(event.start?.dateTime || '');
      const eventEnd = new Date(event.end?.dateTime || '');
      return (
        (slotStart >= eventStart && slotStart < eventEnd) ||
        (slotEnd > eventStart && slotEnd <= eventEnd) ||
        (slotStart <= eventStart && slotEnd >= eventEnd)
      );
    });
    
    if (isAvailable) {
      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
      });
    }
  }
  
  return slots;
}
