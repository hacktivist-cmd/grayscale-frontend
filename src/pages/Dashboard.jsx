import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Wallet, TrendingUp, Bell, ShieldCheck, 
  Search, Repeat, Plus, Download, Clock, Zap, PieChart, Settings, 
  ArrowUpRight, ArrowDownLeft, CheckCircle2, Copy, LogOut, Save, X,
  Send, ArrowRightLeft, CreditCard, Lock, Trash2, User, Home, ChevronDown,
  ArrowDownUp, ShieldAlert, Layers, CandlestickChart, Eye, EyeOff, ArrowLeft, FileSpreadsheet, RefreshCw
} from 'lucide-react';
import TradingViewWidget from '../components/TradingViewWidget';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ==========================
// DEFAULT STATE
// ==========================
const DEFAULT_USER = { fullname: 'User', firstname: 'User', username: '@user', avatar: '', balance_usd: 0 };
const DEFAULT_PRICES = { BTC: 63120.50, ETH: 1895.20, SOL: 142.80, USDT: 1.00 };
const DEFAULT_ADDRESSES = {
  BTC: '13Ggd2Kvm3suXtRrwjUnVms7M8DGXmBPsG',
  ETH: '0xb8e6baf2b4eddac55b7b3a9389e83097924b3ae5',
  SOL: '5eCbPapWqNBWmwWTkgSuAQfJrEw2LkyiSwdRuhpMapgf',
  USDT: '0xb8e6baf2b4eddac55b7b3a9389e83097924b3ae5'
};
const DEFAULT_QR_MAP = { BTC: '/bqr.png', ETH: '/eqr.png', SOL: '/sqr.png', USDT: '/uqr.png' };
const ICON_MAP = { BTC: '/bicon.png', ETH: '/eicon.png', SOL: '/sicon.png', USDT: '/uicon.png' };

