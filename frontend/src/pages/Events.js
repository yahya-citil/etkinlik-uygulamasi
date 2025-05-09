import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          format: 'json',
          lat,
          lon: lng
        }
      });
      return res.data.display_name;
    } catch (err) {
      console.error('Adres alınamadı:', err);
      return `${lat}, ${lng}`;
    }
  };

  useEffect(() => {
    const enrichEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
        const enriched = await Promise.all(res.data.map(async (e) => {
          const address = await getAddressFromCoords(e.latitude, e.longitude);
          return { ...e, address };
        }));
        setEvents(enriched);
      } catch (err) {
        console.error('Etkinlik verileri alınamadı:', err);
      }
    };

    enrichEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tüm Etkinlikler</h2>
      {events.length === 0 ? (
        <p>Etkinlik bulunamadı.</p>
      ) : (
        events.map(event => (
          <div key={event.id} className="mb-4 p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">📍 {event.address}</p>
            <p>📅 {new Date(event.date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
