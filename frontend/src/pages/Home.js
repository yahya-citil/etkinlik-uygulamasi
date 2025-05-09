import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { path: '/events', label: '📋 Etkinlikler' },
    { path: '/create', label: '➕ Etkinlik Oluştur' },
    { path: '/calendar', label: '📆 Takvim' },
    { path: '/map', label: '🗺️ Harita' }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">🎉 Hoş Geldin!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200 text-center"
          >
            <span className="text-xl font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Home;
