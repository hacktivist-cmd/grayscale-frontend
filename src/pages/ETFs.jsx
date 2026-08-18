import { Link } from 'react-router-dom';
import { useState } from 'react';

const ETF_PRODUCTS = [
  { name: "Grayscale Bitcoin Mini Trust ETF", ticker: "BTC", strategy: "Single Asset", nav: "$27.81", aum: "$3,776M", date: "08/14/2026", expense: "0.15%" },
  { name: "Grayscale Ethereum Staking Mini ETF", ticker: "ETH", strategy: "Single Asset", nav: "$17.93", aum: "$1,597M", date: "08/14/2026", expense: "0.20%" },
  { name: "Grayscale Hyperliquid Staking ETF", ticker: "HYPG", strategy: "Single Asset", nav: "$19.66", aum: "$15M", date: "08/14/2026", expense: "0.29%" },
  { name: "Grayscale Solana Staking ETF", ticker: "GSOL", strategy: "Single Asset", nav: "$5.67", aum: "$998.7M", date: "08/14/2026", expense: "0.25%" },
  { name: "Grayscale Tether Trust ETF", ticker: "USDT", strategy: "Single Asset", nav: "$1.00", aum: "$105M", date: "08/14/2026", expense: "0.10%" },
  { name: "Grayscale XRP Trust ETF", ticker: "GXRP", strategy: "Single Asset", nav: "$19.34", aum: "$55.51M", date: "08/14/2026", expense: "0.50%" },
  { name: "Grayscale Cardano Trust ETF", ticker: "ADA", strategy: "Single Asset", nav: "$0.35", aum: "$10M", date: "08/14/2026", expense: "0.65%" },
  { name: "Grayscale Polkadot Trust ETF", ticker: "DOT", strategy: "Single Asset", nav: "$4.52", aum: "$20M", date: "08/14/2026", expense: "0.60%" }
];

