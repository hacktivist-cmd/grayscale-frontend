import { useState } from 'react';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('docs');
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));

  const faqs = [
    { q: 'What is Grayscale?', a: 'Grayscale is the world’s largest crypto asset manager, providing investors with regulated transparent vehicle access to digital currency assets. Founded in 2013, we manage over $30 billion in assets across our suite of ETFs, publicly traded funds, and private placements.' },
    { q: 'Where is Grayscale located?', a: 'Grayscale is headquartered in Stamford, Connecticut, USA, with additional operational offices in New York, London, and Singapore to serve our global client base.' },
    { q: 'How do I invest in Grayscale products?', a: 'ETFs and Publicly Traded Funds can be purchased through any traditional brokerage account (like Fidelity, Schwab, or Robinhood). Private Funds require an application process via our accredited investor portal on this website.' },
    { q: 'What is the minimum investment amount?', a: 'For ETFs, the minimum is the price of one share. For Publicly Traded Funds, it is also the market price per share. For Private Funds, the standard minimum subscription is $25,000.' },
    { q: 'Are Grayscale products safe?', a: 'Yes. We utilize institutional-grade custody provided by Coinbase Custody LLC and other SOC 2 Type II certified vaults. All assets are held in segregated, multi-signature cold storage wallets, and we maintain a $500 million crime insurance policy.' },
    { q: 'What are the fees associated with Grayscale products?', a: 'Fees vary by product. Our ETFs boast some of the lowest gross management fees in the industry, starting at 0.15% for the Bitcoin Mini Trust. Public Funds and Private Funds have management fees that are disclosed in their respective offering circulars.' },
    { q: 'Can I hold Grayscale products in my IRA?', a: 'Yes. All Grayscale ETFs and most Publicly Traded Funds are eligible for self-directed IRA accounts. We recommend consulting with your financial advisor to ensure compliance with your specific retirement plan rules.' },
    { q: 'What is the difference between an ETF and a Private Fund?', a: 'ETFs trade on public stock exchanges and are available to all investors. Private Funds are available exclusively to accredited investors and offer access to a wider range of assets and strategies, but they are illiquid and carry a 12-month minimum holding period.' },
    { q: 'How is the NAV calculated?', a: 'The Net Asset Value (NAV) is calculated daily by taking the total value of the fund’s assets, subtracting liabilities, and dividing by the number of shares outstanding. We use independent pricing sources to ensure accuracy.' },
    { q: 'Do you offer staking rewards?', a: 'Yes. We currently offer staking features in our Ethereum Staking Mini ETF (ETH), Solana Staking ETF (GSOL), and Hyperliquid Staking ETF (HYPG). Staking rewards are automatically compounded into the fund\'s NAV, providing passive yield to investors.' },
    { q: 'How are taxes handled for Grayscale products?', a: 'For ETFs and Public Funds, you will receive a Form 1099-B at tax time. For Private Funds, you will receive a Schedule K-1. We recommend consulting a qualified tax professional to understand how your specific holdings impact your tax liabilities.' },
    { q: 'How do I report my cryptocurrency taxes with Grayscale?', a: 'Grayscale provides annual Tax Information Statements. For Public Funds and ETFs, the cost basis and proceeds are reported directly to the IRS via the broker/dealer. For Private Funds, the partnership tax accounting is handled by our tax team, and you will receive a detailed K-1 package.' },
    { q: 'What is the Grayscale Bitcoin Mini Trust ETF?', a: 'The Grayscale Bitcoin Mini Trust (BTC) is an SEC-registered exchange-traded fund that provides investors with exposure to Bitcoin at the lowest gross management fee in the industry (0.15%). It trades on the NYSE Arca exchange.' },
    { q: 'What is the Grayscale Hyperliquid Staking ETF?', a: 'The Grayscale Hyperliquid Staking ETF (HYPG) is the first U.S. ETF to provide exposure to the Hyperliquid ecosystem and its native HYPE token, while earning staking rewards with a 0.29% management fee.' },
    { q: 'Can I sell my Grayscale shares anytime?', a: 'Yes. ETFs and Publicly Traded Funds can be sold during market hours at the prevailing market price. Private Funds, however, have a minimum holding period of 12 months and are subject to limited quarterly redemption windows.' },
    { q: 'How do I contact Grayscale support?', a: 'For general inquiries, you can email us at support@grayscale.com. For private wealth consultations, you can schedule a call with our advisory team via the Contact page on our website. We are available 24/7 for operational emergencies.' },
    { q: 'What is an accredited investor?', a: 'Under Rule 501(a) of Regulation D, an accredited investor is an individual with a net worth exceeding $1 million (excluding primary residence), or an individual earning over $200,000 annually (or $300,000 with spouse). Institutional entities with $5 million+ in assets are also accredited.' },
    { q: 'How do I prove I am an accredited investor?', a: 'We provide a secure compliance portal where you can upload W-2s, tax returns, or bank/brokerage statements. The verification process is confidential and completes within 24-48 business hours.' },
    { q: 'Does Grayscale offer a mobile app?', a: 'Yes. The Grayscale Prime mobile app is available on iOS and Android. It allows you to track your portfolio, view real-time NAVs, initiate trades, and securely access your K-1 documents on the go.' },
    { q: 'Are Grayscale\'s private placements regulated?', a: 'Yes. All private placements are conducted in compliance with Regulation D of the Securities Act of 1933. We file Form D with the SEC, and our private funds are audited by independent PCAOB-registered accounting firms.' },
    { q: 'What is the lock-up period for private funds?', a: 'The standard lock-up period for Grayscale Private Funds is 12 months from the date of your initial purchase. Redemption requests are processed quarterly, with 30 days\' prior notice required.' },
    { q: 'How is the price of a Grayscale ETF determined?', a: 'The market price of a Grayscale ETF is determined by supply and demand on the secondary market (the NYSE or NASDAQ). The market price may trade at a premium or discount to the underlying NAV, though we aim to minimize this through robust creation/redemption mechanisms.' },
    { q: 'What is the Grayscale Institute?', a: 'The Grayscale Institute is our dedicated educational arm. We offer CE-credit courses, seminars, and research papers aimed at financial advisors and institutional investors to help them navigate the complexities of the digital asset market.' },
    { q: 'What is the "Grayscale Crypto Sectors" framework?', a: 'The Grayscale Crypto Sectors framework is a proprietary classification system that groups digital assets into five distinct sectors: Currency, Smart Contract Platforms, Financials, Consumer & Culture, and Infrastructure. This helps investors diversify their crypto allocations by economic function rather than just market cap.' },
    { q: 'What is the best way to get started with Grayscale?', a: 'The easiest way is to open a brokerage account and purchase shares of our ETFs or Publicly Traded Funds. If you are an accredited investor looking for larger allocations, we recommend applying for a Private Fund subscription via our online portal.' },
    { q: 'How does Grayscale ensure compliance with AML/KYC regulations?', a: 'Grayscale maintains a robust Anti-Money Laundering (AML) and Know-Your-Customer (KYC) compliance program. We follow the strict guidelines set forth by the Financial Crimes Enforcement Network (FinCEN) and conduct regular independent audits to ensure regulatory adherence.' }
  ];

  const renderTabContent = () => {
    if (activeTab === 'docs') return (
      <div className="space-y-6">
        <h2 className="text-2xl font-light text-gray-900">Product Documents & Data</h2>
        <p className="text-xs text-gray-500">Access the official offering circulars, prospectus supplements, and fact sheets for all Grayscale products. These documents contain essential information regarding investment objectives, risk factors, and fee structures.</p>
        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-left border-collapse text-xs">
            <thead><tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase"><th className="py-3 px-4">NAME</th><th className="py-3 px-4">FACT SHEET</th><th className="py-3 px-4">PERFORMANCE DATA</th><th className="py-3 px-4">PROSPECTUS</th></tr></thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {['Grayscale Aave Trust','Grayscale Bitcoin Mini Trust ETF','Grayscale Hyperliquid Staking ETF','Grayscale Solana Staking ETF','Grayscale Ethereum Mini Trust'].map(name => (
                <tr key={name} className="hover:bg-purple-50/50"><td className="py-3 px-4 font-bold text-brand-purple">{name}</td><td className="py-3 px-4 text-brand-accent cursor-pointer hover:underline">PDF</td><td className="py-3 px-4 text-brand-accent cursor-pointer hover:underline">XLSX</td><td className="py-3 px-4 text-brand-accent cursor-pointer hover:underline">PDF</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    if (activeTab === 'tax') return (
      <div className="space-y-6">
        <h2 className="text-2xl font-light text-gray-900">Tax Center</h2>
        <p className="text-xs text-gray-500">Access your annual tax forms, including Form 1099-B (for ETFs and Public Funds) and Schedule K-1 (for Private Funds). We also provide detailed guidelines on how to calculate and report gains/losses for the current tax year.</p>
        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-left border-collapse text-xs">
            <thead><tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase"><th className="py-3 px-4">NAME</th><th className="py-3 px-4">FORM TYPE</th><th className="py-3 px-4">FILING DATE</th><th className="py-3 px-4">DOWNLOAD</th></tr></thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {['Grayscale Basic Attention Token Trust','Grayscale Bitcoin Cash Trust','Grayscale Aave Trust Private Fund'].map(name => (
                <tr key={name} className="hover:bg-purple-50/50"><td className="py-3 px-4 font-bold">{name}</td><td className="py-3 px-4 text-gray-600">Schedule K-1</td><td className="py-3 px-4 text-gray-500">12/31/2025</td><td className="py-3 px-4 text-brand-accent cursor-pointer hover:underline">Download PDF</td></tr>
              ))}
              <tr className="hover:bg-purple-50/50"><td className="py-3 px-4 font-bold">Grayscale Bitcoin Mini Trust ETF</td><td className="py-3 px-4 text-gray-600">Form 1099-B</td><td className="py-3 px-4 text-gray-500">02/15/2026</td><td className="py-3 px-4 text-brand-accent cursor-pointer hover:underline">Download PDF</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-brand-purple/5 p-6 rounded-lg border border-brand-border/20 mt-4">
          <h4 className="text-sm font-bold text-brand-purple uppercase tracking-wider">State-Specific Tax Considerations</h4>
          <p className="text-xs text-gray-600 mt-2">Certain states, including California and New York, may have specific rules regarding the taxation of digital assets and securities. We recommend consulting with a tax professional to understand the implications of your specific jurisdiction.</p>
        </div>
      </div>
    );
    if (activeTab === 'faqs') return (
      <div className="space-y-6">
        <h2 className="text-2xl font-light text-gray-900">Frequently Asked Questions</h2>
        <p className="text-xs text-gray-500">Browse our comprehensive list of frequently asked questions covering everything from investment eligibility and custody security to tax reporting and staking mechanics.</p>
        <div className="space-y-3 max-w-4xl">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition bg-white">
              <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center text-left font-bold text-gray-900 text-sm">
                <span>{faq.q}</span><i className={`fa-solid ${faqOpen[i] ? 'fa-minus text-brand-purple' : 'fa-plus text-gray-400'} transition-transform`}></i>
              </button>
              <div className={`${faqOpen[i] ? 'block' : 'hidden'} pt-3 text-xs text-gray-600 leading-relaxed border-t border-gray-100 mt-3`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    );
    return <div className="space-y-6"><h2 className="text-2xl font-light text-gray-900">Regulatory Filings</h2><p className="text-xs text-gray-500">Access official SEC and regulatory disclosures for all Grayscale investment products.</p></div>;
  };

  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl font-light">Resources Center</h1>
          <p className="text-gray-300 text-sm max-w-xl">Your central hub for product documentation, tax filings, legal disclosures, and frequently asked questions about Grayscale's investment products and services.</p>
          <button className="border border-white/40 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm hover:border-white transition">CONTACT US</button>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500 gap-6">
            {['docs','filings','tax','faqs'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 ${activeTab === tab ? 'text-brand-purple border-b-2 border-brand-purple' : 'hover:text-brand-purple transition'}`}>
                {tab === 'docs' ? 'Product Documents & Data' : tab === 'filings' ? 'Regulatory Filings' : tab === 'tax' ? 'Tax Center' : 'FAQs'}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
