const BASE_URL = 'http://localhost:5000'; 

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {

    headers['Authorization'] = `Bearer ${token}`;
    headers['token'] = token;
  }

  return headers;
};

export const api = {
  login: async (credentials) => {
    const res = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error('Login muvaffaqiyatsiz');
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  getTodos: async () => {
    const res = await fetch(`${BASE_URL}/todos`, { headers: getHeaders() });
    return res.json();
  },

  // 📑 QAYTA TIKLANDI: createTodo funksiyasi shu yerda bo'lishi shart!
  createTodo: async (todo) => {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(todo)
    });
    return res.json();
  },

  deleteTodo: async (id) => {
    await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE', headers: getHeaders() });
  },

  findUsers: async () => {
    const res = await fetch(`${BASE_URL}/admin/users`, { headers: getHeaders() });
    return res.json();
  },

  updateTodo: async (id, updates) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Yangilashda xatolik");
  return res.json();
},

  deleteUser: async (userId) => {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });

    if (!res.ok) {
      const errorData = await res.text(); // json() emas, text() — chunki 204 bo'lishi mumkin
      throw new Error(errorData || "O'chirishda xatolik");
    }

    return true;
  }
}