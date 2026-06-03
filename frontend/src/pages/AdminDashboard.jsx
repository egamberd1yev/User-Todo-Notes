import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Avatar = ({ name }) => {
  const gradients = [
    'from-rose-500 to-orange-400',
    'from-violet-500 to-purple-400',
    'from-cyan-500 to-teal-400',
    'from-pink-500 to-rose-400',
    'from-indigo-500 to-blue-400',
    'from-amber-500 to-yellow-400',
  ];
  const index = name ? name.charCodeAt(0) % gradients.length : 0;
  const letter = name ? name[0].toUpperCase() : '?';
  return (
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg`}>
      {letter}
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200`}>
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-xs uppercase tracking-widest font-mono">{label}</p>
      <p className="text-white text-3xl font-black leading-tight">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const usersData = await api.findUsers();
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!userId) return;
    if (!window.confirm("Haqiqatan ham bu foydalanuvchini o'chirmoqchimisiz?")) return;
    setDeletingId(userId);
    try {
      await api.deleteUser(userId);
      setUsers(prev => prev.filter(u => (u.id ?? u._id) != userId));
    } catch (err) {
      setError("O'chirishda xatolik: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const admins = users.filter(u => u.role === 'admin').length;
  const regularUsers = users.filter(u => u.role !== 'admin').length;

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            ⚡ Admin Panel
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Foydalanuvchilar{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Boshqaruvi
            </span>
          </h1>
          <p className="text-gray-500 text-sm font-mono mt-1">// barcha userlarni ko'rish va boshqarish</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Jami" value={users.length} icon="👥" color="bg-indigo-500/20" />
          <StatCard label="Adminlar" value={admins} icon="🛡️" color="bg-amber-500/20" />
          <StatCard label="Userlar" value={regularUsers} icon="🙋" color="bg-emerald-500/20" />
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 mb-6 focus-within:border-indigo-500/50 transition-colors">
          <span className="text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Ism yoki email bo'yicha qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white text-sm placeholder-gray-600 w-full"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-500 hover:text-white text-lg transition-colors">×</button>
          )}
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300 font-bold text-base">Foydalanuvchilar ro'yxati</span>
          <span className="bg-indigo-500/20 text-indigo-400 font-mono text-xs px-3 py-1 rounded-full border border-indigo-500/30">
            {filtered.length} ta
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl px-4 py-3 text-sm font-mono mb-4">
            ⚠ {error}
          </div>
        )}

        {/* User list */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <div className="text-4xl mb-3">🌑</div>
              <p className="font-mono text-sm">Hech narsa topilmadi</p>
            </div>
          ) : (
            filtered.map((u, i) => (
              <div
                key={u.id ?? u._id}
                className="flex items-center gap-4 bg-gray-800 border border-gray-700 hover:border-indigo-500/30 hover:bg-gray-800/80 rounded-2xl px-5 py-4 transition-all duration-200 hover:translate-x-1"
              >
                <Avatar name={u.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-100 font-bold text-sm truncate">{u.name || 'Nomsiz'}</p>
                  <p className="text-gray-500 font-mono text-xs truncate mt-0.5">{u.email}</p>
                </div>
                <span className={`font-mono text-xs px-3 py-1 rounded-full border shrink-0 ${
                  u.role === 'admin'
                    ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    : 'bg-emerald-500/12 text-emerald-400 border-emerald-500/25'
                }`}>
                  {u.role || 'user'}
                </span>
                <button
                  onClick={() => handleDeleteUser(u.id ?? u._id)}
                  disabled={deletingId === (u.id ?? u._id)}
                  className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {deletingId === (u.id ?? u._id) ? (
                    <span className="animate-spin inline-block">⟳</span>
                  ) : '🗑'}
                  O'chirish
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}