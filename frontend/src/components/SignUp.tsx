import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    otp: ''
  });
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await authAPI.signup({
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth || undefined
      });
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
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

  const handleGetOTP = async () => {
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await authAPI.signup({
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth || undefined
      });
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
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

          <h1 className="form-title">Sign up</h1>
          <p className="form-subtitle">Sign up to enjoy the feature of HD</p>

          {step === 'signup' ? (
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Jonas Khanwald"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <div className="date-input">
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-input"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

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
                type="button" 
                className="primary-button"
                onClick={handleGetOTP}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Get OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPVerification}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dateOfBirth}
                  disabled
                />
              </div>

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

              {error && <div className="error-message">{error}</div>}

              <button 
                type="submit" 
                className="primary-button"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Sign up'}
              </button>
            </form>
          )}

          <div className="auth-link">
            Already have an account? <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </div>
      <div className="auth-right"></div>
    </div>
  );
};

export default SignUp;