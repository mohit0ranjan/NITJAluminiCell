import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, currentUser } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await register(email, password, fullName);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 via-white to-indigo-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-1" />
      
      {/* Left Side: Registration Form */}
      <div className="w-1/2 flex items-center justify-center p-8 animate-slide-in-left">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center stagger-animation">
            <div className="flex justify-center animate-fade-in">
              <Link to="/" className="flex items-center space-x-2 hover-scale">
                <GraduationCap className="h-12 w-12 text-indigo-600 animate-float" />
                <span className="text-2xl font-bold text-gray-900">NITJ Alumni</span>
              </Link>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 animate-slide-up">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600 animate-fade-in">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover-scale inline-block">
                Sign in
              </Link>
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 animate-scale-in hover:shadow-xl transition-all duration-300">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-shake">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form className="space-y-6 stagger-animation" onSubmit={handleSubmit}>
              <div className="animate-slide-up">
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="animate-slide-up">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="animate-slide-up">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg hover-scale"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create account
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side: Decorative Image */}
      <div className="w-1/2 bg-cover bg-center hidden lg:block animate-slide-in-right" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="h-full w-full bg-opacity-50 flex items-center justify-center">
          <div className="text-black text-center p-12 glass-effect rounded-2xl m-8 animate-float">
            <h2 className="text-4xl font-bold mb-4">Join Our Alumni Network</h2>
            <p className="text-lg">Connect with fellow graduates and stay updated with the latest opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;