export default function Dashboard({ onLogout }) {
  // -------- STATE --------
  const [user, setUser] = useState(DEFAULT_USER);
  const [prices, setPrices] = useState(DEFAULT_PRICES);
  const [assets, setAssets] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);
  const [isPrivacyMasked, setIsPrivacyMasked] = useState(false);
  
  const [currentTab, setCurrentTab] = useState('overview');
  const [settingsSubtab, setSettingsSubtab] = useState('profile');

  // Modal States
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositStep, setDepositStep] = useState(1);
  const [depositAsset, setDepositAsset] = useState('BTC');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositAddress, setDepositAddress] = useState(DEFAULT_ADDRESSES['BTC']);
  const [depositQr, setDepositQr] = useState(DEFAULT_QR_MAP['BTC']);
  const [transferMade, setTransferMade] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAsset, setWithdrawAsset] = useState('USDT');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawSubmitLoading, setWithdrawSubmitLoading] = useState(false);

  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [investAsset, setInvestAsset] = useState('USDT');

  // Delete Account Modal
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // OTC Swap State
  const [payAmount, setPayAmount] = useState(1000);
  const [payAsset, setPayAsset] = useState('USDT');
  const [getAsset, setGetAsset] = useState('BTC');

  // Toast State
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Notifications
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to Grayscale Prime', message: 'Your vault is ready. Start investing or trading.', time: 'Just now', read: false }
  ]);

  // Refs
  const chartRef = useRef(null);
  const refreshIntervalRef = useRef(null);

  // -------- FETCH USER INFO --------
  const fetchUserInfo = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const userData = data.user;
        const firstName = userData.first_name || userData.email?.split('@')[0] || 'User';
        const lastName = userData.last_name || '';
        const fullname = `${firstName} ${lastName}`.trim() || firstName;
        setUser(prev => ({
          ...prev,
          firstname: firstName,
          lastname: lastName,
          fullname: fullname,
          username: `@${userData.email?.split('@')[0] || 'user'}`,
          email: userData.email,
          role: userData.role,
          id: userData.id,
          avatar: userData.avatar || ''
        }));
        console.log('User info updated:', { firstName, lastName, fullname, email: userData.email });
      }
    } catch (err) { console.warn('Failed to fetch user info'); }
  };

  // -------- FETCH ASSETS & BALANCE --------
  const fetchAssetsAndBalance = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/assets`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const assetsData = data.assets.map(a => ({
          id: a.symbol,
          balance: a.holdings,
          locked: 0
        }));
        setAssets(assetsData);
        setUser(prev => ({ ...prev, balance_usd: data.cashBalance }));
        console.log('Assets and balance updated:', data);
      }
    } catch (err) { console.warn('Failed to fetch assets'); }
  };

  // -------- FETCH TRANSACTIONS --------
  const fetchTransactionsData = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/transactions`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const mapped = (data.transactions || []).map(t => ({
          id: t.id,
          title: t.type || 'Transaction',
          date: t.date || new Date().toLocaleDateString(),
          amount: t.amount || '',
          positive: t.amount?.startsWith('+') || false,
          icon: t.type === 'Investment' ? 'repeat' : 'arrow-up-right'
        }));
        setTransactions(mapped);
      }
    } catch (err) { console.warn('Failed to fetch transactions'); }
  };

  // -------- FETCH INVESTMENTS --------
  const fetchInvestmentsData = async () => {
    const token = localStorage.getItem('grayscale_token');
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/investments`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const mapped = (data.investments || []).map(inv => ({
          id: inv.id,
          asset: inv.asset,
          name: `${inv.asset} 7-Day Vault`,
          amount: inv.amount_invested || 0,
          apy: inv.profit_percent || '30%',
          daysLeft: Math.max(0, Math.ceil((new Date(inv.end_date) - new Date()) / (1000*60*60*24))),
          status: inv.status
        }));
        setInvestments(mapped);
      }
    } catch (err) { console.warn('Failed to fetch investments'); }
  };

  // -------- INITIAL FETCHES --------
  useEffect(() => {
    fetchUserInfo();
    fetchAssetsAndBalance();
    fetchTransactionsData();
    fetchInvestmentsData();

    refreshIntervalRef.current = setInterval(() => {
      fetchAssetsAndBalance();
      fetchTransactionsData();
      fetchInvestmentsData();
    }, 30000);

    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, []);

  // -------- PRICE TICKER --------
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        BTC: Math.max(1000, prev.BTC + (Math.random() - 0.49) * 35),
        ETH: Math.max(100, prev.ETH + (Math.random() - 0.49) * 2),
        SOL: Math.max(10, prev.SOL + (Math.random() - 0.49) * 0.8),
        USDT: Math.max(0.99, prev.USDT + (Math.random() - 0.49) * 0.001)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // -------- HELPERS --------
  const triggerToast = (msg) => { setToastMsg(msg); setToastVisible(true); setTimeout(() => setToastVisible(false), 3500); };
  const formatUSD = (val) => val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // -------- TABS & SUBTABS --------
  const switchTab = (tabId) => setCurrentTab(tabId);
  const switchSettingsSubtab = (subId) => setSettingsSubtab(subId);

  // -------- OTC SWAP (PERSISTENT VIA BACKEND) --------
  const calculateOtcTrade = () => {
    const sellPrice = prices[payAsset] || 1;
    const receivePrice = prices[getAsset] || 1;
    return ((payAmount || 0) * sellPrice) / receivePrice;
  };

  const swapOtcInputs = () => {
    setPayAsset(getAsset);
    setGetAsset(payAsset);
  };

  const executeOtcTrade = async () => {
    const sellObj = assets.find(a => a.id === payAsset);
    const receiveObj = assets.find(a => a.id === getAsset);
    if (payAsset === getAsset) return triggerToast('Please select two different assets.');
    if (!payAmount || payAmount <= 0) return triggerToast('Enter a valid amount.');
    if (!sellObj || payAmount > sellObj.balance) return triggerToast('Insufficient balance.');

    const receiveQty = (payAmount * (prices[payAsset] || 1)) / (prices[getAsset] || 1);
    
    try {
      const token = localStorage.getItem('grayscale_token');
      const res = await fetch(`${API_BASE}/api/trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          payAsset,
          getAsset,
          payAmount,
          receiveQty
        })
      });
      if (!res.ok) throw new Error('Failed to execute trade');
      const data = await res.json();
      triggerToast(data.message);
      await fetchAssetsAndBalance();
      await fetchTransactionsData();
    } catch (err) {
      console.error('Trade error:', err);
      triggerToast(err.message);
    }
  };

  // -------- DEPOSIT FLOW --------
  const handleDepositAssetChange = (e) => {
    const asset = e.target.value;
    setDepositAsset(asset);
    setDepositAddress(DEFAULT_ADDRESSES[asset]);
    setDepositQr(DEFAULT_QR_MAP[asset]);
  };

  const handleDepositAmountChange = (e) => setDepositAmount(e.target.value);

  const proceedToAddress = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      triggerToast('Please enter a valid amount.');
      return;
    }
    setDepositStep(2);
  };

  const copyDepositAddress = () => {
    const addr = depositAddress;
    if (addr) { navigator.clipboard.writeText(addr); triggerToast('Deposit address copied!'); setTransferMade(true); }
  };

  const submitDepositRequest = async () => {
    setSubmitLoading(true);
    try {
      const token = localStorage.getItem('grayscale_token');
      const res = await fetch(`${API_BASE}/api/deposits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ amount: parseFloat(depositAmount), asset: depositAsset })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit deposit request');
      }
      const data = await res.json();
      triggerToast(data.message);
      setDepositStep(3);
      setTransferMade(false);
    } catch (err) {
      console.error('Deposit submission error:', err);
      triggerToast(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const closeDepositModal = () => {
    setDepositModalOpen(false);
    setDepositStep(1);
    setDepositAmount('');
    setTransferMade(false);
    setSubmitLoading(false);
  };

  // -------- WITHDRAW FLOW --------
  const executeWithdrawal = async () => {
    const amt = parseFloat(withdrawAmount);
    const addr = withdrawAddress;
    const assetObj = assets.find(a => a.id === withdrawAsset);
    
    if (!addr) return triggerToast('Please enter a valid wallet address.');
    if (!amt || amt <= 0 || amt > (assetObj?.balance || 0)) return triggerToast('Insufficient liquid capital.');
    
    setWithdrawSubmitLoading(true);
    try {
      const token = localStorage.getItem('grayscale_token');
      const res = await fetch(`${API_BASE}/api/withdrawals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ amount: amt, asset: withdrawAsset, address: addr })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit withdrawal request');
      }
      const data = await res.json();
      triggerToast(data.message);
      setWithdrawModalOpen(false);
      setWithdrawAmount('');
      setWithdrawAddress('');
    } catch (err) {
      console.error('Withdrawal submission error:', err);
      triggerToast(err.message);
    } finally {
      setWithdrawSubmitLoading(false);
    }
  };

  // -------- INVESTMENT (API CALL) --------
  const confirmNewInvestment = async () => {
    const amt = parseFloat(document.getElementById('invest-amount-input')?.value || 0);
    const assetObj = assets.find(a => a.id === investAsset);
    if (!amt || amt <= 0 || amt > (assetObj?.balance || 0)) return triggerToast('Invalid investment amount.');
  if (amt < 500) return triggerToast('Minimum investment is $500');
    
    setInvestModalOpen(false);
    triggerToast('Processing investment...');
    try {
      const token = localStorage.getItem('grayscale_token');
      const res = await fetch(`${API_BASE}/api/investments/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ asset: investAsset, amount: amt })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to start investment');
      }
      const data = await res.json();
      triggerToast(data.message);
      await fetchAssetsAndBalance();
      await fetchInvestmentsData();
      await fetchTransactionsData();
    } catch (err) {
      console.error('Investment creation error:', err);
      triggerToast(err.message);
    }
  };

  // -------- UNLOCK INVESTMENT (API CALL) --------
  const unlockInvestment = async (invId) => {
    if (!confirm('Are you sure you want to withdraw this matured investment?')) return;
    try {
      const token = localStorage.getItem('grayscale_token');
      const res = await fetch(`${API_BASE}/api/investments/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ investmentId: invId })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to withdraw investment');
      }
      const data = await res.json();
      triggerToast(data.message);
      await fetchAssetsAndBalance();
      await fetchInvestmentsData();
      await fetchTransactionsData();
    } catch (err) {
      console.error('Investment unlock error:', err);
      triggerToast(err.message);
    }
  };

  const togglePrivacy = () => setIsPrivacyMasked(!isPrivacyMasked);

  // -------- PROFILE PICTURE (PERSISTENT VIA BACKEND) --------
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      try {
        const token = localStorage.getItem('grayscale_token');
        const res = await fetch(`${API_BASE}/api/user/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ avatar: dataUrl })
        });
        if (!res.ok) throw new Error('Failed to upload profile picture');
        const data = await res.json();
        setUser(prev => ({ ...prev, avatar: data.user.avatar }));
        triggerToast('Profile picture updated!');
      } catch (err) {
        console.error('Profile picture upload error:', err);
        triggerToast(err.message);
      }
    };
    reader.readAsDataURL(file);
  };

  // -------- DELETE ACCOUNT --------
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      triggerToast('Please type "DELETE" to confirm.');
      return;
    }
    triggerToast('Account deleted permanently.');
    setDeleteAccountModalOpen(false);
    if (onLogout) onLogout();
  };

  // -------- JSX RENDER --------
  const cryptoValue = assets.reduce((sum, a) => sum + ((a.balance || 0) + (a.locked || 0)) * (prices[a.id] || 0), 0);
  const totalNav = cryptoValue + (user.balance_usd || 0);

  return (
    <div className="min-h-screen bg-[#0c0a0f] text-slate-100 font-sans antialiased selection:bg-purple-500 selection:text-white flex flex-col overflow-x-hidden">
      
      {/* TOAST */}
      {toastVisible && (
        <div className="fixed bottom-24 md:bottom-8 right-6 z-[120] px-5 py-3.5 rounded-2xl bg-[#1d1729] border border-purple-500/40 text-xs font-bold text-slate-100 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-purple-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TOP MARQUEE TICKER - hidden on mobile */}
      <header className="hidden md:block bg-[#09070d]/90 border-b border-white/[0.06] text-[11px] font-mono py-2 overflow-hidden sticky top-0 z-50 backdrop-blur-md">
        <div className="flex whitespace-nowrap overflow-hidden relative">
          <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused]">
            <div className="flex items-center gap-8 px-4 text-slate-300 w-1/2">
              <div className="flex items-center gap-2 font-bold text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
                <span>GRAYSCALE INSTANT VAULT DESK</span>
              </div>
              <span className="text-slate-700">|</span>
              <span>BTC/USD: <strong className="text-white font-mono">${prices.BTC.toFixed(2)}</strong> <span className="text-emerald-400 font-bold">+2.45%</span></span>
              <span className="text-slate-700">|</span>
              <span>ETH/USD: <strong className="text-white font-mono">${prices.ETH.toFixed(2)}</strong> <span className="text-emerald-400 font-bold">+1.82%</span></span>
              <span className="text-slate-700">|</span>
              <span>SOL/USD: <strong className="text-white font-mono">${prices.SOL.toFixed(2)}</strong> <span className="text-emerald-400 font-bold">+4.12%</span></span>
              <span className="text-slate-700">|</span>
              <span>USDT/USD: <strong className="text-white font-mono">${prices.USDT.toFixed(4)}</strong> <span className="text-emerald-400">+0.01%</span></span>
              <span className="text-slate-700">|</span>
              <span>Vault Custody: <strong className="text-emerald-400">100% COLD QUORUM</strong></span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative md:h-screen md:max-h-screen">
        {/* DESKTOP SIDEBAR - hidden on mobile */}
        <aside className="w-64 bg-[#0e0b13] border-r border-white/[0.07] hidden md:flex flex-col justify-between flex-shrink-0 z-40 sticky top-0 h-[calc(100vh-33px)]">
          <div>
            <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/g.png" alt="Grayscale" className="w-10 h-10 rounded-2xl object-contain" />
                <div>
                  <div className="flex items-center gap-1.5"><span className="text-sm font-extrabold tracking-wider text-white">GRAYSCALE</span><span className="text-[9px] bg-purple-500/20 text-purple-400 font-bold px-1.5 py-0.5 rounded-md border border-purple-500/30">PRIME</span></div>
                  <p className="text-[10px] text-slate-400 font-medium">Wealth Vault & Asset Desk</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 mx-4 mt-5 rounded-2xl bg-[#171220] border border-white/[0.08] flex items-center justify-between cursor-pointer hover:border-slate-600 transition-colors group">
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="truncate"><div className="text-xs font-bold text-slate-100 truncate">Digital Prime Vault</div><div className="text-[10px] text-slate-400 font-mono">#GP-8820-LOCK</div></div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>

            <nav className="px-4 mt-6 space-y-1.5">
              <button onClick={() => switchTab('overview')} className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${currentTab === 'overview' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-glow' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}>
                <LayoutDashboard className="w-4.5 h-4.5" /><span>Executive Command</span>
              </button>
              <button onClick={() => switchTab('assets')} className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${currentTab === 'assets' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-glow' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}>
                <Wallet className="w-4.5 h-4.5" /><span>Portfolio Pairs</span>
              </button>
              <button onClick={() => switchTab('investments')} className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${currentTab === 'investments' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-glow' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}>
                <TrendingUp className="w-4.5 h-4.5 text-emerald-400" /><span>Active Investments</span><span className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">7D LOCK</span>
              </button>
              <button onClick={() => switchTab('trade')} className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${currentTab === 'trade' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-glow' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}>
                <Repeat className="w-4.5 h-4.5" /><span>OTC Trade Desk</span>
              </button>
              <button onClick={() => switchTab('activity')} className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${currentTab === 'activity' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-glow' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}>
                <Clock className="w-4.5 h-4.5" /><span>Settlement Log</span>
              </button>
              <button onClick={() => switchTab('settings')} className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${currentTab === 'settings' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-glow' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}>
                <Settings className="w-4.5 h-4.5" /><span>Profile & Settings</span>
              </button>
            </nav>
          </div>

          <div className="p-4 border-t border-white/[0.06]">
            <div onClick={() => switchTab('settings')} className="flex items-center justify-between p-2.5 rounded-2xl bg-[#171220] border border-white/[0.06] hover:border-slate-600 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img src={user.avatar} className="w-9 h-9 rounded-full object-cover border border-white/20" alt="User Profile" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">{user.firstname.charAt(0)}</div>
                )}
                <div className="truncate max-w-[110px]"><div className="text-xs font-bold text-white truncate">{user.fullname}</div><div className="text-[10px] text-slate-400 truncate">{user.username}</div></div>
              </div>
              <button onClick={() => switchTab('settings')} className="px-2.5 py-1 rounded-xl bg-white/10 text-[10px] font-bold text-white hover:bg-white/20 transition-colors flex-shrink-0">Edit</button>
            </div>
          </div>
        </aside>

        {/* MAIN CANVAS */}
        <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-33px)] overflow-y-auto pb-28 md:pb-8 w-full max-w-full">

          {/* TOP HEADER */}
          <header className="px-4 md:px-8 py-4 border-b border-white/[0.06] bg-[#0c0a0f]/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => switchTab('settings')}>
              {user.avatar ? (
                <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/40 shadow-md" alt="Avatar" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">{user.firstname.charAt(0)}</div>
              )}
              <div><div className="text-xs text-slate-400 font-medium flex items-center gap-1">Hi <span className="text-purple-400 font-bold">{user.firstname}</span>,</div><div className="text-sm font-extrabold text-white">Welcome Back!</div></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => { fetchUserInfo(); fetchAssetsAndBalance(); fetchTransactionsData(); fetchInvestmentsData(); }} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all" title="Refresh All Data">
                <RefreshCw className="w-4 h-4" /><span>Refresh</span>
              </button>
              <button onClick={() => switchTab('investments')} className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all">
                <Lock className="w-4 h-4" /><span>7-Day Lock Active</span>
              </button>
              {/* NOTIFICATION BUTTON WITH DROPDOWN - fixed mobile */}
              <div className="relative">
                <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2.5 rounded-full bg-[#1b1526] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/10 transition-colors relative">
                  <Bell className="w-4 h-4" />
                  {notifications.some(n => !n.read) && <span className="w-2 h-2 rounded-full bg-purple-500 absolute top-2 right-2 animate-pulse"></span>}
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] md:w-96 bg-[#1d1729] border border-white/[0.08] rounded-2xl p-4 shadow-2xl z-50 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-white/[0.08] pb-2 mb-2">
                      <h4 className="text-sm font-bold text-white">Notifications</h4>
                      <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} className="text-xs text-purple-400 hover:text-purple-300">Mark all read</button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                      {notifications.length === 0 ? <p className="text-xs text-slate-400 text-center py-4">No notifications</p> : notifications.map(n => (
                        <div key={n.id} className={`p-2 rounded-lg ${n.read ? 'opacity-60' : 'bg-purple-900/40 border border-purple-800/60'}`}>
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-slate-200">{n.title}</span>
                            <span className="text-[10px] text-slate-500">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => setDepositModalOpen(true)} className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xs transition-all shadow-purple-glow flex items-center gap-1.5">
                <Plus className="w-4 h-4" /><span>Deposit</span>
              </button>
              <button onClick={onLogout} className="p-2.5 rounded-full bg-[#1b1526] border border-white/[0.08] text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">

            {/* ===== TAB 1: OVERVIEW ===== */}
            {currentTab === 'overview' && (
              <div className="space-y-8">
                <div className="p-6 md:p-8 text-white relative overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-purple-600 to-indigo-800 shadow-[0_20px_40px_-15px_rgba(109,40,217,0.45)]">
                  <div className="relative z-10 flex flex-col space-y-6">
                    <div className="flex items-center justify-between">
                      <div><span className="text-xs md:text-sm font-medium opacity-90 tracking-wide uppercase">Total Portfolio Net Value</span><div className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight mt-1">{isPrivacyMasked ? '••••••••••' : `$${formatUSD(totalNav)}`}</div></div>
                      <button onClick={togglePrivacy} className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"><span className="text-white">{isPrivacyMasked ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</span></button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-2">
                      <button onClick={() => setDepositModalOpen(true)} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"><Plus className="w-5 h-5 text-purple-200" /></div><span className="text-[11px] font-bold tracking-tight">Deposit</span></button>
                      <button onClick={() => setWithdrawModalOpen(true)} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"><Send className="w-5 h-5" /></div><span className="text-[11px] font-bold tracking-tight">Withdraw</span></button>
                      <button onClick={() => switchTab('trade')} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"><ArrowRightLeft className="w-5 h-5" /></div><span className="text-[11px] font-bold tracking-tight">Trade OTC</span></button>
                      <button onClick={() => setInvestModalOpen(true)} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 rounded-2xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 flex items-center justify-center group-hover:scale-110 transition-transform"><TrendingUp className="w-5 h-5 text-emerald-300" /></div><div className="flex items-center gap-1"><span className="text-[11px] font-bold tracking-tight">Invest</span><span className="text-[9px] bg-emerald-500/40 text-emerald-100 font-extrabold px-1.5 py-0.2 rounded-md">7D</span></div></button>
                    </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between"><h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Supported Portfolio Pairs</h3><button onClick={() => switchTab('assets')} className="text-xs font-bold text-purple-400 hover:text-purple-300">Manage Assets</button></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {['BTC', 'ETH', 'SOL', 'USDT'].map(id => {
                      const asset = assets.find(a => a.id === id);
                      const price = prices[id] || 0;
                      const balance = asset?.balance || 0;
                      const val = balance * price;
                      return (
                        <div key={id} onClick={() => { setDepositAsset(id); setDepositModalOpen(true); }} className="p-4 rounded-2xl bg-[#14101d]/90 border border-white/[0.08] hover:border-purple-500/50 transition-all cursor-pointer flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform overflow-hidden">
                              <img src={ICON_MAP[id]} alt={id} className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                            </div>
                            <div><div className="text-xs font-extrabold text-white">{id}</div><div className="text-[10px] text-slate-400 font-mono">{balance.toFixed(4)} {id}</div></div>
                          </div>
                          <div className="text-right"><div className="text-xs font-bold font-mono text-white">${val > 0 ? formatUSD(val) : '$0.00'}</div><span className="text-[10px] font-bold text-emerald-400 font-mono">+0%</span></div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="fintech-card bg-[#15111b] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div><h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Active Vault Investments (7-Day Lock)</h3></div>
                    <button onClick={() => switchTab('investments')} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"><span>View All & Invest</span><ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {investments.length === 0 ? <p className="text-slate-500 text-xs italic col-span-2 text-center py-4">No active investments. Start your first 7-Day vault investment.</p> : investments.slice(0,2).map(inv => {
                      const progressPct = Math.min(100, Math.round(((7 - inv.daysLeft) / 7) * 100));
                      return (
                        <div key={inv.id} className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] relative overflow-hidden space-y-4">
                          <div className="flex items-center justify-between"><div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-1 overflow-hidden">
                              <img src={ICON_MAP[inv.asset]} alt={inv.asset} className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                            </div>
                            <div><h4 className="text-xs font-extrabold text-white">{inv.name}</h4><span className="text-[10px] text-slate-400 font-mono">ID: {inv.id} • {inv.apy} Yield</span></div>
                          </div><span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${inv.daysLeft <= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}`}>{inv.daysLeft <= 0 ? 'MATURED / READY' : inv.daysLeft + ' DAYS LOCKED'}</span></div>
                          <div className="space-y-1.5"><div className="flex justify-between text-xs"><span className="text-slate-400">Locked Stake:</span><span className="font-mono font-bold text-white">{inv.amount} {inv.asset}</span></div><div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10"><div className={`bg-gradient-to-r ${inv.daysLeft <= 0 ? 'from-emerald-500 to-teal-400' : 'from-purple-500 to-indigo-600'} h-full transition-all duration-500`} style={{ width: `${progressPct}%` }}></div></div></div>
                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]"><span className="text-[10px] text-slate-400 font-mono">7-Day Lock Cooldown</span>{inv.daysLeft <= 0 ? <button onClick={() => unlockInvestment(inv.id)} className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-[11px] hover:bg-emerald-400 transition-colors">Withdraw Liquid</button> : <span className="text-[10px] text-purple-400 font-mono flex items-center gap-1"><Lock className="w-3 h-3" /> Unlocks in {inv.daysLeft}d</span>}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cumulative Yield Earned</span><div className="text-2xl font-extrabold text-white font-mono">+$0.00</div><p className="text-xs text-emerald-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Net Blended Yield: 0.0% APY</p></div>
                  <div className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Liquid Capital</span><div className="text-2xl font-extrabold text-white font-mono">{isPrivacyMasked ? '••••••••' : `$${formatUSD(user.balance_usd || 0)}`}</div><p className="text-xs text-slate-400 font-medium">Available for Instant OTC Trade</p></div>
                  <div className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-2"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Withdrawal Lock Policy</span><div className="text-lg font-bold text-slate-100 flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /> 7-Day Vault Cooldown</div><p className="text-xs text-purple-400 font-medium">Secured by Cold Storage Timelock</p></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.06]">
                      <div><h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2"><CandlestickChart className="w-4 h-4 text-purple-400" /> Live Market Pairs Chart</h2><p className="text-xs text-slate-400">TradingView real-time feed</p></div>
                    </div>
                    <div className="w-full h-[360px] rounded-2xl overflow-hidden bg-black/40 border border-white/[0.05]">
                      <TradingViewWidget />
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] flex flex-col justify-between space-y-4">
                    <div className="pb-3 border-b border-white/[0.06]"><h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2"><PieChart className="w-4 h-4 text-emerald-400" /> Portfolio Allocation</h2><p className="text-xs text-slate-400">Supported Pairs Balance</p></div>
                    <div className="h-44 flex items-center justify-center my-auto">
                      <canvas ref={chartRef} id="allocationChart"></canvas>
                    </div>
                    <div className="space-y-2 text-xs">
                      {['BTC','ETH','SOL','USDT'].map(id => {
                        const a = assets.find(x => x.id === id);
                        const val = (a?.balance || 0) * (prices[id] || 0);
                        const colors = { BTC: 'bg-amber-500', ETH: 'bg-indigo-500', SOL: 'bg-cyan-500', USDT: 'bg-emerald-500' };
                        return (
                          <div key={id} className="flex justify-between items-center p-2 rounded-xl bg-white/[0.03]">
                            <span className="flex items-center gap-2 text-slate-300 font-medium"><span className={`w-2.5 h-2.5 rounded-full ${colors[id]}`}></span> {id}</span>
                            <span className="font-mono font-bold text-white">{val > 0 ? `$${formatUSD(val)}` : '$0.00'} (0%)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]"><h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Vault Settlement History</h3><button onClick={() => switchTab('activity')} className="text-xs font-bold text-purple-400 hover:text-purple-300">View Full Log</button></div>
                  <div className="space-y-3">
                    {transactions.length === 0 ? <p className="text-slate-500 text-center py-6 text-sm italic">No settlement records found.</p> : transactions.slice(0,3).map(tx => (
                      <div key={tx.id} className="p-3.5 rounded-2xl bg-black/30 border border-white/[0.05] flex items-center justify-between hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            {tx.icon === 'repeat' && <Repeat className="w-4 h-4" />}
                            {tx.icon === 'arrow-down-left' && <ArrowDownLeft className="w-4 h-4" />}
                            {tx.icon === 'arrow-up-right' && <ArrowUpRight className="w-4 h-4" />}
                          </div>
                          <div><div className="text-xs font-bold text-white">{tx.title}</div><div className="text-[10px] text-slate-400 font-mono">{tx.date}</div></div>
                        </div>
                        <div className={`text-right font-mono text-xs font-bold ${tx.positive ? 'text-emerald-400' : 'text-slate-200'}`}>{tx.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== TAB 2: ASSETS ===== */}
            {currentTab === 'assets' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div><h1 className="text-xl font-bold text-white">Supported Pairs Matrix</h1><p className="text-xs text-slate-400">Vault balances, daily yield APY, and 7-day withdrawal lock status</p></div>
                  <button onClick={() => setDepositModalOpen(true)} className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-purple-glow"><Plus className="w-4 h-4" /><span>Deposit Capital</span></button>
                </div>
                <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-black/30 border-b border-white/[0.06]">
                        <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-5">Pair / Asset</th>
                          <th className="py-4 px-5 text-right">Liquid Holdings</th>
                          <th className="py-4 px-5 text-right">7-Day Locked Staking</th>
                          <th className="py-4 px-5 text-right">Price (USD)</th>
                          <th className="py-4 px-5 text-right">APY Yield</th>
                          <th className="py-4 px-5 text-right">Total Value</th>
                          <th className="py-4 px-5 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04] text-xs">
                        {['BTC','ETH','SOL','USDT'].map(id => {
                          const a = assets.find(x => x.id === id);
                          const price = prices[id] || 0;
                          const liquid = a?.balance || 0;
                          const locked = a?.locked || 0;
                          const totalVal = (liquid + locked) * price;
                          return (
                            <tr key={id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 px-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-1 overflow-hidden">
                                    <img src={ICON_MAP[id]} alt={id} className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                                  </div>
                                  <div><div className="font-bold text-white">{id}</div><div className="text-[10px] text-slate-400">{id === 'BTC' ? 'Bitcoin' : id === 'ETH' ? 'Ethereum' : id === 'SOL' ? 'Solana' : 'Tether'}</div></div>
                                </div>
                              </td>
                              <td className="py-4 px-5 text-right font-mono font-bold text-white">{liquid.toFixed(4)} {id}</td>
                              <td className="py-4 px-5 text-right font-mono text-purple-400">{locked.toFixed(4)} {id}</td>
                              <td className="py-4 px-5 text-right font-mono text-slate-300">${price.toFixed(2)}</td>
                              <td className="py-4 px-5 text-right font-mono font-bold text-emerald-400">{id === 'BTC' ? '8.5%' : id === 'ETH' ? '9.8%' : id === 'SOL' ? '12.4%' : '10.2%'}</td>
                              <td className="py-4 px-5 text-right font-mono font-bold text-white">${totalVal > 0 ? formatUSD(totalVal) : '0.00'}</td>
                              <td className="py-4 px-5 text-center"><div className="flex items-center justify-center gap-2"><button onClick={() => { setDepositAsset(id); setDepositModalOpen(true); }} className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white transition-all text-[10px] font-bold">Deposit</button><button onClick={() => { setWithdrawAsset(id); setWithdrawModalOpen(true); }} className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-all text-[10px] font-bold">Withdraw</button></div></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== TAB 3: INVESTMENTS ===== */}
            {currentTab === 'investments' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div><h1 className="text-xl font-bold text-white">Active Vault Investments</h1><p className="text-xs text-slate-400">Hold, trade, or invest with mandatory 7-day timelock before withdrawal</p></div>
                  <button onClick={() => setInvestModalOpen(true)} className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-lg flex items-center gap-2"><Plus className="w-4 h-4" /><span>Start New Investment</span></button>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/40 via-[#191326] to-slate-900 border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5"><div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0 mt-0.5"><ShieldAlert className="w-5 h-5" /></div><div className="space-y-1"><h3 className="text-sm font-extrabold text-white">7-Day Vault Lock Protocol Active</h3><p className="text-xs text-slate-300 leading-relaxed max-w-2xl">To protect institutional yield, all new investments are subject to a strict <strong>7-day lock period</strong>. Once mature, capital and earned yield unlock automatically.</p></div></div>
                  <button onClick={() => setInvestModalOpen(true)} className="px-4 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs hover:bg-purple-500/30 transition-all flex-shrink-0">Stake & Earn Up to 12.4% APY</button>
                </div>
                <div className="space-y-4">
                  <h2 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2"><Layers className="w-4 h-4 text-emerald-400" /> Your Current Locked Positions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {investments.length === 0 ? <p className="text-slate-500 text-xs italic col-span-2 text-center py-6">You have no active locked positions. Start an investment today!</p> : investments.map(inv => {
                      const progressPct = Math.min(100, Math.round(((7 - inv.daysLeft) / 7) * 100));
                      return (
                        <div key={inv.id} className="p-5 rounded-2xl bg-[#15111b] border border-white/[0.08] relative overflow-hidden space-y-4">
                          <div className="flex items-center justify-between"><div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-1 overflow-hidden">
                              <img src={ICON_MAP[inv.asset]} alt={inv.asset} className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                            </div>
                            <div><h4 className="text-xs font-extrabold text-white">{inv.name}</h4><span className="text-[10px] text-slate-400 font-mono">ID: {inv.id} • {inv.apy} Yield</span></div>
                          </div><span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${inv.daysLeft <= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}`}>{inv.daysLeft <= 0 ? 'MATURED / READY' : inv.daysLeft + ' DAYS LOCKED'}</span></div>
                          <div className="space-y-1.5"><div className="flex justify-between text-xs"><span className="text-slate-400">Locked Stake:</span><span className="font-mono font-bold text-white">{inv.amount} {inv.asset}</span></div><div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10"><div className={`bg-gradient-to-r ${inv.daysLeft <= 0 ? 'from-emerald-500 to-teal-400' : 'from-purple-500 to-indigo-600'} h-full transition-all duration-500`} style={{ width: `${progressPct}%` }}></div></div></div>
                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]"><span className="text-[10px] text-slate-400 font-mono">7-Day Lock Cooldown</span>{inv.daysLeft <= 0 ? <button onClick={() => unlockInvestment(inv.id)} className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-[11px] hover:bg-emerald-400 transition-colors">Withdraw Liquid</button> : <span className="text-[10px] text-purple-400 font-mono flex items-center gap-1"><Lock className="w-3 h-3" /> Unlocks in {inv.daysLeft}d</span>}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ===== TAB 4: TRADE ===== */}
            {currentTab === 'trade' && (
              <div className="space-y-6">
                <div><h1 className="text-xl font-bold text-white">Institutional OTC Swap Desk</h1><p className="text-xs text-slate-400">Zero-slippage trade execution between BTC, ETH, SOL, and USDT</p></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-6">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2"><Repeat className="w-4 h-4 text-purple-400" /> Instant Pair Swap Engine</h2>
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2">
                        <div className="flex justify-between text-xs text-slate-400 font-semibold"><span>YOU PAY / SELL</span><span>Liquid Balance: <strong className="text-white font-mono">{(assets.find(a=>a.id===payAsset)?.balance||0).toFixed(4)} {payAsset}</strong></span></div>
                        <div className="flex items-center justify-between gap-3">
                          <input type="number" value={payAmount} onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)} className="bg-transparent text-2xl font-bold font-mono text-white outline-none w-full" placeholder="0.00" />
                          <select value={payAsset} onChange={(e) => setPayAsset(e.target.value)} className="bg-[#1e182a] text-white font-bold text-xs px-3 py-2 rounded-xl border border-white/10 outline-none cursor-pointer">
                            <option value="USDT">USDT (Tether)</option><option value="BTC">BTC (Bitcoin)</option><option value="ETH">ETH (Ethereum)</option><option value="SOL">SOL (Solana)</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-center -my-2"><button onClick={swapOtcInputs} className="w-10 h-10 rounded-full bg-purple-600 text-white border-4 border-[#0c0a0f] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><ArrowDownUp className="w-4 h-4" /></button></div>
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2">
                        <div className="flex justify-between text-xs text-slate-400 font-semibold"><span>YOU RECEIVE IN VAULT</span><span>Rate: <strong className="text-purple-400 font-mono">1 {payAsset} = ${(prices[payAsset]/(prices[getAsset]||1)).toFixed(4)} {getAsset}</strong></span></div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-2xl font-bold font-mono text-emerald-400">{calculateOtcTrade().toFixed(6)}</div>
                          <select value={getAsset} onChange={(e) => setGetAsset(e.target.value)} className="bg-[#1e182a] text-white font-bold text-xs px-3 py-2 rounded-xl border border-white/10 outline-none cursor-pointer">
                            <option value="BTC">BTC (Bitcoin)</option><option value="ETH">ETH (Ethereum)</option><option value="SOL">SOL (Solana)</option><option value="USDT">USDT (Tether)</option>
                          </select>
                        </div>
                      </div>
                      <button onClick={executeOtcTrade} className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-600 to-indigo-800 text-white font-black text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-purple-glow">Execute Instant OTC Trade</button>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-4">
                    <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Live Institutional Liquidity</h3>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="text-[10px] text-slate-500 flex justify-between uppercase"><span>Price (USD)</span><span>Size (BTC)</span></div>
                      <div className="flex justify-between text-red-400"><span>{(prices.BTC + 30).toFixed(2)}</span><span>42.50</span></div>
                      <div className="flex justify-between text-red-400"><span>{(prices.BTC + 15).toFixed(2)}</span><span>18.20</span></div>
                      <div className="py-2 border-y border-white/[0.08] text-center font-bold text-white text-sm">{prices.BTC.toFixed(2)} USD</div>
                      <div className="flex justify-between text-emerald-400"><span>{(prices.BTC - 5).toFixed(2)}</span><span>15.40</span></div>
                      <div className="flex justify-between text-emerald-400"><span>{(prices.BTC - 20).toFixed(2)}</span><span>38.10</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== TAB 5: ACTIVITY ===== */}
            {currentTab === 'activity' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between"><div><h1 className="text-xl font-bold text-white">Audited Settlement Registry</h1><p className="text-xs text-slate-400">Cryptographic audit history of deposits, investments, and OTC trades</p></div><button onClick={() => { alert('CSV downloaded'); }} className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-2 transition-colors"><Download className="w-4 h-4" /><span>Export CSV Audit Log</span></button></div>
                <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-3">
                  {transactions.length === 0 ? <p className="text-slate-500 text-center py-6 text-sm italic">No settlement records found.</p> : transactions.map(tx => (
                    <div key={tx.id} className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                          {tx.icon === 'repeat' && <Repeat className="w-5 h-5" />}
                          {tx.icon === 'arrow-down-left' && <ArrowDownLeft className="w-5 h-5" />}
                          {tx.icon === 'arrow-up-right' && <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div><div className="text-xs font-bold text-white">{tx.title}</div><div className="text-[10px] text-slate-400 font-mono">Timestamp: {tx.date} • Cryptographically Signed</div></div>
                      </div>
                      <div className={`font-mono text-xs font-bold ${tx.positive ? 'text-emerald-400' : 'text-slate-200'}`}>{tx.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== TAB 6: SETTINGS ===== */}
            {currentTab === 'settings' && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between pb-2"><button onClick={() => switchTab('overview')} className="w-10 h-10 rounded-full bg-[#1b1526] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button><h1 className="text-base font-extrabold text-white">Profile & Institutional Settings</h1><div className="w-10"></div></div>
                
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#140f1f] border border-white/[0.08] overflow-x-auto no-scrollbar">
                  <button onClick={() => switchSettingsSubtab('profile')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${settingsSubtab === 'profile' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>User Profile</button>
                  <button onClick={() => switchSettingsSubtab('security')} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${settingsSubtab === 'security' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Security & 2FA</button>
                  <button onClick={() => switchSettingsSubtab('apikeys')} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${settingsSubtab === 'apikeys' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>API & Webhooks</button>
                  <button onClick={() => switchSettingsSubtab('notifications')} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${settingsSubtab === 'notifications' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Notifications</button>
                  <button onClick={() => switchSettingsSubtab('statements')} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${settingsSubtab === 'statements' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Statements & Tax</button>
                </div>

                {/* PROFILE SUBPAGE */}
                {settingsSubtab === 'profile' && (
                  <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="relative group">
                        {user.avatar ? (
                          <img src={user.avatar} className="w-20 h-20 rounded-full object-cover border-4 border-purple-500/40 shadow-xl" alt="Profile" />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-purple-500/40">{user.firstname.charAt(0)}</div>
                        )}
                        <label className="absolute bottom-1 right-1 bg-white/20 backdrop-blur-md p-1.5 rounded-full cursor-pointer hover:bg-white/30 transition-colors">
                          <input type="file" accept="image/*" onChange={handleProfilePicUpload} className="hidden" />
                          <Plus className="w-4 h-4 text-white" />
                        </label>
                      </div>
                      <div className="space-y-1 text-center sm:text-left flex-1"><h2 className="text-lg font-extrabold text-white">{user.fullname}</h2><p className="text-xs text-purple-400 font-mono">{user.username}</p><p className="text-[11px] text-slate-400">Institutional Prime Account Holder • Tier 1 Verified</p></div>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); setUser(prev => ({ ...prev, fullname: document.getElementById('edit-profile-fullname').value, username: document.getElementById('edit-profile-username').value })); triggerToast('Profile updated successfully!'); }} className="space-y-4 pt-4 border-t border-white/[0.08]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Full Name</label><input id="edit-profile-fullname" type="text" defaultValue={user.fullname} className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500" /></div>
                      <div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Username</label><input id="edit-profile-username" type="text" defaultValue={user.username} className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500" /></div></div>
                      <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-purple-glow hover:opacity-90 transition-all">Save Profile Changes</button>
                    </form>
                  </div>
                )}

                {/* SECURITY SUBPAGE */}
                {settingsSubtab === 'security' && (
                  <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-6">
                    <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Two-Factor Authentication & Password</h2>
                    <form onSubmit={(e) => { e.preventDefault(); triggerToast('Security Password updated successfully!'); }} className="space-y-4">
                      <div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Current Security Password</label><input type="password" required placeholder="••••••••••••" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500" /></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">New Password</label><input type="password" required placeholder="Enter strong password" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500" /></div>
                      <div className="space-y-1.5"><label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Confirm New Password</label><input type="password" required placeholder="Re-enter password" className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500" /></div></div>
                      <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 text-white font-extrabold text-xs hover:bg-purple-500 transition-colors">Update Account Password</button>
                    </form>
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between"><div><h3 className="text-xs font-bold text-white">Hardware YubiKey / TOTP 2FA</h3><p className="text-[11px] text-slate-400">Require authenticator code on withdrawals</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label></div>
                  </div>
                )}

                {/* API KEYS SUBPAGE */}
                {settingsSubtab === 'apikeys' && (
                  <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-6">
                    <div className="flex items-center justify-between"><div><h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Institutional API Keys</h2><p className="text-xs text-slate-400">Programmatic REST & WebSocket access keys</p></div><button onClick={() => { const newKey = { id: 'KEY-' + Math.floor(Math.random()*9000), name: 'New Institutional Bot', key: 'gp_live_' + Math.random().toString(36).substring(2, 18), created: new Date().toISOString().split('T')[0] }; setApiKeys(prev => [newKey, ...prev]); triggerToast('Generated new API Key.'); }} className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-xs font-bold text-white hover:opacity-90 transition-opacity">+ Generate New Key</button></div>
                    <div className="space-y-3">
                      {apiKeys.length === 0 ? <p className="text-slate-500 text-xs italic text-center py-4">No API keys generated yet.</p> : apiKeys.map(k => (
                        <div key={k.id} className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                          <div><h4 className="text-xs font-bold text-white">{k.name}</h4><p className="text-[10px] text-slate-400 font-mono mt-0.5">Key: {k.key} • Created: {k.created}</p></div>
                          <button onClick={() => { navigator.clipboard.writeText(k.key); triggerToast('API Key copied to clipboard'); }} className="px-3 py-1.5 rounded-lg bg-white/10 text-[10px] font-bold text-white hover:bg-white/20">Copy Key</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS SUBPAGE */}
                {settingsSubtab === 'notifications' && (
                  <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-4 divide-y divide-white/[0.08]">
                    <div className="pb-3"><h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Notification Dispatch Rules</h2><p className="text-xs text-slate-400">Manage email, push, and SMS alerts</p></div>
                    <div className="pt-4 flex items-center justify-between"><div><h4 className="text-xs font-bold text-white">Daily Yield & Staking Payouts</h4><p className="text-[10px] text-slate-400">Receive notifications when 7-day yields are credited</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label></div>
                    <div className="pt-4 flex items-center justify-between"><div><h4 className="text-xs font-bold text-white">Instant OTC Trade Confirmations</h4><p className="text-[10px] text-slate-400">Send cryptographic trade receipts to email</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label></div>
                  </div>
                )}

                {/* STATEMENTS SUBPAGE */}
                {settingsSubtab === 'statements' && (
                  <div className="p-6 rounded-2xl bg-[#15111b] border border-white/[0.08] space-y-4">
                    <div><h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Account Statements & Tax Records</h2><p className="text-xs text-slate-400">Download formatted CSV reports for accounting and compliance</p></div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center"><FileSpreadsheet className="w-5 h-5" /></div><div><h4 className="text-xs font-bold text-white">Comprehensive Vault Activity Statement</h4><p className="text-[10px] text-slate-400">All deposits, 7-day locks, yields, and OTC trades</p></div></div>
                      <button onClick={() => { alert('CSV downloaded'); }} className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white transition-all text-xs font-bold">Download CSV</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ===== MOBILE DOCK ===== */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
        <div className="p-2 flex items-center justify-around rounded-[9999px] bg-[#17121d]/90 backdrop-blur-xl border border-white/[0.12] shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          <button onClick={() => switchTab('overview')} className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all text-xs ${currentTab === 'overview' ? 'bg-white text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:text-white'}`}>
            <Home className="w-4 h-4" /><span>Home</span>
          </button>
          <button onClick={() => switchTab('investments')} className={`flex items-center justify-center p-3 rounded-full transition-colors ${currentTab === 'investments' ? 'text-purple-400' : 'text-slate-300 hover:text-white'}`}>
            <TrendingUp className="w-5 h-5" />
          </button>
          <button onClick={() => switchTab('trade')} className={`flex items-center justify-center p-3 rounded-full transition-colors ${currentTab === 'trade' ? 'text-purple-400' : 'text-slate-300 hover:text-white'}`}>
            <ArrowRightLeft className="w-5 h-5" />
          </button>
          <button onClick={() => switchTab('settings')} className={`flex items-center justify-center p-3 rounded-full transition-colors ${currentTab === 'settings' ? 'text-purple-400' : 'text-slate-300 hover:text-white'}`}>
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ===== MODALS ===== */}
      {/* DEPOSIT MODAL - STEPPED FLOW */}
      {depositModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 space-y-5 rounded-2xl bg-[#15111b] border border-white/10 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-black text-white tracking-widest uppercase flex items-center gap-2">DEPOSIT ASSETS</h3>
              <button onClick={closeDepositModal} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            {/* Step 1: Amount and Asset */}
            {depositStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Select Deposit Pair</label>
                  <select value={depositAsset} onChange={handleDepositAssetChange} className="w-full bg-[#181324] text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/15 outline-none focus:border-purple-500 appearance-none cursor-pointer">
                    <option value="BTC">Bitcoin (BTC) Vault Address</option>
                    <option value="ETH">Ethereum (ETH) ERC20 Address</option>
                    <option value="SOL">Solana (SOL) Mainnet Address</option>
                    <option value="USDT">Tether (USDT) TRC20/ERC20 Address</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Amount to Deposit</label>
                  <input type="number" step="any" min="0" value={depositAmount} onChange={handleDepositAmountChange} placeholder="Enter amount" className="w-full bg-[#181324] text-white font-mono text-lg font-bold px-4 py-3 rounded-xl border border-white/15 outline-none focus:border-purple-500" />
                </div>
                <button onClick={proceedToAddress} className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-purple-500 transition-colors shadow-purple-glow">Continue to Address</button>
              </div>
            )}

            {/* Step 2: Show Address and Submit */}
            {depositStep === 2 && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#0e0a14] border border-white/[0.08] flex flex-col items-center justify-center gap-3 my-2">
                  <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-inner flex items-center justify-center relative overflow-hidden">
                    <img src={depositQr} alt={`${depositAsset} QR Code`} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">[{depositAsset} Vault Network SegWit]</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400"><span>DEPOSIT ADDRESS</span><span className="text-purple-400">INSTANT CREDIT</span></div>
                  <div className="p-3.5 rounded-xl bg-[#09070d] border border-white/15 flex items-center justify-between gap-2 cursor-pointer">
                    <span className="font-mono text-xs text-slate-200 font-semibold truncate select-all">{depositAddress}</span>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <button onClick={copyDepositAddress} className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors">Copy Address & Confirm</button>
                  {transferMade && (
                    <button onClick={submitDepositRequest} disabled={submitLoading} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors">
                      {submitLoading ? 'Submitting...' : 'I Have Made The Transfer'}
                    </button>
                  )}
                </div>
                <button onClick={() => setDepositStep(1)} className="w-full py-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white text-xs font-bold">← Go Back to Amount</button>
              </div>
            )}

            {/* Step 3: Submitted successfully */}
            {depositStep === 3 && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Deposit Request Submitted</h3>
                <p className="text-xs text-slate-400">Your deposit of {depositAmount} {depositAsset} has been submitted for admin approval. You will be notified once it is confirmed.</p>
                <button onClick={closeDepositModal} className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors">Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL - NEW FLOW (submits request) */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 space-y-5 rounded-2xl bg-[#15111b] border border-white/10 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-black text-white tracking-widest uppercase flex items-center gap-2"><ArrowUpRight className="w-4 h-4 text-purple-400" /> WITHDRAW CUSTODIAL FUNDS</h3>
              <button onClick={() => setWithdrawModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5"><label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Select Asset Pair</label>
                <select value={withdrawAsset} onChange={(e) => setWithdrawAsset(e.target.value)} className="w-full bg-[#181324] text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/15 outline-none focus:border-purple-500 cursor-pointer">
                  <option value="BTC">Bitcoin (BTC)</option><option value="ETH">Ethereum (ETH)</option><option value="SOL">Solana (SOL)</option><option value="USDT">Tether (USDT)</option>
                </select>
              </div>
              <div className="space-y-1.5"><label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Recipient Wallet Address</label>
                <input value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} type="text" placeholder="Paste external address (e.g. 0x... or 13G...)" className="w-full bg-[#181324] text-white font-mono text-xs px-4 py-3 rounded-xl border border-white/15 outline-none focus:border-purple-500" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-extrabold text-slate-300 uppercase tracking-wider"><span>Amount</span><span className="text-slate-400">Available Liquid: <strong className="text-emerald-400 font-mono">{(assets.find(a=>a.id===withdrawAsset)?.balance||0).toFixed(4)} {withdrawAsset}</strong></span></div>
                <div className="relative"><input value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} type="number" step="any" placeholder="0.00" className="w-full bg-[#181324] text-white font-mono text-lg font-bold px-4 py-3 rounded-xl border border-white/15 outline-none focus:border-purple-500" /><span className="absolute right-4 top-4 text-xs font-bold font-mono text-slate-400">{withdrawAsset}</span></div>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] font-mono space-y-1 text-slate-300">
                <div className="flex items-center gap-1.5 font-bold text-purple-400"><Lock className="w-3.5 h-3.5" /><span>7-Day Withdrawal Policy Enforced</span></div>
                <p className="text-[10px] text-slate-400">Only liquid non-invested funds can be withdrawn immediately. Invested funds require 7-day maturity.</p>
              </div>
              <button onClick={executeWithdrawal} disabled={withdrawSubmitLoading} className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-purple-glow">
                {withdrawSubmitLoading ? 'Submitting...' : 'Submit Withdrawal Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVESTMENT MODAL */}
      {investModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 space-y-5 rounded-2xl bg-[#15111b] border border-white/10 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-black text-white tracking-widest uppercase flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400" /> START 7-DAY VAULT INVESTMENT</h3>
              <button onClick={() => setInvestModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5"><label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Choose Asset Pair</label>
                <select id="invest-asset-select" value={investAsset} onChange={(e) => setInvestAsset(e.target.value)} className="w-full bg-[#181324] text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/15 outline-none focus:border-emerald-500 cursor-pointer">
                  <option value="BTC">Bitcoin (BTC) - Yield: 8.5% APY</option>
                  <option value="ETH">Ethereum (ETH) - Yield: 9.8% APY</option>
                  <option value="SOL">Solana (SOL) - Yield: 12.4% APY</option>
                  <option value="USDT">Tether (USDT) - Yield: 10.2% APY</option>
                </select>
              </div>
              <div className="space-y-1.5"><div className="flex justify-between text-[11px] font-extrabold text-slate-300 uppercase tracking-wider"><span>Investment Amount</span><button onClick={() => { const a = assets.find(x=>x.id===investAsset); document.getElementById('invest-amount-input').value = a?.balance || 0; }} className="text-emerald-400 hover:underline">MAX LIQUID</button></div>
                <input id="invest-amount-input" type="number" step="any" placeholder="1000" className="w-full bg-[#181324] text-white font-mono text-lg font-bold px-4 py-3 rounded-xl border border-white/15 outline-none focus:border-emerald-500" />
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-2 text-xs">
                <div className="flex justify-between text-slate-400"><span>Lock Duration:</span><strong className="text-white font-mono">7 Days (Fixed Cooldown)</strong></div>
                <div className="flex justify-between text-slate-400"><span>Estimated APY Yield:</span><strong className="text-emerald-400 font-mono">{(investAsset === 'BTC' ? '8.5%' : investAsset === 'ETH' ? '9.8%' : investAsset === 'SOL' ? '12.4%' : '10.2%')} APY</strong></div>
                <div className="flex justify-between text-slate-400"><span>Maturity Date:</span><strong className="text-white font-mono">In 7 Days</strong></div>
              </div>
              <button onClick={confirmNewInvestment} className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg">Lock Funds & Start Earning</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {deleteAccountModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 space-y-5 rounded-2xl bg-[#15111b] border border-white/10 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-black text-red-400 tracking-widest uppercase">DELETE ACCOUNT</h3>
              <button onClick={() => setDeleteAccountModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-slate-400">This action is permanent. All your data will be erased from the vault.</p>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Type "DELETE" to confirm</label>
                <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} placeholder="DELETE" className="w-full bg-[#181324] text-white text-xs px-4 py-3 rounded-xl border border-red-500/30 outline-none focus:border-red-500" />
              </div>
              <button onClick={handleDeleteAccount} className="w-full py-3.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-xs hover:bg-red-600/30 transition-colors">Permanently Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
