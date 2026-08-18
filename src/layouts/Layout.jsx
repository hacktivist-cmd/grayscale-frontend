import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleAccordion = (label) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  const MOBILE_NAV_ITEMS = [
    { 
      label: 'Investment Products', 
      type: 'accordion', 
      links: [
        { name: 'ETFs/ETPs', to: '/etfs' },
        { name: 'Publicly Traded Funds', to: '/public-funds' },
        { name: 'Private Funds', to: '/private-funds' }
      ] 
    },
    { 
      label: 'Research', 
      type: 'accordion', 
      links: [
        { name: 'Market Commentary', to: '/research' },
        { name: 'Reports', to: '/reports' },
        { name: 'Videos & Webinars', to: '/research' }
      ] 
    },
    { 
      label: 'Resources', 
      type: 'accordion', 
      links: [
        { name: 'Product Documents & Data', to: '/resources' },
        { name: 'Regulatory Filings', to: '/resources' },
        { name: 'Tax Center', to: '/resources' },
        { name: 'FAQs', to: '/resources' }
      ] 
    },
    { label: 'Company', type: 'link', to: '/company' },
    { label: 'The Stack Blog', type: 'link', to: '/research' },
    { label: 'Grayscale Institute', type: 'link', to: '/research' },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans antialiased selection:bg-brand-accent selection:text-white flex flex-col min-h-screen">
      {/* TOP UTILITY NAV BAR */}
      <div className="bg-brand-darkPurple text-xs text-gray-300 py-1.5 px-4 sm:px-8 border-b border-brand-border/40">
        <div className="max-w-7xl mx-auto flex justify-end items-center space-x-6 tracking-wider font-semibold">
          <Link to="/resources" className="hover:text-white transition cursor-pointer">TAX & REGULATORY DOCUMENTS</Link>
          <Link to="/contact" className="hover:text-white transition cursor-pointer">CONTACT</Link>
          <Link to="/login" className="hover:text-white transition cursor-pointer">INVESTOR LOGIN</Link>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-brand-purple text-white sticky top-0 z-40 border-b border-brand-border/60 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src="/logo.png" alt="Grayscale" className="h-8 w-auto object-contain" />
            </Link>
            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center space-x-6 text-xs font-bold tracking-wider">
              <div className="relative group py-6">
                <span className="flex items-center space-x-1 hover:text-brand-accent transition cursor-pointer">
                  <span>INVESTMENT PRODUCTS</span>
                  <i className="fa-solid fa-chevron-down text-[10px] ml-1"></i>
                </span>
                <div className="absolute top-full left-0 w-64 bg-brand-lightPurple border border-brand-border rounded-b-md shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 py-3 z-50">
                  <Link to="/etfs" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">ETFs / ETPs</Link>
                  <Link to="/public-funds" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">Publicly Traded Funds</Link>
                  <Link to="/private-funds" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">Private Funds</Link>
                </div>
              </div>
              <div className="relative group py-6">
                <span className="flex items-center space-x-1 hover:text-brand-accent transition cursor-pointer">
                  <span>RESEARCH</span>
                  <i className="fa-solid fa-chevron-down text-[10px] ml-1"></i>
                </span>
                <div className="absolute top-full left-0 w-64 bg-brand-lightPurple border border-brand-border rounded-b-md shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 py-3 z-50">
                  <Link to="/research" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">Market Commentary</Link>
                  <Link to="/reports" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">Reports</Link>
                  <Link to="/research" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">Videos & Webinars</Link>
                </div>
              </div>
              <div className="relative group py-6">
                <span className="flex items-center space-x-1 hover:text-brand-accent transition cursor-pointer">
                  <span>RESOURCES</span>
                  <i className="fa-solid fa-chevron-down text-[10px] ml-1"></i>
                </span>
                <div className="absolute top-full left-0 w-64 bg-brand-lightPurple border border-brand-border rounded-b-md shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 py-3 z-50">
                  <Link to="/resources" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">Product Documents & Data</Link>
                  <Link to="/resources" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">Regulatory Filings</Link>
                  <Link to="/resources" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">Tax Center</Link>
                  <Link to="/resources" className="block px-5 py-2.5 text-xs text-gray-200 hover:bg-brand-purple hover:text-brand-accent">FAQs</Link>
                </div>
              </div>
              <Link to="/company" className="hover:text-brand-accent transition cursor-pointer">COMPANY</Link>
              <Link to="/research" className="hover:text-brand-accent transition cursor-pointer">THE STACK BLOG</Link>
              <Link to="/research" className="hover:text-brand-accent transition cursor-pointer">GRAYSCALE INSTITUTE</Link>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-white hidden sm:block"><i className="fa-solid fa-magnifying-glass text-base"></i></button>
            <Link to="/login" className="hidden sm:block bg-white text-brand-purple text-xs font-extrabold uppercase px-5 py-2.5 rounded-sm hover:bg-gray-200 transition shadow-md">
              START INVESTING
            </Link>
            {/* MOBILE HAMBURGER MENU BUTTON */}
            <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-white hover:bg-brand-purple/60 rounded-md transition">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU (SIDE NAV) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col md:hidden overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <span className="text-3xl font-black tracking-widest text-brand-purple">GRAYSCALE</span>
            <button onClick={toggleMobileMenu} className="text-brand-purple hover:text-brand-accent transition">
              <i className="fa-solid fa-xmark text-3xl"></i>
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center border border-gray-300 rounded-sm p-2 bg-white shadow-sm">
              <i className="fa-solid fa-magnifying-glass text-gray-400 text-lg mr-3"></i>
              <input type="text" placeholder="Search" className="flex-1 text-sm text-gray-700 outline-none bg-transparent" />
              <button className="bg-brand-purple text-white text-xs font-bold px-6 py-2 rounded-sm hover:bg-brand-lightPurple transition">SEARCH</button>
            </div>
          </div>

          {/* NAVIGATION LINKS WITH ACCORDION */}
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-1">
            {MOBILE_NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.type === 'accordion' ? (
                  <div className="border-b border-gray-100 py-1">
                    <button 
                      onClick={() => toggleAccordion(item.label)}
                      className="w-full flex items-center justify-between py-3 text-brand-purple font-bold text-base"
                    >
                      {item.label}
                      <i className={`fa-solid ${openAccordion === item.label ? 'fa-minus' : 'fa-plus'} text-lg`}></i>
                    </button>
                    <div className={`${openAccordion === item.label ? 'block' : 'hidden'} pb-3 space-y-1`}>
                      {item.links.map((link) => (
                        <Link 
                          key={link.name} 
                          to={link.to} 
                          onClick={toggleMobileMenu}
                          className="block py-2 pl-4 text-sm text-gray-600 font-medium hover:text-brand-accent transition"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={item.to} 
                    onClick={toggleMobileMenu}
                    className="block py-3 border-b border-gray-100 text-brand-purple font-bold text-base hover:text-brand-accent transition"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* BOTTOM ACTION BUTTON */}
          <div className="mt-auto p-6 border-t border-gray-200 bg-white">
            <Link 
              to="/login" 
              onClick={toggleMobileMenu}
              className="block w-full bg-[#CDD885] text-brand-purple font-extrabold text-xs uppercase tracking-wider py-4 rounded-sm text-center hover:bg-[#BCC670] transition shadow-sm"
            >
              START INVESTING
            </Link>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
              <div className="text-6xl font-black tracking-widest text-brand-purple">G</div>
              <p className="text-sm font-semibold text-gray-800">Stay on top of the latest crypto news and insights</p>
              <div className="flex items-center space-x-2">
                <input type="email" placeholder="Enter your email" className="p-2.5 bg-gray-100 border border-gray-300 rounded text-xs focus:outline-none focus:border-brand-purple w-full" />
                <button className="bg-brand-accent text-white font-bold text-xs uppercase px-4 py-2.5 rounded hover:bg-brand-accentHover transition">SUBSCRIBE</button>
              </div>
              <div className="flex items-center space-x-4 text-gray-600 text-lg pt-2">
                <a href="#" className="hover:text-brand-purple"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="hover:text-brand-purple"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#" className="hover:text-brand-purple"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="hover:text-brand-purple"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" className="hover:text-brand-purple"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div><h4 className="font-bold text-gray-900 uppercase tracking-wider mb-4">INVESTMENT PRODUCTS</h4><ul className="space-y-2.5 text-gray-600 font-medium"><li><Link to="/etfs" className="hover:text-brand-purple">ETFs/ETPs</Link></li><li><Link to="/public-funds" className="hover:text-brand-purple">Publicly Traded Funds</Link></li><li><Link to="/private-funds" className="hover:text-brand-purple">Private Funds</Link></li></ul></div>
              <div><h4 className="font-bold text-gray-900 uppercase tracking-wider mb-4">RESEARCH</h4><ul className="space-y-2.5 text-gray-600 font-medium"><li><Link to="/research" className="hover:text-brand-purple">Market Commentary</Link></li><li><Link to="/reports" className="hover:text-brand-purple">Reports</Link></li><li><Link to="/research" className="hover:text-brand-purple">Videos & Webinars</Link></li><li><Link to="/research" className="hover:text-brand-purple">Token Fundamentals</Link></li><li><Link to="/research" className="hover:text-brand-purple">Explore All</Link></li></ul></div>
              <div><h4 className="font-bold text-gray-900 uppercase tracking-wider mb-4">COMPANY</h4><ul className="space-y-2.5 text-gray-600 font-medium"><li><Link to="/company" className="hover:text-brand-purple">About Grayscale</Link></li><li><a href="#" className="hover:text-brand-purple">Press</a></li><li><a href="#" className="hover:text-brand-purple">Careers</a></li><li><Link to="/contact" className="hover:text-brand-purple">Contact Us</Link></li></ul></div>
              <div><h4 className="font-bold text-gray-900 uppercase tracking-wider mb-4">RESOURCES</h4><ul className="space-y-2.5 text-gray-600 font-medium"><li><Link to="/resources" className="hover:text-brand-purple">Tax & Regulatory Documents</Link></li><li><Link to="/resources" className="hover:text-brand-purple">The Grayscale Glossary</Link></li><li><Link to="/resources" className="hover:text-brand-purple">FAQs</Link></li><li><a href="#" className="hover:text-brand-purple">Financial Professionals</a></li><li><Link to="/research" className="hover:text-brand-purple">Grayscale Crypto Sectors</Link></li></ul></div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-4"><i className="fa-solid fa-location-dot mr-1"></i> Grayscale Investments, 290 Harbor Drive, Stamford, CT 06902, USA <span className="mx-2">|</span> Phone: <a href="tel:+18667750313" className="hover:text-gray-900">866-775-0313</a></div>
          
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 space-y-4 md:space-y-0">
            <div>© 2026 Grayscale. All rights reserved</div>
            <div className="flex space-x-6 font-medium">
              <Link to="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gray-900">Terms of Service</Link>
              <Link to="/social" className="hover:text-gray-900">Social Media Disclosure</Link>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded text-[11px] text-gray-600 space-y-3 leading-relaxed">
            <p>Grayscale Operating, LLC (“GSO” d/b/a Grayscale Investments) is the parent holding company of Grayscale Advisors, LLC (“GSA”), an SEC-registered investment adviser, as well Grayscale Securities, LLC (“GSS”), an SEC-registered broker/dealer and member of FINRA, and Grayscale Investments Sponsors, LLC ("GSIS", together with GSO, GSS, and GSA, "Grayscale" or “Grayscale Investments”). GSIS is not registered as an investment adviser under the Investment Advisers Act of 1940 and none of the investment products (“Products”) sponsored or managed by GSIS are registered under the Investment Company Act of 1940.</p>
            
            <p>This information must be preceded or accompanied by a prospectus for the Grayscale Trusts. Click the following links to view a prospectus: <a href="#">BTC</a>, <a href="#">GBTC</a>, <a href="#">GLNK</a>, <a href="#">GDLC</a>, <a href="#">GDOG</a>, <a href="#">ETHE</a>, <a href="#">ETH</a>, <a href="#">GSOL</a>, <a href="#">GSUI</a>, <a href="#">GXRP</a>, <a href="#">GAVA</a>, <a href="#">HYPG</a>.</p>
            
            <p>Investing involves a high degree of risk and heightened volatility, including possible loss of principal. An investment is not suitable for all investors, may be deemed speculative and is not intended as a complete investment program. An investment should be considered only by persons who can bear the risk of total loss associated with an investment. An investment in any Grayscale product is not a direct investment in any cryptocurrency.</p>
            
            <p>Carefully consider the funds' investment objectives, risk factors, and charges and expenses before investing. This and other information can be found in the funds' prospectuses or, if available, the summary prospectuses, which may be obtained by visiting Grayscale.com. Read the prospectus carefully before investing.</p>
            
            <p>This information should not be relied upon as research, investment advice, or a recommendation regarding any products, strategies, or any security in particular. This material is strictly for illustrative, educational, or informational purposes and is subject to change.</p>
            
            <p>Private placement securities are speculative, illiquid, and entail a high level of risk, including the risk that an investor could lose their entire investment. The private placement securities are not suitable for any investor that cannot afford loss of the entire investment. The private placement securities are distributed by Grayscale Securities, LLC (Member FINRA/SIPC). SIPC coverage does not apply to the crypto asset products or services mentioned.</p>
            
            <p>Actively managed funds do not seek to track an index and their performance reflects the investment decisions that the investment manager makes for the Fund. There is no guarantee the investment strategy will be successful.</p>
            
            <p>COINDESK® is a trademark of CoinDesk Indices, Inc. (with its affiliates, including CC Data Limited, “CDI”), and/or its licensors. CDI or CDI's licensors own all proprietary rights in the Index. CDI is not affiliated with Grayscale and does not approve, endorse, review, or recommend any Products. CDI does not guarantee the timeliness, accurateness, or completeness of any data or information relating to any Index and shall not be liable in any way to Grayscale, investors in or holders of any product or other third parties in respect of the use or accuracy of any Index or any data included therein.</p>
            
            <p>Foreside Fund Services, LLC is the marketing agent for Grayscale ETPs and the distributor of Grayscale ETFs.</p>
            
            <p>All of the content on our site - including text, software, scripts, code, designs, graphics, photos, sounds, music, videos, applications, interactive features, articles, news stories, sketches, animations, stickers, general artwork and other content ("Content") - is owned by Grayscale or others we license Content from, and is protected by copyright, patent and other laws.</p>
            
            <p>Grayscale reserves all rights not expressly described herein.</p>
            
            <p>© 2026 Grayscale. All trademarks, service marks and/or trade names (e.g., G™, GRAYSCALE®, GRAYSCALE CRYPTO SECTORS™, and GRAYSCALE INVESTMENTS®) are owned and/or registered by Grayscale.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
