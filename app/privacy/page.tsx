import ContactInfo from '../components/ContactInfo'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/90 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <div className="text-white/90 space-y-4">
                <p>
                  This website is a simple link collection page. We do not collect any personal data 
                  through forms, cookies, or tracking mechanisms. The only data processed is:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Basic website analytics (anonymous, provided by Vercel hosting)</li>
                  <li>Server logs for technical maintenance (IP addresses, timestamps)</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. How We Use Your Information</h2>
              <div className="text-white/90 space-y-4">
                <p>
                  Since we don't collect personal data, there's no personal information to use. 
                  Any server logs are used solely for:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Technical maintenance and security</li>
                  <li>Anonymous usage statistics</li>
                  <li>Performance optimization</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Third-Party Services</h2>
              <div className="text-white/90 space-y-4">
                <p>
                  <strong>Vercel Hosting:</strong> This website is hosted on Vercel Inc. 
                  Vercel may collect certain technical data as part of their hosting services. 
                  For details, please review Vercel's 
                  <a href="https://vercel.com/legal/privacy-policy" className="text-blue-300 hover:text-blue-200 underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>.
                </p>
                <p>
                  <strong>External Links:</strong> This website contains links to external websites 
                  (social media, professional profiles, etc.). We have no control over the privacy 
                  practices of these external sites. Please review their respective privacy policies 
                  before providing any personal information.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Data Security</h2>
              <p className="text-white/90">
                We implement appropriate security measures to protect any data processed by this website. 
                However, no method of transmission over the internet is 100% secure. While we strive 
                to protect your information, we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Your Rights</h2>
              <div className="text-white/90 space-y-4">
                <p>
                  Since we don't collect personal data, there's no personal information to access, 
                  modify, or delete. If you have any concerns about data processing, please contact us.
                </p>
                <p>
                  <strong>Contact:</strong> For any privacy-related questions, please contact us:
                </p>
                <ContactInfo className="ml-4" />
                <p className="mt-2">
                  <strong>Email:</strong> 
                  <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} className="text-blue-300 hover:text-blue-200 underline ml-2">
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                  </a>
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. Changes to This Policy</h2>
              <p className="text-white/90">
                We may update this privacy policy from time to time. Any changes will be posted on this 
                page with an updated revision date. We encourage you to review this policy periodically.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Disclaimer for External Links</h2>
              <div className="text-white/90 space-y-4">
                <p>
                  <strong>Important:</strong> This website contains links to external websites and services. 
                  We have no control over the content, privacy practices, or security of these external sites. 
                  When you click on external links, you will be redirected to third-party websites that are 
                  not operated by us.
                </p>
                <p>
                  <strong>Your Responsibility:</strong> Please exercise caution and review the privacy 
                  policies and terms of service of any external websites you visit. We are not responsible 
                  for any data collection, privacy practices, or security measures of external websites.
                </p>
                <p>
                  <strong>Common External Services:</strong> Links may include but are not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Social media platforms (GitHub, Instagram, LinkedIn, etc.)</li>
                  <li>Communication services (Signal, Telegram, WhatsApp)</li>
                  <li>Professional networks and portfolio sites</li>
                  <li>Email services and contact forms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


