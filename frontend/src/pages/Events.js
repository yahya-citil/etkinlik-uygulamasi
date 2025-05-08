import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        const enrichedEvents = await Promise.all(
          res.data.map(async (event) => {
            const address = await getAddressFromCoords(event.latitude, event.longitude);
            return { ...event, address };
          })
        );
        setEvents(enrichedEvents);
      } catch (err) {
        console.error('Etkinlikler alınamadı:', err);
      }
    };

    fetchEvents();
  }, []);

  const getAddressFromCoords = async (lat, lon) => {
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon,
          format: 'json'
        },
        headers: {
          'Accept-Language': 'tr', // Türkçe adres çıktısı
          'User-Agent': 'etkinlik-uygulamasi/1.0' // Nominatim şartı
        }
      });
      return res.data.display_name;
    } catch (error) {
      return `${lat.toFixed(4)}, ${lon.toFixed(4)}`; // Adres bulunamazsa koordinat göster
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Tüm Etkinlikler</h2>
      {events.map((event, i) => (
        <div key={i} className="border p-4 rounded shadow space-y-2">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p>{event.description}</p>
          <p>📍 {event.address}</p>
          <p>📅 {new Date(event.date).toLocaleString('tr-TR')}</p>
        </div>
      ))}
    </div>
  );
};

export default Events;
