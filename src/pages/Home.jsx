import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [homeProductFilter, setHomeProductFilter] = useState('etf');
  const [isTradingModalOpen, setIsTradingModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  // Check for cookie on load
  useEffect(() => {
    const hasDismissed = document.cookie.split('; ').some(row => row.startsWith('grayscale_newsletter_dismissed=true'));
    if (!hasDismissed) {
      // Exit Intent Listener (only attach if cookie doesn't exist)
      const handleMouseLeave = (e) => {
        if (e.clientY <= 0) {
          setIsExitModalOpen(true);
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Set cookie to never show again
    document.cookie = "grayscale_newsletter_dismissed=true; path=/; max-age=31536000"; // 1 year
    setIsExitModalOpen(false);
    alert('Welcome to the Grayscale Insights newsletter!');
  };

  const handleCloseExitModal = () => {
    // Set cookie so it doesn't show again this session
    document.cookie = "grayscale_newsletter_dismissed=true; path=/; max-age=31536000"; 
    setIsExitModalOpen(false);
  };

  const ETF_PRODUCTS = [
    { name: "Grayscale Bitcoin Mini Trust ETF", ticker: "BTC", nav: "$27.81", date: "08/14/2026" },
    { name: "Grayscale Ethereum Staking Mini ETF", ticker: "ETH", nav: "$17.93", date: "08/14/2026" },
    { name: "Grayscale Hyperliquid Staking ETF", ticker: "HYPG", nav: "$19.66", date: "08/14/2026" },
    { name: "Grayscale Solana Staking ETF", ticker: "GSOL", nav: "$5.67", date: "08/14/2026" },
    { name: "Grayscale Chainlink Trust ETF", ticker: "GLNK", nav: "$7.98", date: "08/14/2026" },
    { name: "Grayscale XRP Trust ETF", ticker: "GXRP", nav: "$19.34", date: "08/14/2026" },
  ];

  const RESEARCH_DATA = [
    {
      title: "Solana: Crypto's Financial Bazaar",
      summary: "Key Takeaways: Solana is a smart contract platform blockchain that stands out for the depth and diversi..",
      date: "08/01/2026",
      read: "17 min",
      image: "box1.jpeg"
    },
    {
      title: "Guide to Buying the Dip: Valuing Crypto with Cash Flows",
      summary: "Key Takeaways: Guide to buying the dip: Valuing Crypto with Cash Flows? How can invest...",
      date: "06/18/2026",
      read: "31 min",
      image: "box2.jpeg"
    },
    {
      title: "Hyperliquid Breaks the Mold",
      summary: "Key Takeaways: Hyperliquid is the breakout success story of the modern digital asset industry.",
      date: "05/27/2026",
      read: "24 min",
      image: "box3.jpeg"
    },
    {
      title: "Investing in Smart Contract Platforms",
      summary: "Key Takeaways: Smart contract platforms extend the original vision for blockchains.",
      date: "01/29/2026",
      read: "21 min",
      image: "box4.jpeg"
    }
  ];

  return (
    <div className="bg-white font-sans antialiased">
      {/* HERO SECTION */}
      <div className="relative min-h-[600px] bg-brand-purple bg-[url('bg.png')] bg-cover bg-center bg-no-repeat text-white overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              Digital Asset Investing<br/>
              <span className="font-bold">Fundamentals Course</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl font-normal leading-relaxed">
              Master the foundations of investing in crypto assets with Grayscale's five-class, CE-credit course.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => setIsTradingModalOpen(true)} className="bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-sm transition flex items-center space-x-2">
                <span>CLASS 3: REGISTER NOW</span>
              </button>
              <button className="border border-white/30 hover:border-white text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-sm transition">
                CLASS 1 & 2: NOW ON DEMAND
              </button>
            </div>
            <div className="pt-8 border-t border-white/10 flex items-center justify-between max-w-2xl w-full">
              <div>
                <p className="text-base font-semibold text-white mt-1 hover:text-brand-accent cursor-pointer transition" onClick={() => window.location.href='/research'}>
                  Hyperliquid Breaks the Mold
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="w-8 h-8 rounded border border-white/20 flex items-center justify-center hover:border-white transition"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                <button className="w-8 h-8 rounded border border-white/20 flex items-center justify-center hover:border-white transition"><i className="fa-solid fa-chevron-right text-xs"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INVESTMENT SOLUTIONS SECTION */}
      <div className="bg-white py-16 px-4 sm:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-3xl font-light text-gray-900 tracking-tight">Investment Solutions</h2>
          <div className="flex space-x-8 border-b border-gray-200 text-xs font-bold tracking-wider uppercase text-gray-500 pb-3 overflow-x-auto whitespace-nowrap">
            <button onClick={() => setHomeProductFilter('etf')} className={`pb-3 -mb-3 ${homeProductFilter === 'etf' ? 'text-brand-purple border-b-2 border-brand-purple' : 'hover:text-brand-purple transition'}`}>ETFs/ETPs</button>
            <button onClick={() => setHomeProductFilter('public')} className={`pb-3 -mb-3 ${homeProductFilter === 'public' ? 'text-brand-purple border-b-2 border-brand-purple' : 'hover:text-brand-purple transition'}`}>PUBLICLY TRADED FUNDS</button>
            <button onClick={() => setHomeProductFilter('private')} className={`pb-3 -mb-3 ${homeProductFilter === 'private' ? 'text-brand-purple border-b-2 border-brand-purple' : 'hover:text-brand-purple transition'}`}>PRIVATE FUNDS</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ETF_PRODUCTS.map(p => (
              <div key={p.ticker} onClick={() => window.location.href='/dashboard'} className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-xl transition group cursor-pointer flex justify-between items-center w-full h-full min-h-[200px]">
                <div className="flex flex-col space-y-2 w-full">
                  <h3 className="text-5xl font-normal text-brand-purple tracking-tight">{p.ticker}</h3>
                  <p className="text-sm font-medium text-gray-700 max-w-[200px]">{p.name}</p>
                  <div className="pt-4 flex items-center">
                    <div className="text-2xl font-bold text-gray-900">{p.nav}</div>
                    <i className="fa-solid fa-chevron-right text-sm text-gray-400 ml-4 group-hover:translate-x-1 transition"></i>
                  </div>
                  <div className="text-[10px] text-gray-400">Market Price as of {p.date}</div>
                </div>
                <div className="w-20 h-20 relative flex items-center justify-center shrink-0">
                  <img src={`/${p.ticker.toLowerCase()}.png`} alt={p.ticker} className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-6">
            <button onClick={() => window.location.href='/etfs'} className="bg-brand-purple text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-brand-lightPurple transition">
              VIEW ALL
            </button>
          </div>
          <div className="text-[10px] text-gray-500 leading-relaxed pt-4 border-t border-gray-200">
            <p>The Grayscale Trusts are not investment companies registered under the Investment Company Act of 1940, and are not subject to the same regulatory requirements as mutual funds. An investment in Grayscale Trusts involves a high degree of risk and should be considered a speculative investment.</p>
          </div>
        </div>
      </div>

      {/* RESEARCH & INSIGHTS SECTION */}
      <div className="bg-gray-50 py-16 px-4 sm:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-3xl font-light text-gray-900 tracking-tight">Research & Insights</h2>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {RESEARCH_DATA.map((item, idx) => (
              <div key={idx} className="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-xl transition group cursor-pointer flex flex-col h-full" onClick={() => window.location.href='/research'}>
                <img src={`/${item.image}`} alt={item.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-300" />
                <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                  <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-brand-accent transition">{item.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{item.summary}</p>
                  <div className="text-[11px] text-gray-400 font-medium">{item.date} • {item.read} read</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden relative">
            <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 no-scrollbar">
              {RESEARCH_DATA.map((item, idx) => (
                <div key={idx} className="min-w-[300px] bg-white rounded border border-gray-200 overflow-hidden flex flex-col snap-center cursor-pointer" onClick={() => window.location.href='/research'}>
                  <img src={`/${item.image}`} alt={item.title} className="w-full h-44 object-cover" />
                  <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                    <h3 className="font-bold text-gray-900 text-base leading-snug">{item.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{item.summary}</p>
                    <div className="text-[11px] text-gray-400 font-medium">{item.date} • {item.read} read</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-4 px-1">
              <div className="flex gap-3">
                <button onClick={scrollLeft} className="w-10 h-10 flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 transition">
                  <i className="fa-solid fa-chevron-left text-gray-500 text-sm"></i>
                </button>
                <button onClick={scrollRight} className="w-10 h-10 flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 transition">
                  <i className="fa-solid fa-chevron-right text-gray-500 text-sm"></i>
                </button>
              </div>
              <button onClick={() => window.location.href='/research'} className="bg-brand-purple text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-sm hover:bg-brand-lightPurple transition shadow-sm">
                VIEW ALL
              </button>
            </div>
          </div>

          <div className="hidden md:block text-center pt-4">
            <button onClick={() => window.location.href='/research'} className="bg-brand-purple text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-brand-lightPurple transition">
              VIEW ALL
            </button>
          </div>
        </div>
      </div>

      {/* EMPOWERING INVESTORS SECTION */}
      <div className="bg-brand-purple text-white py-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-light">Empowering Investors</h2>
            <p className="text-gray-300 text-sm leading-relaxed">Grayscale offers a diverse suite of crypto investment solutions for individual investors.</p>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div className="border-l-2 border-brand-accent pl-6 space-y-2">
              <h3 className="text-xl font-bold">Individual Investors</h3>
              <p className="text-xs text-gray-300">Access regulated crypto investment products through familiar brokerage and retirement accounts.</p>
            </div>
            <div className="border-l-2 border-white/20 pl-6 space-y-2">
              <h3 className="text-xl font-bold">Financial Advisors</h3>
              <p className="text-xs text-gray-300">Grayscale provides financial advisors with expert research, insights, and resources.</p>
            </div>
            <div className="border-l-2 border-white/20 pl-6 space-y-2">
              <h3 className="text-xl font-bold">Institutional Investors</h3>
              <p className="text-xs text-gray-300">Founded in 2013, Grayscale has one of the longest track records in the industry.</p>
            </div>
          </div>
        </div>
      </div>

      {/* WE ARE CRYPTO EXPERTS SECTION */}
      <div className="bg-white py-16 px-4 sm:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-light text-gray-900 leading-tight">We Are Crypto <br /> Experts</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">As the crypto market has evolved, Grayscale has grown alongside it, building a deep understanding of the asset class.</p>
            <a href="/company" className="text-xs font-bold uppercase tracking-wider text-brand-accent hover:text-brand-accentHover flex items-center space-x-2 pt-2">LEARN MORE ABOUT GRAYSCALE <i className="fa-solid fa-chevron-right text-[10px]"></i></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-brand-purple">35+</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Investment Products*</div>
              <div className="text-[10px] text-gray-500 pt-1">*As of 08/13/2026.</div>
            </div>
            <div className="space-y-2 border-l border-gray-200 pl-4 sm:border-l-0 sm:pl-0">
              <div className="text-5xl font-extrabold text-brand-purple">180+ Years</div>
              <div className="text-xs text-gray-600 leading-snug">130+ cumulative years traditional finance leadership experience and 50+ cumulative years digital asset leadership experience</div>
            </div>
            <div className="space-y-2 border-l border-gray-200 pl-4 sm:border-l-0 sm:pl-0">
              <div className="text-5xl font-extrabold text-brand-purple">#1</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Bitcoin and Ethereum Investment Platform**</div>
              <div className="text-[10px] text-gray-500 pt-1">**As of 08/13/2026.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-brand-lightPurple text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4"><h2 className="text-3xl font-light">Meet with a Grayscale portfolio consultant</h2></div>
          <Link to="/login" className="bg-white text-brand-purple text-xs font-extrabold uppercase px-8 py-3.5 rounded-sm hover:bg-gray-100 transition tracking-wider whitespace-nowrap">GET STARTED</Link>
        </div>
      </div>

      {/* TRADING MODAL */}
      {isTradingModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative animate-fade-in border border-gray-200">
            <button onClick={() => setIsTradingModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg"><i className="fa-solid fa-xmark"></i></button>
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-brand-purple leading-snug">Now Trading: Grayscale Hyperliquid Staking ETF (Ticker: HYPG)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">The Grayscale Hyperliquid Staking ETF offers exposure to HYPE with the lowest gross management fee in the U.S.<sup>1</sup></p>
              <div className="pt-2"><button onClick={() => { setIsTradingModalOpen(false); window.location.href='/dashboard'; }} className="bg-brand-accent text-white font-bold text-xs uppercase px-6 py-3 rounded hover:bg-brand-accentHover transition tracking-wider w-full sm:w-auto">LEARN MORE</button></div>
            </div>
          </div>
        </div>
      )}

      {/* EXIT INTENT NEWSLETTER MODAL */}
      {isExitModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
            <button onClick={handleCloseExitModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"><i className="fa-solid fa-xmark"></i></button>
            <div className="text-center space-y-4">
              <div className="text-5xl text-brand-purple"><i className="fa-solid fa-envelope-open-text"></i></div>
              <h3 className="text-2xl font-light">Get the Crypto Edge</h3>
              <p className="text-xs text-gray-600">Join 200,000+ investors receiving weekly insights, market analysis, and product updates.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 pt-2">
                <input type="email" required placeholder="Your email address" className="flex-1 p-3 border border-gray-300 rounded text-xs focus:border-brand-purple focus:outline-none" />
                <button type="submit" className="bg-brand-accent text-white font-bold uppercase px-6 py-3 rounded text-xs hover:bg-brand-accentHover transition">Subscribe</button>
              </form>
              <p className="text-[10px] text-gray-400">We respect your privacy. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
