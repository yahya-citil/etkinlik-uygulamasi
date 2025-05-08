import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import 'leaflet/dist/leaflet.css';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        const calendarEvents = res.data.map((event) => ({
          ...event,
          title: event.title,
          date: event.date,
        }));
        setEvents(calendarEvents);
      } catch (err) {
        console.error('Etkinlikler alınamadı:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Etkinlik Takvimi</h2>

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

      {selectedEvent && (
        <div style={{
          position: 'fixed',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          width: '400px',
          zIndex: 1000
        }}>
          <h3>{selectedEvent.title}</h3>
          <p><strong>Açıklama:</strong> {selectedEvent.description}</p>
          <p><strong>Tarih:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
          <p><strong>Konum:</strong> ({selectedEvent.latitude}, {selectedEvent.longitude})</p>

          <div style={{ height: '200px', marginTop: '10px' }}>
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
            style={{ marginTop: '10px' }}
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
