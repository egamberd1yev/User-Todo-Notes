import React, { useState } from 'react';
import { api } from '../services/api';

export default function Login({ onLoginSuccess, switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const data = await api.login({ email, password });

    const token = data.accessToken;  // ← ikki "s"
    const user = data.user;

    if (!token) {
      throw new Error("Backenddan token kelmadi!");
    }

    localStorage.setItem('token', token);  // ← shu qo'shilishi shart!
    onLoginSuccess(user, token);
  } catch (err) {
    setError(err.message || 'Xatolik yuz berdi');
  }
};
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-6">Xush Kelibsiz!</h2>
        
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
            Tizimga Kirish
          </button>
        </form>
      </div>
    </div>
  );
}