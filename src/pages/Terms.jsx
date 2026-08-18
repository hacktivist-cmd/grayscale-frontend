import { Link } from 'react-router-dom';
export default function Terms() {
  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center space-x-2"><i className="fa-solid fa-arrow-left"></i> <span>Go Back</span></Link>
          <nav className="text-xs text-gray-400 flex items-center space-x-2 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Home</Link> <i className="fa-solid fa-chevron-right text-[8px]"></i> <span className="text-gray-200">Terms of Service</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-light">Terms of Service</h1>
          <p className="text-gray-300 text-sm max-w-2xl font-light">Last Updated: August 14, 2026</p>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>Welcome to Grayscale. By accessing or using our website, products, and services, you agree to comply with and be bound by the following Terms of Service.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">1. Acceptance of Terms</h2>
          <p>By creating an account or using any Grayscale service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our services.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">2. Eligibility</h2>
          <p>Our services are intended solely for individuals who are at least 18 years of age and are legal residents of the United States or other permitted jurisdictions. Products offered may only be available to Accredited Investors as defined under Rule 501(a) of the Securities Act of 1933.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">3. Use of the Website</h2>
          <p>You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of, this site by any third party.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">4. Intellectual Property</h2>
          <p>All content on this website, including but not limited to text, graphics, logos, and software, is the property of Grayscale and is protected by U.S. and international copyright laws. Unauthorized use of our trademarks or content is strictly prohibited.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">5. Investment Risks</h2>
          <p>Investments in digital assets and cryptocurrency products are speculative and involve high degrees of risk, including the potential loss of the entire principal amount invested. Past performance does not guarantee future results. You should consult with your financial advisor before making any investment decisions.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Grayscale shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the site or services.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">7. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Connecticut, without regard to its conflict of law provisions.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">8. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact our support team at <a href="mailto:support@grayscale.com" className="text-brand-accent hover:underline">support@grayscale.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
