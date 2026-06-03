import React, { useState } from 'react';
import { api } from '../services/api';

export default function Register({ onRegisterSuccess, switchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default holatda oddiy user
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.register({ name, email, password, role });
      onRegisterSuccess(data.user, data.token);
    } catch (err) {
      setError(err.message || 'Ro‘yxatdan o‘tishda xatolik');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-6">Ro'yxatdan o'tish</h2>
        {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Ism</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            >
              <option value="user">User (Foydalanuvchi)</option>
              <option value="admin">Admin (Boshqaruvchi)</option>
            </select>
          </div>
          <button className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
            Ro'yxatdan o'tish
          </button>
        </form>
        <p className="text-sm text-center text-slate-500 mt-4">
          Akkountingiz bormi?{' '}
          <button onClick={switchToLogin} className="text-indigo-600 font-semibold hover:underline">
            Kirish
          </button>
        </p>
      </div>
    </div>
  );
}