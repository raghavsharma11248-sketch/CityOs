import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  // Field-level validation
  const validate = () => {
    if (!email)    return 'Email address is required.';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address.';
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password, rememberMe);
      setLoading(false);
      if (result.success) {
        navigate('/');          // Login ke baad Dashboard pe le jao
      } else {
        setError(result.error); // Wrong creds — error dikhao
      }
    }, 700);
  };

  return (
    <div className="h-screen w-full bg-[#0B0F19] flex items-center justify-center text-white">
      <div className="bg-[#1A2235] p-8 rounded-xl border border-[#2A3441] shadow-2xl w-96 relative overflow-hidden">
        {/* Top blue glow line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Shield size={32} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-blue-400">CITY.OS</h1>
          <p className="text-gray-400 text-sm mt-1">Command Center Access</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full bg-[#0B0F19] border border-[#2A3441] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-600"
              placeholder="admin@cityos.gov"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-[#0B0F19] border border-[#2A3441] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-600 pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-600 hover:border-gray-400'
              }`}
            >
              {rememberMe && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <span className="text-gray-400 text-sm cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
              Remember me on this device
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2 shadow-[0_0_10px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              'Authenticate'
            )}
          </button>
        </form>

        {/* Demo credentials hint */}
        <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-500 space-y-1">
          <p className="font-bold text-gray-400 mb-2">Demo Credentials:</p>
          <p>🔴 Admin: <span className="text-gray-300">admin@cityos.gov / admin123</span></p>
          <p>👤 Citizen: <span className="text-gray-300">citizen@delhi.in / citizen123</span></p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-600">
          Secure Connection Enabled • AES-256
        </div>
      </div>
    </div>
  );
};

export default Login;
