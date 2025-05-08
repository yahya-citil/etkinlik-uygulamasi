import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import MapPage from './pages/MapPage';
import CalendarPage from './pages/CalendarPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
