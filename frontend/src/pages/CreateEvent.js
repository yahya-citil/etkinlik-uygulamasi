import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Marker ikon sorunu çözümü:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LocationSelector = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
};

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    latitude: 39.92,
    longitude: 32.85,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setLocation = (latlng) => {
    setFormData({ ...formData, latitude: latlng.lat, longitude: latlng.lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/events', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/events');
    } catch (err) {
      alert('Etkinlik oluşturulamadı');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Etkinlik Oluştur</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Etkinlik Adı"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Açıklama"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="h-64">
          <MapContainer
            center={[formData.latitude, formData.longitude]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
            <LocationSelector setLocation={setLocation} />
            <Marker position={[formData.latitude, formData.longitude]} />
          </MapContainer>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            name="latitude"
            value={formData.latitude}
            readOnly
            className="border p-2 rounded bg-gray-100"
          />
          <input
            name="longitude"
            value={formData.longitude}
            readOnly
            className="border p-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Oluştur
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
