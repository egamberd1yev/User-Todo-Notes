import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TodoItem from '../components/TodoItem';

export default function UserDashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    desc: '',
    isCompleted: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await api.getTodos();
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        setTodos([]);
      }
    } catch (err) {
      console.error("Vazifalarni yuklashda xatolik:", err);
      setTodos([]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const created = await api.createTodo({
        title: newTodo.title,
        desc: newTodo.desc,
        isCompleted: newTodo.isCompleted
      });
      setTodos([created, ...todos]);
      setNewTodo({ title: '', desc: '', isCompleted: 0 }); // Formani tozalash
    } catch (err) {
      console.error(err);
      setError("Vazifa qo'shishda xatolik");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Vazifani o'chirishda xatolik");
    }
  };

  const handleUpdate = async (id, updates) => {
  try {
    const updated = await api.updateTodo(id, updates);
    setTodos(todos.map(t => t.id === id ? updated : t));
  } catch (err) {
    console.error(err);
    setError("Vazifani yangilashda xatolik");
  }
};

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Mening Vazifalarim</h2>

      {/* === FORMA === */}
      <form onSubmit={handleCreate} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 space-y-3">
        <h3 className="text-lg font-semibold text-slate-700">Yangi vazifa</h3>

        {/* Title */}
        <input
          type="text"
          placeholder="Sarlavha (title) *"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
        />

        {/* Desc */}
        <textarea
          placeholder="Tavsif (desc)"
          value={newTodo.desc}
          onChange={(e) => setNewTodo({ ...newTodo, desc: e.target.value })}
          rows={2}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm resize-none"
        />

        {/* isCompleted */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={newTodo.isCompleted === 1}
            onChange={(e) => setNewTodo({ ...newTodo, isCompleted: e.target.checked ? 1 : 0 })}
            className="w-4 h-4 accent-indigo-600"
          />
          <span className="text-slate-600 text-sm">Bajarilgan deb belgilash</span>
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Qo'shish
        </button>
      </form>

      {/* === TODO LIST === */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-slate-400 italic text-center py-4">Vazifalar topilmadi.</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}