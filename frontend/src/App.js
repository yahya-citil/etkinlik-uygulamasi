import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import MapPage from './pages/MapPage';
import CalendarPage from './pages/CalendarPage';
import CreateEvent from './pages/CreateEvent';
import Home from './pages/Home';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // ✅ navbar eklendi

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar /> {/* ✅ her sayfanın üstünde navbar görünecek */}

        <Routes>
          {/* Varsayılan yönlendirme */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Açık sayfalar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Korumalı alanlar */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
