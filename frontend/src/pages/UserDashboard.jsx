import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TodoItem from '../components/TodoItem';

export default function UserDashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', desc: '', isCompleted: 0 });
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
      setNewTodo({ title: '', desc: '', isCompleted: 0 });
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

  const completed = todos.filter(t => t.isCompleted === 1).length;
  const pending = todos.filter(t => t.isCompleted !== 1).length;

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 bg-indigo-900 border border-indigo-700 text-indigo-400 text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            ✅ User Panel
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Mening{' '}
            <span className="text-indigo-400">Vazifalarim</span>
          </h1>
          <p className="text-gray-500 text-sm font-mono mt-1">// o'z vazifalarini boshqarish</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center text-xl">📋</div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Jami</p>
              <p className="text-white text-2xl font-black">{todos.length}</p>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-xl">✅</div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Bajarildi</p>
              <p className="text-white text-2xl font-black">{completed}</p>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-900 flex items-center justify-center text-xl">⏳</div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Kutmoqda</p>
              <p className="text-white text-2xl font-black">{pending}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-6 space-y-3">
          <h3 className="text-gray-200 font-bold text-base">➕ Yangi vazifa qo'shish</h3>

          <input
            type="text"
            placeholder="Sarlavha (title) *"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            required
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors text-sm"
          />

          <textarea
            placeholder="Tavsif (desc)"
            value={newTodo.desc}
            onChange={(e) => setNewTodo({ ...newTodo, desc: e.target.value })}
            rows={2}
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
          />

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={newTodo.isCompleted === 1}
              onChange={(e) => setNewTodo({ ...newTodo, isCompleted: e.target.checked ? 1 : 0 })}
              className="w-4 h-4 accent-indigo-500"
            />
            <span className="text-gray-400 text-sm">Bajarilgan deb belgilash</span>
          </label>

          {error && <p className="text-red-400 text-sm font-mono">⚠ {error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors text-sm"
          >
            Qo'shish
          </button>
        </form>

        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300 font-bold">Vazifalar ro'yxati</span>
          <span className="bg-indigo-900 text-indigo-400 font-mono text-xs px-3 py-1 rounded-full border border-indigo-700">
            {todos.length} ta
          </span>
        </div>

        {/* Todo list */}
        <div className="flex flex-col gap-3">
          {todos.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-mono text-sm">Vazifalar topilmadi</p>
            </div>
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
    </div>
  );
}