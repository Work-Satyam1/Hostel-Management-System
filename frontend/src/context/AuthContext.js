import React, { createContext, useState, useEffect, useContext } from 'react';
import storage from '../utils/storage';
import authApi from '../api/authApi';
import { setUnauthorizedHandler } from '../api/client';

export const AuthContext = createContext({
  user: null,
  token: null,
  role: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await storage.removeItem('jwt_token');
    } catch (err) {
      console.warn('Error clearing token:', err);
    }
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const data = await authApi.getMe();
      if (data && data.user) {
        setUser(data.user);
        return data.user;
      }
    } catch (error) {
      console.warn('Failed to refresh user profile:', error.message);
    }
    return null;
  };

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    if (data && data.token) {
      await storage.setItem('jwt_token', data.token);
      setToken(data.token);

      // Fetch confirmed profile from /api/auth/me
      try {
        const meData = await authApi.getMe();
        if (meData && meData.user) {
          setUser(meData.user);
          return meData.user;
        }
      } catch (err) {
        // Fallback to login response user if me fails
        if (data.user) {
          setUser(data.user);
          return data.user;
        }
      }
    }
    throw new Error(data?.message || 'Login failed');
  };

  // Restore session on app launch
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = await storage.getItem('jwt_token');
        if (savedToken) {
          setToken(savedToken);
          const meData = await authApi.getMe();
          if (meData && meData.user) {
            setUser(meData.user);
          } else {
            await logout();
          }
        }
      } catch (error) {
        console.warn('Session restoration failed:', error.message);
        await logout();
      } finally {
        setLoading(false);
      }
    };

    // Register 401 callback
    setUnauthorizedHandler(() => {
      logout();
    });

    restoreSession();
  }, []);

  const role = user?.role ? user.role.toLowerCase() : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
