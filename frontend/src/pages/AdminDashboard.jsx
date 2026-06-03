import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import UserCard from '../components/UserCard';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const usersData = await api.findUsers();
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Foydalanuvchilarni yuklashda xatolik:", err);
      setUsers([]);
    }
  };

 const handleDeleteUser = async (userId) => {
  if (!userId) return;
  if (!window.confirm("Haqiqatan ham bu foydalanuvchini o'chirmoqchimisiz?")) return;

  try {
    await api.deleteUser(userId);

    // u.id o'rniga u._id ham tekshiriladi (MongoDB uchun)
    // == ishlatamiz chunki "5" == 5 true beradi
    setUsers(prev => prev.filter(u => (u.id ?? u._id) != userId));
    
    alert("Foydalanuvchi muvaffaqiyatli o'chirildi");
  } catch (err) {
    console.error("O'chirishda xatolik:", err);
    setError("Foydalanuvchini o'chirishda xatolik: " + err.message);
  }
};

  return (
    <div className="container mx-auto mt-10 px-4 max-w-2xl">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 mb-4">
          Foydalanuvchilar Boshqaruvi ({users.length})
        </h3>
        
        {error && <p className="text-red-500 bg-red-50 p-3 rounded-xl mb-4">{error}</p>}

        <div className="space-y-3">
          {users.length === 0 ? (
            <p className="text-slate-400 italic text-center py-4">Foydalanuvchilar topilmadi.</p>
          ) : (
            users.map(u => (
              <UserCard
                key={u.id}
                user={u}
                onSelect={() => {}} // Bosilganda hech narsa qilmaydi
                onDelete={handleDeleteUser}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}