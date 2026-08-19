import { useState } from 'react';

export default function Login({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    accreditedInvestor: '',
    investmentSize: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
    const body = isLoginMode 
      ? { email: formData.email, password: formData.password }
      : { 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          email: formData.email, 
          password: formData.password,
          phone: formData.phone,
          country: formData.country,
          accreditedInvestor: formData.accreditedInvestor,
          investmentSize: formData.investmentSize
        };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }
      if (onLogin) onLogin(data.token, data.user);
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-brand-purple bg-[url('bg.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 text-white max-w-md space-y-6">
          <div className="text-5xl font-black tracking-widest">GRAYSCALE</div>
          <h2 className="text-4xl font-light leading-tight">Welcome back to the future of crypto investing.</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Manage your portfolio, track performance, and access world-class digital assets securely through your investor portal.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 lg:bg-white">
        <div className="w-full max-w-md bg-white lg:bg-transparent p-8 lg:p-0 rounded-xl lg:rounded-none shadow-xl lg:shadow-none">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs mb-4">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          <div id="loginForm" className={isLoginMode ? 'block' : 'hidden'}>
            <h2 className="text-3xl font-light text-gray-900 mb-2">Sign in to your account</h2>
            <p className="text-sm text-gray-500 mb-8">Enter your details to access your portfolio dashboard.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                  <input 
                    type="email" required placeholder="you@example.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                  <input 
                    type="password" required placeholder="••••••••" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-sm" 
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs text-gray-600"><input type="checkbox" className="rounded border-gray-300 text-brand-accent focus:ring-brand-accent" /> <span>Remember me</span></label>
                <span className="text-xs text-brand-accent hover:text-brand-accentHover font-medium cursor-pointer">Forgot password?</span>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-brand-accent hover:bg-brand-accentHover text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded transition shadow-md">
                {loading ? 'Processing...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* SIGNUP FORM (Complete) */}
          <div id="signupForm" className={!isLoginMode ? 'block' : 'hidden'}>
            <h2 className="text-3xl font-light text-gray-900 mb-2">Start Investing</h2>
            <p className="text-sm text-gray-500 mb-6">Complete your profile to get started with Grayscale.</p>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">First Name*</label>
                  <input 
                    type="text" required 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Last Name*</label>
                  <input 
                    type="text" required 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Email*</label>
                <input 
                  type="email" required 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none" 
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Password*</label>
                <input 
                  type="password" required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none" 
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                <div className="flex">
                  <span className="bg-gray-200 border border-r-0 border-gray-300 px-3 py-2.5 rounded-l text-gray-600 flex items-center space-x-1">
                    <span>🇺🇸</span> <span className="font-medium">+1</span>
                  </span>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-r focus:border-brand-purple focus:outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Country*</label>
                <select 
                  required 
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none bg-white"
                >
                  <option value="">Select country...</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="NG">Nigeria</option>
                  <option value="AU">Australia</option>
                  <option value="SG">Singapore</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Please confirm if you are an accredited investor*</label>
                <select 
                  required 
                  value={formData.accreditedInvestor}
                  onChange={(e) => setFormData({...formData, accreditedInvestor: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none bg-white"
                >
                  <option value="">Select option...</option>
                  <option value="income">I earn $200k+ yearly, or $300k with spousal equivalent</option>
                  <option value="assets">I have $1M+ in assets, excluding my primary residence</option>
                  <option value="entity">I own an entity (e.g. family office) with $5M+ assets</option>
                  <option value="licenses">I hold Series 7, 65 or 82 license</option>
                  <option value="none">None of the above</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Estimated Investment Size*</label>
                <select 
                  required 
                  value={formData.investmentSize}
                  onChange={(e) => setFormData({...formData, investmentSize: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none bg-white"
                >
                  <option value="">Select size...</option>
                  <option value="u25">Under $25,000</option>
                  <option value="25k-100k">$25,000 - $100,000</option>
                  <option value="100k-1m">$100,000 - $1 Million</option>
                  <option value="1m-5m">$1 Million - $5 Million</option>
                  <option value="5m+">$5 Million+</option>
                </select>
              </div>
              <div className="text-[10px] text-gray-500 bg-gray-50 p-3 rounded leading-relaxed border border-gray-200">
                Grayscale's private placements are only available to Accredited Investors as defined in Rule 501(a) of Regulation D under the Securities Act of 1933.
              </div>
              <button disabled={loading} type="submit" className="w-full bg-brand-accent hover:bg-brand-accentHover text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded transition shadow-md">
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <span>{isLoginMode ? "New to Grayscale?" : "Already a client?"}</span> 
            <button onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }} className="text-brand-purple font-bold hover:underline ml-1">
              {isLoginMode ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
