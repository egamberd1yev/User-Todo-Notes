import React from 'react';

export default function UserCard({ user, onSelect, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
      {/* Foydalanuvchi blokiga bosilganda butun 'user' obyektini uzatamiz */}
      <div className="cursor-pointer flex-1" onClick={() => onSelect(user)}>
        <h4 className="font-semibold text-slate-800 hover:text-indigo-600 transition">{user.name}</h4>
        <p className="text-sm text-slate-500">{user.email}</p>
      </div>
      
      {/* O'chirish tugmasi bosilganda aynan user.id ni uzatamiz */}
      <button
        onClick={() => onDelete(user.id)} 
        className="bg-rose-50 text-rose-600 hover:bg-rose-100 p-2 rounded-lg text-xs font-semibold transition"
      >
        O'chirish
      </button>
    </div>
  );
}