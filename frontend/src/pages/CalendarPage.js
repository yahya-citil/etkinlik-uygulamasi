import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const baseURL = process.env.REACT_APP_API_URL;

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/events`);
        const calendarEvents = res.data.map((event) => ({
          ...event,
          title: event.title,
          date: event.date
        }));
        setEvents(calendarEvents);
      } catch (err) {
        console.error('Etkinlikler alınamadı:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Etkinlik Takvimi</h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        eventClick={(info) => {
          setSelectedEvent(info.event.extendedProps);
        }}
      />

      {selectedEvent && selectedEvent.latitude && selectedEvent.longitude && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-md p-4 w-96 z-50">
          <h3 className="text-lg font-bold mb-2">{selectedEvent.title}</h3>
          <p><strong>Açıklama:</strong> {selectedEvent.description}</p>
          <p><strong>Tarih:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
          <p><strong>Konum:</strong> ({selectedEvent.latitude}, {selectedEvent.longitude})</p>

          <div className="h-48 mt-3">
            <MapContainer
              center={[selectedEvent.latitude, selectedEvent.longitude]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[selectedEvent.latitude, selectedEvent.longitude]}>
                <Popup>{selectedEvent.title}</Popup>
              </Marker>
            </MapContainer>
          </div>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setSelectedEvent(null)}
          >
            Kapat
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
