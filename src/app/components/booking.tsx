"use client";

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';

interface BookingSlot {
  start: Date;
  end: Date;
  title: string;
}

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    payment: '',
    notes: ''
  });

  // Business hours
  const businessHours = {
    daysOfWeek: [1,3,5], // 0 = Sunday, 1 = Monday, etc.
    startTime: '09:00',
    endTime: '17:00'
  };


  const handleDateClick = async (arg: { date: Date}) => {
    setSelectedDate(arg.date);
    try {
      const response = await fetch(`/api/calendar?date=${arg.date.toISOString()}`);
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'Not authenticated') {
          window.location.href = '/api/auth/google';
          return;
        }
        throw new Error(data.error);
      }
      
      if (data.slots) {
        // API returned available slots directly
        const slots = data.slots.map((slot: { start: string; end: string }) => ({
          start: new Date(slot.start),
          end: new Date(slot.end),
          title: 'Available'
        }));
        setAvailableSlots(slots);
      } else {
        // Fallback to generating slots
        const slots = generateAvailableSlots(arg.date, []);
        setAvailableSlots(slots);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      // Fallback to generating all slots if API fails
      const slots = generateAvailableSlots(arg.date, []);
      setAvailableSlots(slots);
    }
  };

  const generateAvailableSlots = (date: Date, busyTimes: { start: Date; end: Date }[]) => {
    const slots: BookingSlot[] = [];
    const startHour = 8;
    const endHour = 16;
    
    for (let hour = startHour; hour < endHour; hour += 2) {
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      
      const slotEnd = new Date(date);
      slotEnd.setHours(hour + 2, 0, 0, 0);
      
      // Check if slot overlaps with any busy times
      const isAvailable = !busyTimes.some(busy => 
        (slotStart >= busy.start && slotStart < busy.end) || 
        (slotEnd > busy.start && slotEnd <= busy.end) ||
        (slotStart <= busy.start && slotEnd >= busy.end)
      );
      
      if (isAvailable) {
        slots.push({
          start: slotStart,
          end: slotEnd,
          title: 'Available'
        });
      }
    }
    
    return slots;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) return;
    
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingForm,
          startTime: selectedDate.toISOString(),
          endTime: new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'Not authenticated') {
          window.location.href = '/api/auth/google';
          return;
        }
        throw new Error(data.error);
      }
      
      // Clear form and show success message
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        service: '',
        payment: '',
        notes: ''
      });
      setSelectedDate(null);
      alert('Booking confirmed! You will receive an email confirmation shortly.');
      
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Book an Appointment</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={handleDateClick}
              businessHours={businessHours}
              selectable={true}
              selectConstraint="businessHours"
              height="auto"
            />
          </div>

          {selectedDate && (
            <div className="booking-form bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Book for {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              
              <div className="available-slots mb-6">
                <h4 className="font-medium mb-2">Available Slots:</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot, index) => (
                    <span
                      key={index}
                      className="p-2 text-sm bg-white border cursor-pointer rounded !hover:bg-gray-50"
                      onClick={() => setSelectedDate(slot.start)}
                    >
                      {format(slot.start, 'h:mm a')} - {format(slot.end, 'h:mm a')}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <h3 className="font-medium my-2">Selected time:</h3>
                  <span>
                    {format(selectedDate, 'h:mm a')} - {format(new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000), 'h:mm a')}
                  </span>
                </div>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full p-2 border rounded"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full p-2 border rounded"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Service</label>
                  <select
                    required
                    className="w-full p-2 border rounded"
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                  >
                    <option value="">Select a service</option>
                    <option value="exterior">Exterior Detailing</option>
                    <option value="interior">Interior Detailing</option>
                    <option value="paint">Paint Correction</option>
                    <option value="ceramic">Ceramic Coating</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Payment method</label>
                  <select
                    required
                    className="w-full p-2 border rounded"
                    value={bookingForm.payment}
                    onChange={(e) => setBookingForm({...bookingForm, payment: e.target.value})}
                  >
                    <option value="">Select a payment method</option>
                    <option value="card">Card</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Additional Notes</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}