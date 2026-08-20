import { Routes, Route, Navigate } from 'react-router-dom';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { useState, useEffect } from 'react';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Layout from './layouts/Layout';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Home from './pages/Home';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Login from './pages/Login';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import ETFs from './pages/ETFs';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import PublicFunds from './pages/PublicFunds';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import PrivateFunds from './pages/PrivateFunds';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Research from './pages/Research';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Reports from './pages/Reports';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Resources from './pages/Resources';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Contact from './pages/Contact';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Company from './pages/Company';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Privacy from './pages/Privacy';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Terms from './pages/Terms';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Social from './pages/Social';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import Dashboard from './pages/Dashboard';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import AdminPanel from './pages/AdminPanel';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { API_BASE } from './api.js';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('grayscale_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Invalid token');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem('grayscale_token');
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('grayscale_token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('grayscale_token');
    setUser(null);
  };

  if (loading) return <div className="bg-[#090B0E] text-white h-screen flex items-center justify-center text-xl">Loading...</div>;

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="etfs" element={<ETFs />} />
        <Route path="public-funds" element={<PublicFunds />} />
        <Route path="private-funds" element={<PrivateFunds />} />
        <Route path="research" element={<Research />} />
        <Route path="reports" element={<Reports />} />
        <Route path="resources" element={<Resources />} />
        <Route path="contact" element={<Contact />} />
        <Route path="company" element={<Company />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="social" element={<Social />} />
      </Route>
      
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />

      {/* PROTECTED USER DASHBOARD */}
      <Route path="/dashboard" element={user ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />} />

      {/* ADMIN PANEL - PUBLICLY ACCESSIBLE (has its own auth overlay) */}
      <Route path="/admin" element={<AdminPanel onLogout={handleLogout} />} />
    </Routes>
  );
}
export default App;
