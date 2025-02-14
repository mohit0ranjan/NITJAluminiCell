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
    <div className="min-h-screen flex">
      {/* Left Side: Background Image */}
      <div className="w-1/2 bg-cover bg-center hidden lg:block animate-slide-in-left" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=1564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 flex items-center justify-center px-10 animate-slide-in-right">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2">
              <GraduationCap className="h-12 w-12 text-indigo-600 animate-float" />
              <span className="text-2xl font-bold text-gray-900 ">NITJ Alumni</span>
            </Link>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 animate-slide-up">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600 animate-fade-in">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-500 ">
                Create one now
              </Link>
            </p>
          </div>

          <div className="bg-white p-8 shadow-lg rounded-lg w-full animate-slide-up">
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 animate-slide-up">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
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
    </div>
  );
};

export default Login;
