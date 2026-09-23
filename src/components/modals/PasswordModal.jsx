import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, X, Eye, EyeOff, Loader2 } from 'lucide-react';

export const PasswordModal = () => {
  const { isPasswordModalOpen, closePasswordModal, verifyPassword, authError, isVerifying } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isPasswordModalOpen) {
      setPassword('');
      setShowPassword(false);
    }
  }, [isPasswordModalOpen]);

  if (!isPasswordModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    const result = await verifyPassword(password.trim());
    if (result.success) {
      setPassword('');
    }
  };

  return (
    <div className="modal-overlay" onClick={closePasswordModal}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <Lock size={20} color="var(--accent-primary)" />
            Management Access
          </h3>
          <button className="modal-close-btn" onClick={closePasswordModal} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Please enter your portfolio management password to perform this action.
            </p>

            <div className="form-group">
              <label className="form-label" htmlFor="admin-pwd">Management Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-pwd"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  style={{ paddingRight: '2.5rem' }}
                  placeholder="Enter management password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {authError && (
              <div style={{
                color: '#f87171',
                fontSize: '0.85rem',
                marginTop: '0.5rem',
                padding: '0.5rem 0.75rem',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                {authError}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={closePasswordModal}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isVerifying || !password.trim()}
            >
              {isVerifying ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
