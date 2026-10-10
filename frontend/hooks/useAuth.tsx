"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { DEMO_USERS } from '../lib/mockData';

interface AuthContextType {
  user: User | null;
  role: Role;
  loginAs: (role: Role) => void;
  setUserDirectly: (user: User | null) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: DEMO_USERS[0],
  role: 'CLIENT',
  loginAs: () => {},
  setUserDirectly: () => {},
  logout: async () => {},
  isAuthenticated: true,
  loading: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkServerSession = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // server check failure
      }
      setCurrentUser(null);
      setLoading(false);
    };

    checkServerSession();
  }, []);

  const loginAs = (role: Role) => {
    const found = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    setCurrentUser(found);
    if (typeof window !== 'undefined') {
      localStorage.setItem('creatorhub_user', JSON.stringify(found));
    }
  };

  const setUserDirectly = (user: User | null) => {
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('creatorhub_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('creatorhub_user');
      }
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('creatorhub_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        role: currentUser?.role || 'CLIENT',
        loginAs,
        setUserDirectly,
        logout,
        isAuthenticated: !!currentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
