import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">🎉 Etkinlik Uygulaması</h1>
        <div className="space-x-4">
          {!token ? (
            <>
              <Link to="/login" className="hover:underline">Giriş</Link>
              <Link to="/register" className="hover:underline">Kayıt</Link>
            </>
          ) : (
            <>
              <Link to="/home" className="hover:underline">Ana Sayfa</Link>
              <Link to="/events" className="hover:underline">Etkinlikler</Link>
              <Link to="/create" className="hover:underline">Oluştur</Link>
              <Link to="/calendar" className="hover:underline">Takvim</Link>
              <Link to="/map" className="hover:underline">Harita</Link>
              <button onClick={handleLogout} className="hover:underline text-red-200">Çıkış</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
