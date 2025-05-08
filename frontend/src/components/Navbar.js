import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">Etkinlik Uygulaması</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Giriş</Link>
          <Link to="/register" className="hover:underline">Kayıt</Link>
          <Link to="/events" className="hover:underline">Etkinlikler</Link>
          <Link to="/create" className="hover:underline">Oluştur</Link>
          <Link to="/calendar" className="hover:underline">Takvim</Link>
          <Link to="/map" className="hover:underline">Harita</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
