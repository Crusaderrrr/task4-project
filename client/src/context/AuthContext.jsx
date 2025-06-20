import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ id: userId });
      const checkStatus = async () => {
        try {
          const response = await fetch('https://task4-project.onrender.com/api/users', {
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
    } else {
      setIsLoading(false);
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
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}