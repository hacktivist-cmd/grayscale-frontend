import { Link } from 'react-router-dom';

const PUBLIC_FUNDS = [
  { name: "Grayscale Basic Attention Token Trust", ticker: "GBAT", aum: "$1.43M", price: "$0.60", nav: "$0.50", inception: "2020" },
  { name: "Grayscale Bitcoin Cash Trust", ticker: "BCHG", aum: "$78.6M", price: "$1.47", nav: "$1.67", inception: "2017" },
  { name: "Grayscale Bittensor Trust", ticker: "GTAO", aum: "$9.46M", price: "$5.07", nav: "$3.82", inception: "2024" }
];

export default function PublicFunds() {
  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center space-x-2"><i className="fa-solid fa-arrow-left"></i> <span>Visit grayscale.com</span></Link>
          <h1 className="text-4xl font-light">Publicly Traded Funds</h1>
          <p className="text-gray-300 text-sm">Explore Grayscale's publicly traded funds, available in brokerage and retirement accounts, providing diversified exposure to the digital asset ecosystem.</p>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-bold text-brand-purple uppercase tracking-wider">What are Publicly Traded Funds?</h3>
              <p className="mt-3 text-xs text-gray-700 leading-relaxed">
                Grayscale's publicly traded funds are investment vehicles that trade on the OTCQX® Best Market. They provide traditional investors with exposure to specific digital assets without the need to manage private keys or navigate complex crypto exchanges. These funds combine the security of a traditional investment structure with the growth potential of the digital economy.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-bold text-brand-purple uppercase tracking-wider">Key Benefits</h3>
              <ul className="mt-3 space-y-1.5 text-xs text-gray-700 leading-relaxed list-disc pl-4">
                <li><strong>Liquidity:</strong> Trade seamlessly during market hours through your existing brokerage account.</li>
                <li><strong>Transparency:</strong> Daily NAV calculations and full public disclosures ensure you are always informed.</li>
                <li><strong>Ease of Access:</strong> No specialized wallets or custody setup required. Buy and sell with a few clicks.</li>
                <li><strong>Tax Efficiency:</strong> Treated as securities, offering favorable tax treatment compared to direct crypto holdings in many jurisdictions.</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <div className="flex space-x-6 text-xs font-bold uppercase tracking-wider text-gray-500"><span className="text-brand-purple border-b-2 border-brand-purple pb-4 -mb-4">ALL</span></div>
            <span className="text-xs text-gray-400">As of 08/13/2026</span>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead><tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase border-b border-gray-200 tracking-wider"><th className="py-3.5 px-4">NAME</th><th className="py-3.5 px-4">TICKER</th><th className="py-3.5 px-4">INCEPTION</th><th className="py-3.5 px-4">AUM</th><th className="py-3.5 px-4">MARKET PRICE/SHARE</th><th className="py-3.5 px-4">NAV PER SHARE</th><th className="py-3.5 px-4">ACTION</th></tr></thead>
              <tbody className="divide-y divide-gray-200 text-xs text-gray-800">
                {PUBLIC_FUNDS.map(p => (
                  <tr key={p.ticker} className="hover:bg-purple-50/50 transition">
                    <td className="py-4 px-4 font-bold text-brand-purple">{p.name}</td>
                    <td className="py-4 px-4 font-semibold text-gray-700">{p.ticker}</td>
                    <td className="py-4 px-4 text-gray-700">{p.inception}</td>
                    <td className="py-4 px-4 text-gray-700">{p.aum}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{p.price}</td>
                    <td className="py-4 px-4 text-gray-700">{p.nav}</td>
                    <td className="py-4 px-4"><Link to="/login" className="bg-brand-accent text-white font-bold text-[10px] uppercase px-4 py-2 rounded hover:bg-brand-accentHover transition inline-block">INVEST NOW</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h4 className="text-sm font-bold text-brand-purple uppercase tracking-wider mb-2">Regulatory Oversight & Reporting</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              All publicly traded funds offered by Grayscale are registered with the SEC and comply with the reporting requirements of the Securities Exchange Act of 1934. We provide quarterly financial statements, annual audits, and continuous disclosure filings to ensure the highest standards of corporate governance and investor protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
