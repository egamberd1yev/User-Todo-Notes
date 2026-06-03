import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' yoki 'register'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sahifa yangilanganda sessiyani saqlab qolish
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

const handleLoginSuccess = (userData, token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  setUser(userData);
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAuthScreen('login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Yuklanmoqda...</div>;

  // Agar foydalanuvchi tizimga kirmagan bo'lsa
  if (!user) {
    return authScreen === 'login' ? (
      <Login
        onLoginSuccess={handleLoginSuccess}
        switchToRegister={() => setAuthScreen('register')}
      />
    ) : (
      <Register
        onRegisterSuccess={handleLoginSuccess}
        switchToLogin={() => setAuthScreen('login')}
      />
    );
  }

  // Tizimga kirgandan keyingi holat (Admin yoki User)
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar user={user} onLogout={handleLogout} />
      
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}