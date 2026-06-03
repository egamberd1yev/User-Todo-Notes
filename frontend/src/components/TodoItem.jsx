import React, { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete, isAdmin = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  const handleSave = () => {
    onUpdate(todo.id, { title: text });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="flex items-center gap-3 flex-1 mr-4">
        {!isAdmin && (
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => onUpdate(todo.id, { completed: e.target.checked })}
            className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
          />
        )}

        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-1 rounded w-full focus:outline-indigo-500"
          />
        ) : (
          <span className={`text-slate-700 ${todo.completed ? 'line-through text-slate-400' : ''}`}>
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        {!isAdmin && (
          isEditing ? (
            <button onClick={handleSave} className="text-green-600 hover:text-green-700 font-medium text-sm">Saqlash</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">Tahrirlash</button>
          )
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-600 font-medium text-sm ml-2"
        >
          O'chirish
        </button>
      </div>
    </div>
  );
}