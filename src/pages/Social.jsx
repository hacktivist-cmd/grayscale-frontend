import { Link } from 'react-router-dom';
export default function Social() {
  return (
    <div>
      <div className="bg-brand-purple text-white py-16 px-4 sm:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center space-x-2"><i className="fa-solid fa-arrow-left"></i> <span>Go Back</span></Link>
          <nav className="text-xs text-gray-400 flex items-center space-x-2 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Home</Link> <i className="fa-solid fa-chevron-right text-[8px]"></i> <span className="text-gray-200">Social Media Disclosure</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-light">Social Media Disclosure</h1>
          <p className="text-gray-300 text-sm max-w-2xl font-light">Last Updated: August 14, 2026</p>
        </div>
      </div>
      <div className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>Grayscale ("we", "our", "us") maintains a presence on various social media platforms, including but not limited to X (formerly Twitter), LinkedIn, YouTube, Instagram, and Facebook. This disclosure outlines the terms regarding our social media communications.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">1. Not Financial Advice</h2>
          <p>All content, opinions, and data shared on our social media channels are for informational and educational purposes only and do not constitute financial, investment, legal, or tax advice. Grayscale is not acting as a fiduciary or financial advisor by providing such content.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">2. Investment Risks</h2>
          <p>Discussions regarding digital assets and cryptocurrency investments are subject to high levels of market risk. Social media posts should not be used as the sole basis for any investment decision. Past performance is not an indication of future results.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">3. Third-Party Content</h2>
          <p>We may share, re-post, or link to content provided by third parties. This does not constitute an endorsement of the views, products, or services of those third parties. Grayscale is not responsible for the accuracy or reliability of third-party content.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">4. Forward-Looking Statements</h2>
          <p>Our communications may contain forward-looking statements. Actual results may differ materially from those expressed or implied. We undertake no obligation to publicly update any forward-looking statements, whether as a result of new information, future events, or otherwise.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">5. Privacy and Interactions</h2>
          <p>While we encourage open dialogue, please refrain from posting sensitive personal or financial information publicly on our social media pages. Communications via social media are not secure. To discuss private account matters, please contact us via our official support channels.</p>
          <h2 className="text-2xl font-light text-gray-900 pt-4">6. Our Official Channels</h2>
          <p>For official announcements, product updates, and compliance information, please refer to our official website at <a href="https://www.grayscale.com" className="text-brand-accent hover:underline">www.grayscale.com</a>. Always verify the authenticity of any Grayscale-related social media account.</p>
        </div>
      </div>
    </div>
  );
}
