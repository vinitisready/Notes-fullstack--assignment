import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await authAPI.signin({ email: formData.email });
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.otp || formData.otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.verifyOTP({
        email: formData.email,
        otp: formData.otp
      });
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await authAPI.signin({ email: formData.email });
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-form">
          <div className="logo">
            <div className="logo-icon">✦</div>
            <span className="logo-text">HD</span>
          </div>

          <h1 className="form-title">Sign In</h1>
          <p className="form-subtitle">Please login to continue to your account.</p>

          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="jonas_kahnwald@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button 
                type="submit" 
                className="primary-button"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Get OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  disabled
                />
              </div>

              <div className="form-group">
                <div className="otp-input">
                  <input
                    type={showOTP ? 'text' : 'password'}
                    name="otp"
                    className="form-input"
                    placeholder="OTP"
                    value={formData.otp}
                    onChange={handleInputChange}
                    maxLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="otp-toggle"
                    onClick={() => setShowOTP(!showOTP)}
                  >
                    👁
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="resend-link"
                onClick={handleResendOTP}
                disabled={loading}
              >
                Resend OTP
              </button>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                />
                <label htmlFor="keepLoggedIn">Keep me logged in</label>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button 
                type="submit" 
                className="primary-button"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}

          <div className="auth-link">
            Need an account? <Link to="/signup">Create one</Link>
          </div>
        </div>
      </div>
      <div className="auth-right"></div>
    </div>
  );
};

export default SignIn;