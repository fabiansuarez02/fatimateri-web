import React, { createContext, useContext, useState, useEffect } from 'react';
import { directus, directusUrl } from '../lib/directus';

const AuthContext = createContext(null);

async function loginDirectus(email, password) {
  const res = await fetch(`${directusUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.errors?.[0]?.message || 'Error al iniciar sesión';
    throw new Error(msg);
  }
  return data.data;
}

async function getMeDirectus(token) {
  const res = await fetch(
    `${directusUrl}/users/me?fields=id,email,first_name,last_name,role,status`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  if (!res.ok) throw new Error('No se pudo obtener el usuario');
  return data.data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      directus.setToken(token);
      getMeDirectus(token)
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('auth_token');
          directus.setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { access_token } = await loginDirectus(email, password);
    localStorage.setItem('auth_token', access_token);
    directus.setToken(access_token);
    const me = await getMeDirectus(access_token);
    setUser(me);
    return me;
  };

  const logout = async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        await fetch(`${directusUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        // ignorar errores de red al hacer logout
      }
    }
    localStorage.removeItem('auth_token');
    directus.setToken(null);
    setUser(null);
  };

  const register = async (email, password, firstName) => {
    const res = await fetch(`${directusUrl}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, first_name: firstName }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = data?.errors?.[0]?.message || 'Error al crear la cuenta';
      throw new Error(msg);
    }
    return login(email, password);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
