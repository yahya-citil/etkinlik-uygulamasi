import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
        setEvents(res.data);
      } catch (err) {
        console.error('Etkinlik verileri alınamadı:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="h-screen p-4">
      <h2 className="text-xl font-bold mb-2">Etkinlik Haritası</h2>
      <MapContainer center={[39.8, 32.8]} zoom={7} style={{ height: '80%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {events
          .filter(e => e.latitude && e.longitude)
          .map(event => (
            <Marker key={event.id} position={[event.latitude, event.longitude]}>
              <Popup>
                <strong>{event.title}</strong><br />
                {event.description}<br />
                {new Date(event.date).toLocaleString()}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
