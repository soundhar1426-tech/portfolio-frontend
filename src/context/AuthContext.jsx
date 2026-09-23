import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyManagementPassword } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Clear any legacy stored token so password is always asked
  useEffect(() => {
    try {
      sessionStorage.removeItem('soundhar_auth_token');
      localStorage.removeItem('soundhar_auth_token');
    } catch (e) {
      // ignore
    }
  }, []);

  const verifyPassword = async (password) => {
    setIsVerifying(true);
    setAuthError('');
    try {
      const response = await verifyManagementPassword(password);
      if (response.success && response.token) {
        setIsPasswordModalOpen(false);
        if (pendingAction && typeof pendingAction === 'function') {
          const action = pendingAction;
          setPendingAction(null);
          await action(response.token);
        }
        return { success: true };
      } else {
        setAuthError(response.message || 'Invalid password');
        return { success: false, message: response.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Authentication failed';
      setAuthError(msg);
      return { success: false, message: msg };
    } finally {
      setIsVerifying(false);
    }
  };

  const requireAuth = (actionCallback) => {
    setPendingAction(() => actionCallback);
    setAuthError('');
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPendingAction(null);
    setAuthError('');
  };

  return (
    <AuthContext.Provider
      value={{
        isPasswordModalOpen,
        authError,
        isVerifying,
        verifyPassword,
        requireAuth,
        closePasswordModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
