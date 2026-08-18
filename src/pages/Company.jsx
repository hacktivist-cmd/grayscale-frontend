export default function Company() {
  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-4xl font-light">About Grayscale</h1>
          <p className="text-gray-300 text-sm max-w-xl">Pioneering regulated crypto investment since 2013. We build the bridge between traditional finance and the digital asset economy.</p>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-10 text-sm text-gray-700 leading-relaxed">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-gray-900">Our Mission & Core Philosophy</h2>
            <p className="text-base">Grayscale provides investors with transparent, regulated, and secure access to the digital economy. We believe crypto assets belong in every diversified portfolio. As the world’s largest crypto asset manager, we are committed to breaking down barriers and shaping the future of investment management through innovation and unwavering regulatory compliance.</p>
            <p className="text-gray-600">Our philosophy is simple: <strong>Trust, Transparency, and Technology</strong>. We believe that digital assets represent a paradigm shift in how value is stored, transferred, and generated. Our goal is to offer the most robust, secure, and convenient gateway for institutional and individual capital to participate in this transformative asset class.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            <div className="text-center p-6 border border-gray-100 rounded-xl hover:shadow-md transition bg-white"><i className="fa-solid fa-lock text-4xl text-brand-purple"></i><p className="font-bold mt-3 text-gray-900">Institutional-Grade Security</p><p className="text-xs text-gray-500 mt-1">Multi-layered cold storage, SOC 2 Type II certified, and $500M+ crime insurance policies. Our custody infrastructure is audited by the Big 4 accounting firms.</p></div>
            <div className="text-center p-6 border border-gray-100 rounded-xl hover:shadow-md transition bg-white"><i className="fa-solid fa-chart-line text-4xl text-brand-purple"></i><p className="font-bold mt-3 text-gray-900">Proven Innovation</p><p className="text-xs text-gray-500 mt-1">Over a decade of market-leading products, from single-asset trusts to the first U.S. crypto ETFs and staking solutions. We hold over 10% of the total outstanding Bitcoin supply under management.</p></div>
            <div className="text-center p-6 border border-gray-100 rounded-xl hover:shadow-md transition bg-white"><i className="fa-solid fa-users text-4xl text-brand-purple"></i><p className="font-bold mt-3 text-gray-900">Unwavering Trust</p><p className="text-xs text-gray-500 mt-1">Trusted by over 200,000 individual investors, 1,400+ financial advisors, and leading institutional pension funds worldwide. We serve clients across 60+ countries.</p></div>
          </div>

          <div className="pt-4 space-y-4">
            <h2 className="text-2xl font-light text-gray-900">Our History & Track Record</h2>
            <div className="relative border-l border-gray-200 ml-4 space-y-8 pb-6">
              <div className="ml-6"><span className="absolute -left-2.5 top-0 w-5 h-5 bg-brand-purple rounded-full border-4 border-white"></span><h4 className="font-bold text-gray-900">2013 – The Foundation</h4><p className="text-xs text-gray-600">Grayscale is founded in New York, pioneering the concept of a regulated cryptocurrency investment vehicle, creating the Grayscale Bitcoin Trust.</p></div>
              <div className="ml-6"><span className="absolute -left-2.5 top-0 w-5 h-5 bg-brand-purple rounded-full border-4 border-white"></span><h4 className="font-bold text-gray-900">2015 – First Public Listing</h4><p className="text-xs text-gray-600">The Grayscale Bitcoin Trust becomes the first publicly traded cryptocurrency investment vehicle in the US, trading on the OTCQX market.</p></div>
              <div className="ml-6"><span className="absolute -left-2.5 top-0 w-5 h-5 bg-brand-purple rounded-full border-4 border-white"></span><h4 className="font-bold text-gray-900">2024 – ETF Era</h4><p className="text-xs text-gray-600">SEC approval of the Grayscale Bitcoin Mini Trust ETF and Grayscale Ethereum Trust ETF, marking the largest institutional adoption event in crypto history.</p></div>
              <div className="ml-6"><span className="absolute -left-2.5 top-0 w-5 h-5 bg-brand-purple rounded-full border-4 border-white"></span><h4 className="font-bold text-gray-900">2026 – Staking Revolution</h4><p className="text-xs text-gray-600">Launch of the Grayscale Hyperliquid Staking ETF and GSOL Solana Staking ETF, bringing native staking yields to traditional ETF investors.</p></div>
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <h2 className="text-2xl font-light text-gray-900">Leadership & Global Operations</h2>
            <p>Our executive team brings together 130+ years of cumulative experience from the world's most prestigious financial institutions—including the SEC, the Federal Reserve, BlackRock, and Goldman Sachs. Headquartered in Stamford, Connecticut, with offices in New York, London, and Singapore, Grayscale operates with a borderless vision, serving a global clientele of high-net-worth individuals, family offices, and sovereign wealth funds.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
              <div><div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-brand-purple font-bold text-lg">MP</div><p className="font-semibold text-xs">Michael Phillips</p><p className="text-[10px] text-gray-500">CEO, 25yrs FinTech</p></div>
              <div><div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-brand-purple font-bold text-lg">JS</div><p className="font-semibold text-xs">Jennifer Swartz</p><p className="text-[10px] text-gray-500">CFO, Ex-Goldman</p></div>
              <div><div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-brand-purple font-bold text-lg">RA</div><p className="font-semibold text-xs">Robert Arden</p><p className="text-[10px] text-gray-500">CIO, 15yrs Crypto</p></div>
              <div><div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-brand-purple font-bold text-lg">LC</div><p className="font-semibold text-xs">Lisa Chen</p><p className="text-[10px] text-gray-500">CCO, Ex-SEC</p></div>
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <h2 className="text-2xl font-light text-gray-900">Our Commitment to Excellence</h2>
            <p>Beyond assets under management, our mission is to educate and empower investors. Through the Grayscale Institute, the Crypto Sectors platform, and our award-winning research arm, we provide the highest level of market intelligence and educational resources to ensure our investors make informed, data-backed decisions in an ever-evolving asset class.</p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
              <h4 className="text-sm font-bold text-brand-purple">Grayscale Institute & Educational Initiatives</h4>
              <p className="text-xs text-gray-600 mt-2">We offer CE-credit courses, weekly webinars with industry leaders, and comprehensive guides on blockchain technology, tokenomics, and regulatory compliance. Over 50,000 professionals have completed our certification programs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
