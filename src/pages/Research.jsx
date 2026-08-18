export default function Research() {
  const articles = [
    { icon: 'earth-americas', color: 'slate-700', title: 'March 2026: Resilience During Wartime', desc: 'Key Takeaways: Crypto valuations held up well in March, posting a modern gain despite declines in most other major asset classes. Geopolitical volatility acted as a stress test, revealing the asset class\'s maturity.', date: '04/01/2026', read: '9 min' },
    { icon: 'shapes', color: 'purple-700', title: 'Crypto Sectors Quarterly: AI and Tokenization Shine', desc: 'Q1 2026 was defined by volatility as geopolitical risk and macro repricing drove sharp market swings. Within this environment, AI-focused tokens and Real-World Asset (RWA) tokenization protocols significantly outperformed.', date: '03/27/2026', read: '11 min' },
    { icon: 'scale-balanced', color: 'emerald-700', title: 'February 2026: Signs of Stability', desc: 'Key Takeaways: Valuations declined in early February but stabilized later in the month. Trading volume improved across major centralized exchanges, signaling a potential bottoming out of the correction cycle.', date: '03/02/2026', read: '11 min' },
    { icon: 'rocket', color: 'blue-700', title: 'The Institutional Onboarding Wave: 2026 Outlook', desc: 'An in-depth look at the massive influx of institutional capital through Bitcoin and Ethereum ETFs. We analyze the on-chain data showing a 300% increase in large wallet activity compared to the previous quarter.', date: '01/15/2026', read: '18 min' },
    { icon: 'cloud', color: 'cyan-700', title: 'DePIN: The Next Frontier in Infrastructure', desc: 'Decentralized Physical Infrastructure Networks are redefining how we build and maintain real-world assets. Grayscale explores the leading protocols, their tokenomics, and the potential for 10x growth in the sector.', date: '12/10/2025', read: '22 min' },
    { icon: 'chart-pie', color: 'pink-700', title: 'Portfolio Construction with Digital Assets', desc: 'How to optimally allocate crypto assets within a traditional 60/40 portfolio. We model risk-adjusted returns, Sharpe ratios, and correlation matrices to provide actionable advice for asset managers.', date: '11/05/2025', read: '15 min' }
  ];

  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-xs text-gray-400 flex items-center space-x-2"><span>Research</span> <i className="fa-solid fa-chevron-right text-[8px]"></i> <span>Market Commentary</span></div>
          <h1 className="text-4xl sm:text-5xl font-light">Market Commentary & Analysis</h1>
          <p className="text-gray-300 text-base max-w-2xl font-light">Whether you're new to crypto or a seasoned pro, our library of educational resources and deep-dive analytics will deepen your understanding of the technology that's changing the world.</p>
        </div>
      </div>
      <div className="bg-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition group">
                <div className={`h-52 bg-${item.color.split('-')[0]}-100 p-6 flex items-center justify-center relative overflow-hidden`}>
                  <i className={`fa-solid fa-${item.icon} text-6xl text-${item.color} group-hover:scale-110 transition duration-300`}></i>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-accent transition">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{item.desc}</p>
                  <div className="text-[11px] text-gray-400 pt-2 flex justify-between"><span>{item.date}</span><span className="font-medium">{item.read} read</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-brand-purple/5 p-8 rounded-xl border border-brand-border/20 text-center">
            <h3 className="text-lg font-semibold text-brand-purple">Access the Grayscale Institute</h3>
            <p className="text-xs text-gray-600 mt-2 max-w-xl mx-auto">Deepen your knowledge with our comprehensive educational platform covering blockchain fundamentals, trading strategies, and regulatory updates.</p>
            <button className="mt-4 bg-brand-purple text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-brand-lightPurple transition">Explore the Institute</button>
          </div>
        </div>
      </div>
    </div>
  );
}