export default function ETFs() {
  const [etfStrategy, setEtfStrategy] = useState('ALL');
  const [etfSearch, setEtfSearch] = useState('');

  const filtered = ETF_PRODUCTS.filter(p => {
    const matchStrategy = etfStrategy === 'ALL' || p.strategy === etfStrategy;
    const matchQuery = p.name.toLowerCase().includes(etfSearch.toLowerCase()) || p.ticker.toLowerCase().includes(etfSearch.toLowerCase());
    return matchStrategy && matchQuery;
  });

  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center space-x-2"><i className="fa-solid fa-arrow-left"></i> <span>Visit grayscale.com</span></Link>
          <h1 className="text-4xl sm:text-5xl font-light">Grayscale ETFs & ETPs</h1>
          <p className="text-lg text-gray-300 max-w-2xl font-light">Curated exposure to cryptocurrencies and the digital economy through regulated, transparent, and liquid SEC-registered exchange-traded products.</p>
          <Link to="/login" className="bg-white text-brand-purple text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-gray-200 transition inline-block">START INVESTING</Link>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-brand-lightPurple/10 p-6 rounded-lg border border-brand-border/20">
              <h3 className="text-sm font-bold text-brand-purple uppercase tracking-wider">Why Grayscale ETFs?</h3>
              <ul className="mt-3 space-y-2 text-xs text-gray-700 leading-relaxed">
                <li><strong>Regulatory Excellence:</strong> All products are filed with the SEC under the Securities Act of 1933, providing institutional-grade investor protections.</li>
                <li><strong>Deep Liquidity:</strong> Our ETFs trade on major U.S. exchanges with tight bid-ask spreads, ensuring efficient price discovery and seamless execution.</li>
                <li><strong>Transparent Pricing:</strong> Real-time NAV calculations published daily alongside the market price, ensuring you always know the true intrinsic value of your holdings.</li>
                <li><strong>Cost-Effective Exposure:</strong> Industry-leading gross management fees significantly lower than the average crypto fund, maximizing your net returns.</li>
              </ul>
            </div>
            <div className="bg-brand-lightPurple/10 p-6 rounded-lg border border-brand-border/20">
              <h3 className="text-sm font-bold text-brand-purple uppercase tracking-wider">Eligibility & Access</h3>
              <p className="mt-3 text-xs text-gray-700 leading-relaxed">
                Grayscale ETFs are available to all U.S. investors via traditional brokerage accounts, retirement accounts (IRAs), and institutional prime brokerage platforms. There is no accreditation requirement, making digital assets accessible to the entire investing public through trusted, familiar financial infrastructure.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-light text-gray-900">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['BTC','ETH','HYPG'].map(t => {
              const p = ETF_PRODUCTS.find(x => x.ticker === t);
              return (
                <div key={t} className="bg-gray-50 border border-gray-200 p-6 rounded flex justify-between items-center hover:shadow-lg transition cursor-pointer" onClick={() => window.location.href='/login'}>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-gray-500">ETF</span>
                    <h3 className="text-3xl font-black text-brand-purple">{p.ticker}</h3>
                    <p className="text-xs font-medium text-gray-700 max-w-[160px]">{p.name}</p>
                    <div className="pt-4 text-xl font-bold text-gray-900">{p.nav}</div>
                    <div className="text-[10px] text-gray-500">Expense Ratio: {p.expense}</div>
                  </div>
                  <div className="w-20 h-20 relative flex items-center justify-center shrink-0">
                    <img src={`/${t.toLowerCase()}.png`} alt={t} className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-3xl font-light text-gray-900">Showing {filtered.length} ETFs/ETPs</h2>
            <div className="flex flex-wrap items-center gap-4">
              <select value={etfStrategy} onChange={(e) => setEtfStrategy(e.target.value)} className="bg-gray-50 border border-gray-300 text-xs font-bold uppercase tracking-wider text-gray-700 px-4 py-2.5 rounded focus:outline-none focus:border-brand-purple">
                <option value="ALL">STRATEGY: ALL</option>
                <option value="Single Asset">SINGLE ASSET</option>
                <option value="Equity">EQUITY</option>
                <option value="Income">INCOME</option>
                <option value="Multi-Asset">MULTI-ASSET</option>
              </select>
              <input type="text" value={etfSearch} onChange={(e) => setEtfSearch(e.target.value)} placeholder="Search by ticker or name" className="bg-gray-50 border border-gray-300 pl-8 pr-4 py-2 text-xs rounded focus:outline-none focus:border-brand-purple w-48 sm:w-64" />
            </div>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead><tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase border-b border-gray-200 tracking-wider"><th className="py-3.5 px-4">PRODUCT NAME</th><th className="py-3.5 px-4">TICKER</th><th className="py-3.5 px-4">STRATEGY</th><th className="py-3.5 px-4">EXPENSE RATIO</th><th className="py-3.5 px-4">NAV PER SHARE</th><th className="py-3.5 px-4">AUM</th><th className="py-3.5 px-4">AS OF DATE</th><th className="py-3.5 px-4"></th></tr></thead>
              <tbody className="divide-y divide-gray-200 text-xs text-gray-800">
                {filtered.map(p => (
                  <tr key={p.ticker} className="hover:bg-purple-50/50 transition cursor-pointer" onClick={() => window.location.href='/login'}>
                    <td className="py-4 px-4 font-bold text-brand-purple hover:underline">{p.name}</td>
                    <td className="py-4 px-4 font-semibold text-gray-700">{p.ticker}</td>
                    <td className="py-4 px-4 font-medium text-gray-600">{p.strategy}</td>
                    <td className="py-4 px-4 font-medium text-gray-600">{p.expense}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{p.nav}</td>
                    <td className="py-4 px-4 font-medium text-gray-700">{p.aum}</td>
                    <td className="py-4 px-4 text-gray-400">{p.date}</td>
                    <td className="py-4 px-4 text-right"><i className="fa-solid fa-chevron-right text-xs text-gray-400"></i></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h4 className="text-sm font-bold text-brand-purple uppercase tracking-wider mb-2">Important Risk Disclosure</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Investing in Grayscale ETFs involves substantial risk, including the potential for complete loss of principal. The value of the underlying digital assets is highly volatile and can fluctuate dramatically based on market sentiment, regulatory changes, and technological shifts. Past performance does not guarantee future results. Please carefully review the prospectus and consider your investment objectives, risk tolerance, and financial circumstances before investing. Grayscale Advisors, LLC is an SEC-registered investment adviser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
