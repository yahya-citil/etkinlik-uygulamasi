import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
        setEvents(res.data);
      } catch (err) {
        console.error('Etkinlikler alınamadı:', err);
      }
    };

    fetchEvents();
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
            <p>📍 {event.latitude}, {event.longitude}</p>
            <p>📅 {new Date(event.date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
