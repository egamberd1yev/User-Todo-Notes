import React, { useState } from 'react';
import { api } from '../services/api';

export default function AuthPage({ onLoginSuccess, onRegisterSuccess }) {
  const [tab, setTab] = useState('login');

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-3xl">⚡</span>
            <h1 className="text-3xl font-black text-white tracking-tight">TodoPortal</h1>
          </div>
          <p className="text-gray-500 text-sm font-mono">// vazifalarni boshqarish tizimi</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">

          {/* Tabs */}
          <div className="flex bg-gray-900 rounded-xl p-1 mb-6">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                tab === 'login'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                tab === 'register'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* Forms */}
          {tab === 'login' ? (
            <LoginForm onLoginSuccess={onLoginSuccess} switchToRegister={() => setTab('register')} />
          ) : (
            <RegisterForm onRegisterSuccess={onRegisterSuccess} switchToLogin={() => setTab('login')} />
          )}

        </div>
      </div>
    </div>
  );
}

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login({ email, password });
      const token = data.accessToken;
      const user = data.user;
      if (!token) throw new Error("Backenddan token kelmadi!");
      localStorage.setItem('token', token);
      onLoginSuccess(user, token);
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-400 text-sm rounded-xl px-4 py-3 text-center font-mono">
          ⚠ {error}
        </div>
      )}
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Parol</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors text-sm"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-semibold transition-colors text-sm mt-2"
      >
        {loading ? 'Kirish...' : 'Tizimga Kirish'}
      </button>
    </div>
  );
}

function RegisterForm({ onRegisterSuccess, switchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.register({ name, email, password, role });
      const token = data.accessToken || data.accesToken;
      const user = data.user;
      localStorage.setItem('token', token);
      onRegisterSuccess(user, token);
    } catch (err) {
      setError(err.message || "Ro'yxatdan o'tishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-400 text-sm rounded-xl px-4 py-3 text-center font-mono">
          ⚠ {error}
        </div>
      )}
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Ism</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ismingiz"
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Parol</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors text-sm"
        >
          <option value="user">User (Foydalanuvchi)</option>
          <option value="admin">Admin (Boshqaruvchi)</option>
        </select>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-semibold transition-colors text-sm mt-2"
      >
        {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
      </button>
    </div>
  );
}
