import { Link } from 'react-router-dom';
export default function Privacy() {
  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center space-x-2"><i className="fa-solid fa-arrow-left"></i> <span>Go Back</span></Link>
          <nav className="text-xs text-gray-400 flex items-center space-x-2 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Home</Link> <i className="fa-solid fa-chevron-right text-[8px]"></i> <span className="text-gray-200">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-light">Privacy Policy</h1>
          <p className="text-gray-300 text-sm max-w-2xl font-light">Last Updated: August 14, 2026</p>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>Grayscale Operating, LLC ("Grayscale", "we", "us", or "our") respects your privacy and is committed to protecting the personal information you share with us.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">1. Information We Collect</h2>
          <p>We may collect the following categories of personal information when you use our website, register for an account, or communicate with us:</p>
          <ul className="list-disc pl-5 space-y-1"><li><strong>Contact Information:</strong> Name, email address, postal address, phone number, and country of residence.</li><li><strong>Account Credentials:</strong> Usernames, passwords, and security questions.</li><li><strong>Financial Information:</strong> Accredited investor status, investment size preferences, and wallet addresses for transactional purposes.</li><li><strong>Technical Data:</strong> IP address, browser type, operating system, referring URLs, and usage data collected via cookies.</li></ul>
          <h2 className="text-2xl font-light text-gray-900 pt-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1"><li>To process your onboarding, maintain your account, and manage your investments.</li><li>To communicate with you regarding account updates, promotions, market insights, and educational content.</li><li>To comply with legal obligations, including Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations.</li><li>To improve our website functionality and user experience through analytics.</li></ul>
          <h2 className="text-2xl font-light text-gray-900 pt-4">3. Information Sharing</h2>
          <p>We do not sell your personal data. We may share your information with:</p>
          <ul className="list-disc pl-5 space-y-1"><li><strong>Service Providers:</strong> Third-party vendors who assist in hosting, marketing, data analytics, and legal compliance.</li><li><strong>Regulatory Authorities:</strong> As required by law, such as the SEC, FINRA, or tax authorities.</li><li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred.</li></ul>
          <h2 className="text-2xl font-light text-gray-900 pt-4">4. Cookies and Tracking Technologies</h2>
          <p>We use cookies to enhance your browsing experience. You may choose to disable cookies via your browser settings; however, this may affect the functionality of our site.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">5. Data Security</h2>
          <p>We implement appropriate technical and organizational measures, including encryption and access controls, to safeguard your data against unauthorized access, alteration, or destruction.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">6. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the use of your personal data. To exercise these rights, please contact us at <a href="mailto:privacy@grayscale.com" className="text-brand-accent hover:underline">privacy@grayscale.com</a>.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">7. Changes to This Policy</h2>
          <p>We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new policy on this page.</p>
        </div>
      </div>
    </div>
  );
}
