import { useState } from 'react';
import { useAppState } from '../store';
import { OPERATOR_PASSWORD, LOGO_URL } from '../data';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface LoginPageProps {
  setCurrentPage: (page: string) => void;
}

export default function LoginPage({ setCurrentPage }: LoginPageProps) {
  const { setIsOperator } = useAppState();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (password === OPERATOR_PASSWORD) {
        setIsOperator(true);
        setCurrentPage('dashboard');
      } else {
        setError('Invalid password! Access denied.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 animate-fadeInUp">
      <div className="max-w-md w-full">
        <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full gradient-saffron p-1 shadow-xl animate-pulse-glow">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full rounded-full object-cover" />
            </div>
            <h1 className="text-2xl font-black text-gray-800 mb-2">Operator Login</h1>
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> Authorized Access Only
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-1" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter operator password"
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors pr-12 text-lg ${
                    error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-saffron'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2 font-medium animate-slideIn">❌ {error}</p>
              )}
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !password}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-xl ${
                loading || !password
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'gradient-saffron hover:opacity-90 hover:shadow-2xl'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                '🔐 Login'
              )}
            </button>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs text-amber-700 text-center">
              ⚠️ This section is for authorized operators only. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
