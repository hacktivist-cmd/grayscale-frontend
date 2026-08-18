export default function Contact() {
  const handleSubmit = (e) => { e.preventDefault(); alert('Your message has been received. Our support team will contact you within 24 hours.'); };
  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-4xl font-light">Contact Us</h1>
          <p className="text-gray-300 text-sm">To get in touch with our team, please fill out the form below, or call our support line at <strong className="text-white">+1 (531) 377-9211</strong>.</p>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block font-bold text-gray-700 mb-1">First Name*</label><input type="text" required className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none" /></div><div><label className="block font-bold text-gray-700 mb-1">Last Name*</label><input type="text" required className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none" /></div></div>
            <div><label className="block font-bold text-gray-700 mb-1">Email*</label><input type="email" required className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none" /></div>
            <div><label className="block font-bold text-gray-700 mb-1">Phone Number</label><div className="flex"><span className="bg-gray-200 border border-r-0 border-gray-300 px-3 py-2.5 rounded-l text-gray-600 flex items-center space-x-1"><span>🇺🇸</span> <span className="font-medium">+1</span></span><input type="tel" className="w-full p-2.5 border border-gray-300 rounded-r focus:border-brand-purple focus:outline-none" /></div></div>
            <div><label className="block font-bold text-gray-700 mb-1">Country*</label><select required className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none bg-white"><option value="">Select country...</option><option value="US">United States</option><option value="CA">Canada</option><option value="UK">United Kingdom</option><option value="NG">Nigeria</option></select></div>
            <div><label className="block font-bold text-gray-700 mb-1">How can we help you?</label><textarea rows="4" className="w-full p-2.5 border border-gray-300 rounded focus:border-brand-purple focus:outline-none"></textarea></div>
            <button type="submit" className="w-full bg-brand-accent text-white font-bold uppercase tracking-wider py-3 rounded hover:bg-brand-accentHover transition">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}
