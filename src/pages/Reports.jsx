import { Link } from 'react-router-dom';

export default function Reports() {
  const reports = [
    { title: 'Q3 2026 Digital Asset Performance Review', type: 'Quarterly', date: 'October 2026', pages: 42, summary: 'An exhaustive analysis of market performance during Q3, highlighting Bitcoin\'s correlation to macro rates and the explosive growth of Solana staking yields.' },
    { title: 'Annual Report on Crypto Asset Management', type: 'Annual', date: 'August 2026', pages: 120, summary: 'Our flagship annual publication detailing the evolution of the crypto asset class, regulatory landscape changes, and Grayscale\'s strategic expansion into new verticals.' },
    { title: 'The Institutional Crypto Treasury Playbook', type: 'Special Report', date: 'July 2026', pages: 65, summary: 'A step-by-step guide for CFOs and treasurers on how to allocate corporate reserves into Bitcoin and Ethereum using regulated ETF structures.' },
    { title: 'Staking Economics: A Deep Dive into Validator Yields', type: 'Research Paper', date: 'June 2026', pages: 34, summary: 'Detailed modeling of staking returns across Proof-of-Stake networks, including Ethereum, Solana, and Avalanche, with considerations for slashing risks and MEV extraction.' }
  ];

  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center space-x-2"><i className="fa-solid fa-arrow-left"></i> <span>Visit grayscale.com</span></Link>
          <h1 className="text-4xl sm:text-5xl font-light">Institutional Research Reports</h1>
          <p className="text-gray-300 text-base max-w-2xl font-light">Access the world's most comprehensive library of institutional-grade crypto research, produced by our in-house team of quantitative analysts and blockchain engineers.</p>
        </div>
      </div>
      <div className="bg-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {reports.map((r, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition group flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent border border-brand-accent/20 bg-brand-accent/5 px-2 py-1 rounded">{r.type}</span><span className="text-xs text-gray-400">{r.date}</span></div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-purple transition">{r.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{r.summary}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{r.pages} pages</p>
                </div>
                <button className="mt-6 w-full py-2.5 border border-brand-purple text-brand-purple text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-purple hover:text-white transition">Download PDF</button>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center">
            <h3 className="text-lg font-semibold text-brand-purple">Subscribe to the Grayscale Research Feed</h3>
            <p className="text-xs text-gray-600 mt-2 max-w-xl mx-auto">Get the latest reports, market commentary, and data insights delivered directly to your inbox. Unsubscribe at any time.</p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your work email" className="flex-1 p-3 border border-gray-300 rounded text-xs focus:border-brand-purple focus:outline-none" />
              <button className="bg-brand-accent text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-brand-accentHover transition">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
