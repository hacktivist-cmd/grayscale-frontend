import { Link } from 'react-router-dom';

const PRIVATE_FUNDS = [
  { name: "Grayscale Aave Trust", status: "Open", aum: "$0.65M", holding: "12 Months", nav: "$8.36", minInv: "$25,000" },
  { name: "Grayscale Basic Attention Token Trust", status: "Open", aum: "$1.43M", holding: "12 Months", nav: "$0.50", minInv: "$25,000" }
];

export default function PrivateFunds() {
  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center space-x-2"><i className="fa-solid fa-arrow-left"></i> <span>Visit grayscale.com</span></Link>
          <h1 className="text-4xl font-light">Private Funds</h1>
          <p className="text-gray-300 text-sm">Exclusive access to Grayscale's private funds, available solely to eligible accredited investors and institutional entities seeking bespoke digital asset allocations.</p>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-bold text-brand-purple uppercase tracking-wider">Eligibility & Accreditation</h3>
              <p className="mt-3 text-xs text-gray-700 leading-relaxed">
                Participation in Grayscale's Private Funds is strictly limited to "Accredited Investors" as defined under Rule 501(a) of Regulation D of the Securities Act of 1933. This includes individuals with a net worth exceeding $1 million (excluding primary residence), individuals earning over $200,000 annually, and institutional entities with assets exceeding $5 million. This ensures that all participants possess the financial sophistication required to evaluate the inherent risks of digital asset investing.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-bold text-brand-purple uppercase tracking-wider">The Private Placement Process</h3>
              <ul className="mt-3 space-y-1.5 text-xs text-gray-700 leading-relaxed list-disc pl-4">
                <li><strong>Initial Consultation:</strong> Connect with a Grayscale Private Wealth Advisor to discuss your investment thesis and portfolio objectives.</li>
                <li><strong>Accreditation Verification:</strong> Provide documentation validating your Accredited Investor status via our secure compliance portal.</li>
                <li><strong>Subscription Agreement:</strong> Complete and digitally sign the offering circular and subscription documents.</li>
                <li><strong>Capital Call:</strong> Transfer funds via wire transfer to the designated Grayscale custody account.</li>
                <li><strong>Portfolio Deployment:</strong> Assets are deployed into the underlying digital asset markets via our institutional trading desk.</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <div className="flex space-x-6 text-xs font-bold uppercase tracking-wider text-gray-500"><span className="text-brand-purple border-b-2 border-brand-purple pb-4 -mb-4">ALL</span></div>
            <span className="text-xs text-gray-400">As of 08/13/2026</span>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead><tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase border-b border-gray-200 tracking-wider"><th className="py-3.5 px-4">NAME</th><th className="py-3.5 px-4">STATUS</th><th className="py-3.5 px-4">MIN INVESTMENT</th><th className="py-3.5 px-4">AUM</th><th className="py-3.5 px-4">MINIMUM HOLDING PERIOD</th><th className="py-3.5 px-4">NAV PER SHARE</th><th className="py-3.5 px-4"></th></tr></thead>
              <tbody className="divide-y divide-gray-200 text-xs text-gray-800">
                {PRIVATE_FUNDS.map(p => (
                  <tr key={p.name} className="hover:bg-purple-50/50 transition">
                    <td className="py-4 px-4 font-bold text-brand-purple">{p.name}</td>
                    <td className="py-4 px-4 font-semibold text-emerald-600">{p.status}</td>
                    <td className="py-4 px-4 text-gray-700">{p.minInv}</td>
                    <td className="py-4 px-4 text-gray-700">{p.aum}</td>
                    <td className="py-4 px-4 text-gray-600">{p.holding}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{p.nav}</td>
                    <td className="py-4 px-4"><Link to="/login" className="bg-brand-accent text-white font-bold text-[10px] uppercase px-4 py-2 rounded hover:bg-brand-accentHover transition inline-block">INVEST NOW</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h4 className="text-sm font-bold text-brand-purple uppercase tracking-wider mb-2">Institutional-Grade Custody & Security</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Private Funds are held in segregated, multi-signature cold storage wallets managed by Coinbase Custody LLC and other SOC 2 Type II certified institutional vaults. Each fund is subject to weekly Proof-of-Reserves audits and is covered by a $500 million comprehensive crime insurance policy, ensuring that your digital assets are protected against theft, loss, or operational failure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
