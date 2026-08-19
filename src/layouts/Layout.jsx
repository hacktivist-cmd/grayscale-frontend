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
            {/* MOBILE HAMBURGER MENU BUTTON - FIXED VISIBILITY */}
            <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-white hover:bg-brand-purple/60 rounded-md transition focus:outline-none">
              <i className="fa-solid fa-bars text-2xl"></i>
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

      {/* FOOTER (unchanged) */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-12 px-4 sm:px-8">
        {/* ... (same as before) */}
      </footer>
    </div>
  );
}
