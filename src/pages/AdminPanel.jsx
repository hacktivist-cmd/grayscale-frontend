import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, ArrowUpRight, ArrowDownLeft, 
  Clock, Settings, LogOut, Search, Bell, Check, X, 
  UserPlus, CheckCircle2, Trash2, RefreshCw
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const DEFAULT_PRICES = { BTC: 63120.50, ETH: 1895.20, SOL: 142.80, USDT: 1.00 };
const ADMIN_CREDENTIALS = { email: 'gs@ingray.com', password: 'gtrade' };

export default function AdminPanel({ onLogout }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [authEmail, setAuthEmail] = useState('gs@ingray.com');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [mobileTab, setMobileTab] = useState('dashboard');
  const [prices, setPrices] = useState(DEFAULT_PRICES);

  const [users, setUsers] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ wallet: 0, assets: {} });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ fullname: '', username: '', email: '', password: '', usdt: 0 });

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('grayscale_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthed(true);
      const token = localStorage.getItem('grayscale_token');
      if (token) fetchUsers();
    }
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthError(false);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('grayscale_token', data.token);
      setIsAuthed(true);
      sessionStorage.setItem('grayscale_admin_auth', 'true');
      triggerToast('Authenticated as Admin');
      await fetchUsers();
    } catch (err) {
      setAuthError(true);
      triggerToast(err.message);
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('grayscale_admin_auth');
    localStorage.removeItem('grayscale_token');
    setIsAuthed(false);
    setAuthPassword('');
    if (onLogout) onLogout();
    triggerToast('Signed out of admin panel');
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token || !isAuthed) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/users`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const mapped = (data.users || []).map(u => ({
          id: u.id,
          fullname: `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'User',
          username: `@${u.email?.split('@')[0] || 'user'}`,
          email: u.email,
          password: '••••••••',
          kycStatus: u.kyc_status || 'Pending',
          status: u.status || 'Active',
          walletBalance: u.balance_usd || 0,
          assets: u.assets || []
        }));
        setUsers(mapped);
      }
    } catch (err) { console.warn('Admin API unavailable.', err); }
  };

  const fetchWithdrawals = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token || !isAuthed) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/withdrawals`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setWithdrawals(data.withdrawals || []);
      }
    } catch (err) { console.warn('Failed to fetch withdrawals'); }
  };

  const fetchDeposits = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token || !isAuthed) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/deposits`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setDeposits(data.deposits || []);
      }
    } catch (err) { console.warn('Failed to fetch deposits'); }
  };

  const fetchTransactions = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token || !isAuthed) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/transactions`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions || []);
      }
    } catch (err) { console.warn('Failed to fetch transactions'); }
  };

  const fetchInvestments = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token || !isAuthed) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/investments`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setInvestments(data.investments || []);
      }
    } catch (err) { console.warn('Failed to fetch investments'); }
  };

  // Fetch data when desktop tab changes
  useEffect(() => {
    if (currentTab === 'users') fetchUsers();
    if (currentTab === 'withdrawals') fetchWithdrawals();
    if (currentTab === 'deposits') fetchDeposits();
    if (currentTab === 'transactions') fetchTransactions();
    if (currentTab === 'investments') fetchInvestments();
  }, [currentTab, isAuthed]);

  // Fetch data when mobile tab changes (fix for mobile)
  useEffect(() => {
    if (mobileTab === 'users') fetchUsers();
    if (mobileTab === 'withdrawals') fetchWithdrawals();
    if (mobileTab === 'deposits') fetchDeposits();
    if (mobileTab === 'transactions') fetchTransactions();
    if (mobileTab === 'investments') fetchInvestments();
  }, [mobileTab, isAuthed]);

  const triggerToast = (msg) => { setToastMsg(msg); setToastVisible(true); setTimeout(() => setToastVisible(false), 3500); };
  const formatUSD = (val) => val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const switchDesktopTab = (tab) => setCurrentTab(tab);
  const switchMobileTab = (tab) => setMobileTab(tab);

  const updateWithdrawalStatus = async (id, status) => {
    const token = localStorage.getItem('grayscale_token');
    try {
      const res = await fetch(`${API_BASE}/api/admin/withdrawals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update withdrawal');
      triggerToast(`Withdrawal ${status}`);
      fetchWithdrawals();
    } catch (err) { triggerToast(err.message); }
  };

  const updateDepositStatus = async (id, status) => {
    const token = localStorage.getItem('grayscale_token');
    try {
      const res = await fetch(`${API_BASE}/api/admin/deposits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update deposit');
      triggerToast(`Deposit ${status}`);
      fetchDeposits();
    } catch (err) { triggerToast(err.message); }
  };

  const openEditModal = (user) => {
    const assetsObj = {};
    (user.assets || []).forEach(a => { assetsObj[a.symbol] = a.holdings; });
    setEditUser(user);
    setEditForm({ wallet: user.walletBalance, assets: assetsObj });
    setEditModalOpen(true);
  };

  const saveUserBalances = async (e) => {
    e.preventDefault();
    if (!editUser) return;
    const token = localStorage.getItem('grayscale_token');
    try {
      const walletRes = await fetch(`${API_BASE}/api/admin/users/${editUser.id}/balance`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ balance: editForm.wallet })
      });
      if (!walletRes.ok) throw new Error('Failed to update wallet balance');

      const assetsPayload = Object.keys(editForm.assets).map(symbol => ({ symbol, holdings: editForm.assets[symbol] }));
      const assetsRes = await fetch(`${API_BASE}/api/admin/users/${editUser.id}/assets`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ assets: assetsPayload })
      });
      if (!assetsRes.ok) throw new Error('Failed to update portfolio assets');

      triggerToast(`Wallet and portfolio updated for ${editUser.fullname}`);
      setEditModalOpen(false);
      fetchUsers();
    } catch (err) { triggerToast(err.message); }
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('grayscale_token');
    const nameParts = newUserForm.fullname.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ firstName, lastName, email: newUserForm.email, password: newUserForm.password })
      });
      if (!res.ok) throw new Error('Failed to create user');
      if (newUserForm.usdt > 0) {
        const data = await res.json();
        const userId = data.user.id;
        await fetch(`${API_BASE}/api/admin/users/${userId}/balance`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ balance: newUserForm.usdt })
        });
      }
      triggerToast(`User vault created for ${newUserForm.fullname}`);
      setAddModalOpen(false);
      setNewUserForm({ fullname: '', username: '', email: '', password: '', usdt: 0 });
      fetchUsers();
    } catch (err) { triggerToast(err.message); }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to permanently delete this user?')) return;
    const token = localStorage.getItem('grayscale_token');
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete user');
      triggerToast('User deleted permanently.');
      fetchUsers();
    } catch (err) { triggerToast(err.message); }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    const token = localStorage.getItem('grayscale_token');
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      triggerToast(`User status changed to ${newStatus}`);
      fetchUsers();
    } catch (err) { triggerToast(err.message); }
  };

  const filteredUsers = users.filter(u => 
    u.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getKYCClass = (status) => {
    if (status === 'Verified') return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    if (status === 'Pending') return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    return 'bg-red-500/20 text-red-400 border border-red-500/30';
  };

  const calculatePortfolioValue = (assets) => {
    if (!assets) return 0;
    return assets.reduce((sum, a) => sum + (a.holdings * (prices[a.symbol] || 0)), 0);
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#0c0a0f] flex items-center justify-center p-4 font-sans antialiased">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#15111b] border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-purple-glow mx-auto">AD</div>
            <h2 className="text-xl font-black text-white tracking-wide">GRAYSCALE PRIME</h2>
            <p className="text-xs text-slate-400">Institutional Vault Admin Authentication</p>
          </div>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 uppercase">Admin Email</label>
              <input type="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="gs@ingray.com" className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500 transition-all font-mono" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 uppercase">Admin Password</label>
              <input type="password" required value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="Enter password" className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500 transition-all font-mono" />
            </div>
            {authError && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center font-semibold">Invalid email or password.</div>
            )}
            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-purple-glow">Authenticate Access</button>
          </form>
          <p className="text-[10px] text-center text-slate-500">Authorized Personnel Only • 256-Bit Encrypted Vault</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0c0a0f] text-slate-100 font-sans antialiased selection:bg-purple-600 selection:text-white flex flex-col min-h-screen">
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-[120] px-5 py-3.5 rounded-2xl bg-[#1d1729] border border-purple-500/40 text-xs font-bold text-slate-100 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-purple-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Desktop view */}
      <div className="hidden md:flex min-h-screen w-full">
        <aside className="w-64 bg-[#0e0b13] border-r border-white/[0.07] flex flex-col justify-between flex-shrink-0 sticky top-0 h-screen z-30">
          <div>
            <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-purple-glow">AD</div>
              <div><div className="flex items-center gap-1.5"><span className="text-sm font-extrabold tracking-wider text-white">ADMIN PANEL</span><span className="text-[9px] bg-purple-500/20 text-purple-400 font-bold px-1.5 py-0.5 rounded-md border border-purple-500/30">v2</span></div><p className="text-[10px] text-slate-400 font-medium">System Management</p></div>
            </div>
            <div className="p-4 border-b border-slate-800/80">
              <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" /><input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600" /></div>
            </div>
            <nav className="px-4 mt-6 space-y-1.5">
              {['dashboard','users','withdrawals','deposits','transactions','investments','settings'].map(tab => (
                <button key={tab} onClick={() => switchDesktopTab(tab)} className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${currentTab === tab ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-glow' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}>
                  {tab === 'dashboard' && <LayoutDashboard className="w-4.5 h-4.5" />}
                  {tab === 'users' && <Users className="w-4.5 h-4.5" />}
                  {tab === 'withdrawals' && <ArrowUpRight className="w-4.5 h-4.5" />}
                  {tab === 'deposits' && <ArrowDownLeft className="w-4.5 h-4.5" />}
                  {tab === 'transactions' && <Clock className="w-4.5 h-4.5" />}
                  {tab === 'investments' && <TrendingUp className="w-4.5 h-4.5" />}
                  {tab === 'settings' && <Settings className="w-4.5 h-4.5" />}
                  <span className="capitalize">{tab}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-white/[0.06]">
            <button onClick={handleAdminLogout} className="w-full py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors flex items-center justify-center gap-2">
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 px-6 border-b border-white/[0.06] bg-[#0c0a0f]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
            <div></div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white"><Bell className="w-4 h-4" /></button>
              <button onClick={handleAdminLogout} className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"><LogOut className="w-4 h-4" /></button>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
            {currentTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Vault Users</span>
                    <div className="text-3xl font-extrabold text-white font-mono">{users.length}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Accounts</span>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">{users.filter(u => u.status === 'Active').length}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total AUM (USD)</span>
                    <div className="text-3xl font-extrabold text-purple-300 font-mono">${formatUSD(users.reduce((sum, u) => sum + u.walletBalance, 0))}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Approvals</span>
                    <div className="text-3xl font-extrabold text-amber-400 font-mono">{withdrawals.filter(w => w.status === 'Pending').length + deposits.filter(d => d.status === 'Pending').length}</div>
                  </div>
                </div>
              </div>
            )}
            {currentTab === 'users' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div><h2 className="text-lg font-bold text-white">Vault User Management</h2><p className="text-xs text-slate-400">Manage all users, balances, and KYC status</p></div>
                  <button onClick={() => setAddModalOpen(true)} className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-purple-glow"><UserPlus className="w-4 h-4" /> Add User Vault</button>
                </div>
                <div className="bg-[#15111b] border border-white/[0.08] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-black/40 border-b border-white/[0.06]">
                        <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-5">User</th>
                          <th className="py-4 px-5">KYC</th>
                          <th className="py-4 px-5 text-right">USDT Balance</th>
                          <th className="py-4 px-5 text-right">Overall Net</th>
                          <th className="py-4 px-5 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04] text-xs">
                        {filteredUsers.map(u => {
                          const totalUsd = u.walletBalance + calculatePortfolioValue(u.assets);
                          return (
                            <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 px-5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs text-white">{u.fullname.charAt(0)}</div><div><div className="font-bold text-white">{u.fullname}</div><div className="text-[10px] text-purple-400 font-mono">{u.username}</div><div className="text-[10px] text-slate-400">{u.email}</div></div></div></td>
                              <td className="py-4 px-5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getKYCClass(u.kycStatus)}`}>{u.kycStatus}</span></td>
                              <td className="py-4 px-5 text-right font-mono text-emerald-400">${formatUSD(u.walletBalance)}</td>
                              <td className="py-4 px-5 text-right font-mono font-bold text-purple-300">${formatUSD(totalUsd)}</td>
                              <td className="py-4 px-5 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button onClick={() => openEditModal(u)} className="px-2.5 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white transition-all text-[10px] font-bold">Edit</button>
                                  <button onClick={() => toggleUserStatus(u.id, u.status)} className="px-2.5 py-1.5 rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 transition-all text-[10px] font-bold">{u.status === 'Active' ? 'Suspend' : 'Activate'}</button>
                                  <button onClick={() => deleteUser(u.id)} className="px-2.5 py-1.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {currentTab === 'withdrawals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div><h2 className="text-lg font-bold text-white">Withdrawal Requests</h2><p className="text-xs text-slate-400">Approve or reject pending withdrawals</p></div>
                  <button onClick={fetchWithdrawals} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Refresh</button>
                </div>
                {withdrawals.length === 0 ? <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] text-center text-slate-400 text-sm italic">No withdrawal requests yet.</div> : (
                  <div className="bg-[#15111b] border border-white/[0.08] rounded-2xl overflow-hidden">
                    <table className="w-full text-left"><thead className="bg-black/40 border-b border-white/[0.06]"><tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider"><th className="py-4 px-5">ID</th><th className="py-4 px-5">User</th><th className="py-4 px-5 text-right">Amount</th><th className="py-4 px-5">Asset</th><th className="py-4 px-5">Address</th><th className="py-4 px-5">Date</th><th className="py-4 px-5">Status</th><th className="py-4 px-5 text-center">Action</th></tr></thead><tbody className="divide-y divide-white/[0.04] text-xs">
                      {withdrawals.map(w => (
                        <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-5 font-mono text-slate-300">{w.id}</td>
                          <td className="py-4 px-5 text-white">{w.user_name}</td>
                          <td className="py-4 px-5 text-right font-mono text-slate-300">{w.amount}</td>
                          <td className="py-4 px-5">{w.asset}</td>
                          <td className="py-4 px-5 text-xs font-mono text-slate-300 truncate max-w-[120px]">{w.address || '—'}</td>
                          <td className="py-4 px-5 text-slate-400">{w.date}</td>
                          <td className="py-4 px-5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${w.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : w.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{w.status}</span></td>
                          <td className="py-4 px-5 text-center"><div className="flex items-center justify-center gap-2">{w.status === 'Pending' ? <><button onClick={() => updateWithdrawalStatus(w.id, 'Approved')} className="p-2 rounded-lg bg-emerald-600 text-white"><Check className="w-3 h-3" /></button><button onClick={() => updateWithdrawalStatus(w.id, 'Rejected')} className="p-2 rounded-lg bg-red-600 text-white"><X className="w-3 h-3" /></button></> : <span className="text-xs text-slate-500">—</span>}</div></td>
                        </tr>
                      ))}
                    </tbody></table>
                  </div>
                )}
              </div>
            )}
            {currentTab === 'deposits' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div><h2 className="text-lg font-bold text-white">Deposit Approvals</h2><p className="text-xs text-slate-400">Confirm incoming deposits</p></div>
                  <button onClick={fetchDeposits} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Refresh</button>
                </div>
                {deposits.length === 0 ? <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] text-center text-slate-400 text-sm italic">No deposit requests yet.</div> : (
                  <div className="bg-[#15111b] border border-white/[0.08] rounded-2xl overflow-hidden">
                    <table className="w-full text-left"><thead className="bg-black/40 border-b border-white/[0.06]"><tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider"><th className="py-4 px-5">ID</th><th className="py-4 px-5">User</th><th className="py-4 px-5 text-right">Amount</th><th className="py-4 px-5">Asset</th><th className="py-4 px-5">Date</th><th className="py-4 px-5">Status</th><th className="py-4 px-5 text-center">Action</th></tr></thead><tbody className="divide-y divide-white/[0.04] text-xs">
                      {deposits.map(d => (
                        <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-5 font-mono text-slate-300">{d.id}</td>
                          <td className="py-4 px-5 text-white">{d.user_name}</td>
                          <td className="py-4 px-5 text-right font-mono text-slate-300">{d.amount}</td>
                          <td className="py-4 px-5">{d.asset}</td>
                          <td className="py-4 px-5 text-slate-400">{d.date}</td>
                          <td className="py-4 px-5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${d.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : d.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{d.status}</span></td>
                          <td className="py-4 px-5 text-center"><div className="flex items-center justify-center gap-2">{d.status === 'Pending' ? <><button onClick={() => updateDepositStatus(d.id, 'Approved')} className="p-2 rounded-lg bg-emerald-600 text-white"><Check className="w-3 h-3" /></button><button onClick={() => updateDepositStatus(d.id, 'Rejected')} className="p-2 rounded-lg bg-red-600 text-white"><X className="w-3 h-3" /></button></> : <span className="text-xs text-slate-500">—</span>}</div></td>
                        </tr>
                      ))}
                    </tbody></table>
                  </div>
                )}
              </div>
            )}
            {currentTab === 'transactions' && (
              <div className="space-y-6">
                <div><h2 className="text-lg font-bold text-white">All Transactions</h2><p className="text-xs text-slate-400">Complete system transaction history</p></div>
                {transactions.length === 0 ? <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] text-center text-slate-400 text-sm italic">No transactions recorded yet.</div> : (
                  <div className="bg-[#15111b] border border-white/[0.08] rounded-2xl overflow-hidden">
                    <table className="w-full text-left"><thead className="bg-black/40 border-b border-white/[0.06]"><tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider"><th className="py-4 px-5">ID</th><th className="py-4 px-5">Type</th><th className="py-4 px-5">User</th><th className="py-4 px-5">Asset</th><th className="py-4 px-5 text-right">Amount</th><th className="py-4 px-5">Date</th><th className="py-4 px-5">Status</th></tr></thead><tbody className="divide-y divide-white/[0.04] text-xs">
                      {transactions.map(t => (
                        <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-5 font-mono text-slate-300">{t.id}</td>
                          <td className="py-4 px-5 text-white">{t.type}</td>
                          <td className="py-4 px-5 text-slate-300">{t.user_name || t.user}</td>
                          <td className="py-4 px-5">{t.asset}</td>
                          <td className="py-4 px-5 text-right font-mono text-slate-300">{t.amount}</td>
                          <td className="py-4 px-5 text-slate-400">{t.date}</td>
                          <td className="py-4 px-5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${t.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400'}`}>{t.status}</span></td>
                        </tr>
                      ))}
                    </tbody></table>
                  </div>
                )}
              </div>
            )}
            {currentTab === 'investments' && (
              <div className="space-y-6">
                <div><h2 className="text-lg font-bold text-white">Active Vault Investments</h2><p className="text-xs text-slate-400">7-Day locked staking positions</p></div>
                <div className="bg-[#15111b] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                  {investments.length === 0 ? <p className="text-slate-400 text-sm italic text-center py-4">No active investments recorded yet.</p> : (
                    <div className="space-y-3">
                      {investments.map(inv => (
                        <div key={inv.id} className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                          <div><div className="font-bold text-white">{inv.asset}</div><div className="text-xs text-slate-400">Invested ${inv.amount_invested}</div></div>
                          <div><span className="text-xs text-emerald-400">+{inv.profit_percent || 30}%</span></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {currentTab === 'settings' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">System Configuration</h2>
                <div className="bg-[#15111b] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-slate-300 uppercase">Vault Wallet Addresses</div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                      <div className="p-2 rounded bg-black/60"><span className="text-amber-400 font-bold">BTC:</span> 13Ggd...</div>
                      <div className="p-2 rounded bg-black/60"><span className="text-indigo-400 font-bold">ETH:</span> 0xb8e6...</div>
                      <div className="p-2 rounded bg-black/60"><span className="text-cyan-400 font-bold">SOL:</span> 5eCbP...</div>
                      <div className="p-2 rounded bg-black/60"><span className="text-emerald-400 font-bold">USDT:</span> 0xb8e6...</div>
                    </div>
                  </div>
                  <button onClick={() => triggerToast('Settings saved successfully!')} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-purple-glow">Save System Settings</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden min-h-screen w-full flex justify-center bg-[#0c0a0f]">
        <div className="w-full max-w-md bg-[#0a0e1a] min-h-screen flex flex-col relative border-x border-white/[0.08] shadow-2xl pb-24">
          <header className="px-5 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-[#0a0e1a]/80 backdrop-blur-xl z-20 border-b border-white/[0.08]">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm text-white">AD</div><div><span className="text-xs font-black text-white uppercase tracking-widest">ADMIN PANEL</span></div></div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-slate-800/60 border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all active:scale-95"><Search className="w-4 h-4" /></button>
              <button onClick={handleAdminLogout} className="w-9 h-9 rounded-full bg-slate-800/60 border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all"><LogOut className="w-4 h-4" /></button>
            </div>
          </header>

          <main className="flex-1 px-5 pt-4 space-y-6">
            {mobileTab === 'dashboard' && (
              <div>
                <div className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                  <div className="text-xs text-slate-400 uppercase font-bold">Total AUM (USD)</div>
                  <div className="text-3xl font-extrabold text-purple-300 font-mono">${formatUSD(users.reduce((sum, u) => sum + u.walletBalance, 0))}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-4 rounded-2xl bg-[#15111b] border border-white/[0.08]"><span className="text-xs text-slate-400 uppercase">Users</span><div className="text-xl font-bold text-white">{users.length}</div></div>
                  <div className="p-4 rounded-2xl bg-[#15111b] border border-white/[0.08]"><span className="text-xs text-slate-400 uppercase">Active</span><div className="text-xl font-bold text-emerald-400">{users.filter(u => u.status === 'Active').length}</div></div>
                </div>
              </div>
            )}

            {mobileTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-white">Users</h2><button onClick={() => setAddModalOpen(true)} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold">Add</button></div>
                <div className="space-y-3">
                  {filteredUsers.slice(0, 5).map(u => {
                    const portfolioValue = calculatePortfolioValue(u.assets);
                    return (
                      <div key={u.id} className="p-4 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-3">
                        <div className="flex justify-between items-center"><div><div className="font-bold text-white text-sm">{u.fullname} <span className="text-xs text-purple-400">({u.username})</span></div><div className="text-[10px] text-slate-400 font-mono">{u.email}</div></div><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getKYCClass(u.kycStatus)}`}>{u.kycStatus}</span></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center"><span className="text-[10px] text-slate-400 uppercase font-bold">Wallet</span><span className="text-sm font-bold font-mono text-emerald-400">${formatUSD(u.walletBalance)}</span></div>
                          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center"><span className="text-[10px] text-slate-400 uppercase font-bold">Portfolio</span><span className="text-sm font-bold font-mono text-purple-300">${formatUSD(portfolioValue)}</span></div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openEditModal(u)} className="flex-1 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs">Edit</button>
                          <button onClick={() => toggleUserStatus(u.id, u.status)} className="flex-1 py-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 text-xs font-bold">{u.status === 'Active' ? 'Suspend' : 'Activate'}</button>
                          <button onClick={() => deleteUser(u.id)} className="px-3 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 text-xs font-bold"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {mobileTab === 'withdrawals' && (
              <div><h2 className="text-lg font-bold text-white mb-4">Withdrawals</h2>
                {withdrawals.length === 0 ? <p className="text-slate-400 text-sm italic text-center py-4">No withdrawal requests.</p> : (
                  <div className="space-y-3">{withdrawals.slice(0,3).map(w => (
                    <div key={w.id} className="p-4 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                      <div className="flex justify-between"><span className="text-sm font-bold text-white">{w.user_name}</span><span className="text-sm font-mono text-slate-300">{w.amount}</span></div>
                      <div className="flex justify-between text-xs text-slate-400"><span>{w.id} • {w.asset}</span><span>{w.date}</span></div>
                      <div className="flex justify-between items-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${w.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>{w.status}</span></div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

            {mobileTab === 'deposits' && (
              <div><h2 className="text-lg font-bold text-white mb-4">Deposits</h2>
                {deposits.length === 0 ? <p className="text-slate-400 text-sm italic text-center py-4">No deposit requests.</p> : (
                  <div className="space-y-3">{deposits.slice(0,3).map(d => (
                    <div key={d.id} className="p-4 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                      <div className="flex justify-between"><span className="text-sm font-bold text-white">{d.user_name}</span><span className="text-sm font-mono text-slate-300">{d.amount}</span></div>
                      <div className="flex justify-between text-xs text-slate-400"><span>{d.id} • {d.asset}</span><span>{d.date}</span></div>
                      <div className="flex justify-between items-center"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${d.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>{d.status}</span></div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

            {mobileTab === 'transactions' && (
              <div><h2 className="text-lg font-bold text-white mb-4">Activity</h2>
                {transactions.length === 0 ? <p className="text-slate-400 text-sm italic text-center py-4">No transactions yet.</p> : (
                  <div className="space-y-3">{transactions.slice(0,3).map(t => (
                    <div key={t.id} className="p-4 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                      <div className="flex justify-between"><span className="text-sm font-bold text-white">{t.type}</span><span className="text-sm font-mono text-slate-300">{t.amount}</span></div>
                      <div className="flex justify-between text-xs text-slate-400"><span>{t.id} • {t.asset}</span><span>{t.date}</span></div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

            {mobileTab === 'investments' && (
              <div><h2 className="text-lg font-bold text-white mb-4">Investments</h2>
                {investments.length === 0 ? <p className="text-slate-400 text-sm italic text-center py-4">No investments yet.</p> : (
                  <div className="space-y-3">{investments.slice(0,3).map(inv => (
                    <div key={inv.id} className="p-4 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2">
                      <div className="flex justify-between"><span className="text-sm font-bold text-white">{inv.asset}</span><span className="text-sm font-mono text-slate-300">${inv.amount_invested}</span></div>
                      <div className="flex justify-between text-xs text-slate-400"><span>{inv.id}</span><span>+{inv.profit_percent || 30}%</span></div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

            {mobileTab === 'settings' && (
              <div className="pb-24"><h2 className="text-xl font-bold text-white mb-4">Settings</h2>
                <div className="bg-[#15111b] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10"><div className="text-xs font-bold text-slate-300 uppercase">Vault Addresses</div><div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 mt-2"><div>BTC: 13Ggd...</div><div>ETH: 0xb8e6...</div><div>SOL: 5eCbP...</div><div>USDT: 0xb8e6...</div></div></div>
                  <button onClick={() => triggerToast('Settings saved!')} className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs">Save Settings</button>
                </div>
              </div>
            )}
          </main>

          <nav className="fixed bottom-0 max-w-md w-full bg-[#0a0e1a]/90 backdrop-blur-xl border-t border-white/[0.08] px-4 py-2 flex items-center justify-between z-30 shadow-2xl">
            <button onClick={() => switchMobileTab('dashboard')} className={`flex flex-col items-center gap-1 ${mobileTab === 'dashboard' ? 'text-purple-400 scale-105' : 'text-slate-500 hover:text-slate-300'}`}><Home className="w-5 h-5" /><span className="text-[10px] font-semibold">Home</span></button>
            <button onClick={() => switchMobileTab('users')} className={`flex flex-col items-center gap-1 ${mobileTab === 'users' ? 'text-purple-400 scale-105' : 'text-slate-500 hover:text-slate-300'}`}><Users className="w-5 h-5" /><span className="text-[10px] font-semibold">Users</span></button>
            <button onClick={() => switchMobileTab('withdrawals')} className={`flex flex-col items-center gap-1 ${mobileTab === 'withdrawals' ? 'text-purple-400 scale-105' : 'text-slate-500 hover:text-slate-300'}`}><ArrowUpRight className="w-5 h-5" /><span className="text-[10px] font-semibold">Withdrawals</span></button>
            <button onClick={() => switchMobileTab('deposits')} className={`flex flex-col items-center gap-1 ${mobileTab === 'deposits' ? 'text-purple-400 scale-105' : 'text-slate-500 hover:text-slate-300'}`}><ArrowDownLeft className="w-5 h-5" /><span className="text-[10px] font-semibold">Deposits</span></button>
            <button onClick={() => switchMobileTab('transactions')} className={`flex flex-col items-center gap-1 ${mobileTab === 'transactions' ? 'text-purple-400 scale-105' : 'text-slate-500 hover:text-slate-300'}`}><Clock className="w-5 h-5" /><span className="text-[10px] font-semibold">Activity</span></button>
            <button onClick={() => switchMobileTab('settings')} className={`flex flex-col items-center gap-1 ${mobileTab === 'settings' ? 'text-purple-400 scale-105' : 'text-slate-500 hover:text-slate-300'}`}><Settings className="w-5 h-5" /><span className="text-[10px] font-semibold">Settings</span></button>
          </nav>
        </div>
      </div>

      {/* EDIT USER MODAL */}
      {editModalOpen && editUser && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 space-y-5 rounded-2xl bg-[#15111b] border border-white/10 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <div><h3 className="text-sm font-black text-white tracking-wider uppercase">EDIT USER BALANCES</h3><p className="text-xs text-purple-400 font-mono">{editUser.fullname} ({editUser.username})</p></div>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={saveUserBalances} className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 space-y-2">
                <label className="text-[11px] font-bold text-purple-300 uppercase">Wallet Balance (USD)</label>
                <input type="number" step="any" value={editForm.wallet} onChange={(e) => setEditForm(prev => ({ ...prev, wallet: parseFloat(e.target.value) || 0 }))} className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-emerald-400 font-mono font-bold outline-none focus:border-purple-500" />
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <label className="text-[11px] font-bold text-purple-300 uppercase">Portfolio Assets (Holdings)</label>
                <div className="grid grid-cols-2 gap-2">
                  {['BTC', 'ETH', 'SOL', 'USDT'].map(symbol => (
                    <div key={symbol} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300 w-10">{symbol}</span>
                      <input type="number" step="any" value={editForm.assets[symbol] || 0} onChange={(e) => setEditForm(prev => ({ ...prev, assets: { ...prev.assets, [symbol]: parseFloat(e.target.value) || 0 } }))} className="w-full bg-black/60 border border-white/15 rounded px-2 py-1 text-xs text-white font-mono outline-none focus:border-purple-500" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">These are the crypto holdings that fluctuate with market price.</p>
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-purple-glow">Save Balances</button>
            </form>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 space-y-5 rounded-2xl bg-[#15111b] border border-white/10 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]"><h3 className="text-sm font-black text-white tracking-wider uppercase">CREATE NEW USER VAULT</h3><button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"><X className="w-5 h-5" /></button></div>
            <form onSubmit={createNewUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase">Full Name</label><input type="text" required value={newUserForm.fullname} onChange={(e) => setNewUserForm(prev => ({ ...prev, fullname: e.target.value }))} placeholder="John Doe" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500" /></div>
                <div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase">Username (optional)</label><input type="text" value={newUserForm.username} onChange={(e) => setNewUserForm(prev => ({ ...prev, username: e.target.value }))} placeholder="@johndoe" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase">Email Address</label><input type="email" required value={newUserForm.email} onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))} placeholder="john@example.com" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500 font-mono" /></div>
                <div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase">Account Password</label><input type="password" required value={newUserForm.password} onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))} placeholder="••••••••" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500 font-mono" /></div>
              </div>
              <div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase">Initial USDT Balance</label><input type="number" step="any" value={newUserForm.usdt} onChange={(e) => setNewUserForm(prev => ({ ...prev, usdt: parseFloat(e.target.value) || 0 }))} placeholder="1000.00" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-purple-500" /></div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-purple-500 transition-colors shadow-purple-glow">Create User Vault Account</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
