import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import ETFs from './pages/ETFs';
import PublicFunds from './pages/PublicFunds';
import PrivateFunds from './pages/PrivateFunds';
import Research from './pages/Research';
import Reports from './pages/Reports';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Company from './pages/Company';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Social from './pages/Social';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { API_BASE } from './api.js';

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
