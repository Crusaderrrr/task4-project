import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ id: userId });
      const checkStatus = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/users', {
            headers: { 'user-id': userId },
          });
          if (response.status === 403) {
            setIsBlocked(true);
            localStorage.removeItem('userId');
            setUser(null);
          }
        } catch (err) {
          console.error('Error checking user status:', err);
        }
      };
      checkStatus();
      const interval = setInterval(checkStatus, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      isBlocked, 
      setIsBlocked,
      logout: () => {
        setUser(null);
        setIsBlocked(false);
        localStorage.removeItem('userId');
        window.location.href = '/login';
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}