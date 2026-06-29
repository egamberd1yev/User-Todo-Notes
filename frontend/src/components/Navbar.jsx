import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider">⚡ TodoPortal</h1>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm bg-slate-700 px-3 py-1 rounded-full border border-slate-600">
              {user.name} ({user.role})
            </span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-sm font-medium transition"
            >
              Chiqish
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}