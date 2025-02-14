import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();
  const { login, currentUser, userRole } = useAuth();

  React.useEffect(() => {
    if (currentUser && userRole) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [currentUser, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (err) {
      setError('Failed to send password reset email. Please check your email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-1" />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-row items-center justify-center space-x-12">
          
          {/* Left Side: Login Form */}
          <div className="flex flex-col items-start justify-center space-y-8 w-1/2 ml-20 animate-slide-in-left">
            <div className="sm:w-full sm:max-w-md stagger-animation">
              <div className="flex justify-center animate-fade-in">
                <Link to="/" className="flex items-center space-x-2 hover-scale">
                  <GraduationCap className="h-12 w-12 text-indigo-600 animate-float" />
                  <span className="text-2xl font-bold text-gray-900">NITJ Alumni</span>
                </Link>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900 text-center animate-slide-up">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-600 text-center animate-fade-in">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 hover-scale inline-block">
                  Create one now
                </Link>
              </p>
            </div>

            <div className="sm:w-full sm:max-w-md mb-5 animate-scale-in">
              <div className="bg-white/80 backdrop-blur-lg py-8 px-4 shadow-2xl rounded-2xl sm:px-10 mb-5 hover:shadow-xl transition-all duration-300">
                {error && (
                  <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md animate-shake">
                    {error}
                  </div>
                )}
                {resetEmailSent && (
                  <div className="mb-5 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                    Password reset email sent! Please check your inbox.
                  </div>
                )}
                <form className="space-y-9 stagger-animation" onSubmit={handleSubmit}>
                  <div className="animate-slide-up">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1 group">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div className="animate-slide-up">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 group">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 animate-slide-up">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover-scale"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <LogIn className="h-5 w-5 mr-2" />
                          Sign in
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={loading}
                      className="text-sm text-indigo-600 hover:text-indigo-500 font-medium focus:outline-none transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-1/2 hidden md:flex justify-center animate-slide-in-right">
            <img 
              src="/pic.jpg" 
              alt="Login Illustration" 
              className="w-300 h-500 object-cover rounded-lg shadow-2xl mr-20 hover-scale"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;