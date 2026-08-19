import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 800); // 0.8 second ka smooth login delay
    }
  };

  return (
    <div className="h-screen w-full bg-dark-bg flex items-center justify-center text-white">
      <div className="bg-dark-card p-8 rounded-xl border border-dark-border shadow-2xl w-96 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent"></div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4 border border-brand-blue/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Shield size={32} className="text-brand-blue" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-brand-blue">CITY.OS</h1>
          <p className="text-gray-400 text-sm mt-1">Command Center Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0B0F19] border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-all"
              placeholder="admin@cityos.gov"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0B0F19] border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-brand-blue/80 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2 shadow-[0_0_10px_rgba(59,130,246,0.3)] flex items-center justify-center"
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          Secure Connection Enabled • AES-256
        </div>
      </div>
    </div>
  );
};

export default Login;