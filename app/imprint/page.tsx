import ContactInfo from '../components/ContactInfo'

export default function Imprint() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Legal Notice / Imprint
            </h1>
            <p className="text-white/90 text-lg">
              Information according to § 5 TMG (German Telemedia Act)
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <ContactInfo className="mb-4" />
              <div className="text-white/90 space-y-2">
                <p><strong>Email:</strong> {process.env.NEXT_PUBLIC_CONTACT_EMAIL}</p>
                <p><strong>Website:</strong> {process.env.NEXT_PUBLIC_WEBSITE_URL}</p>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Responsible for Content</h2>
              <p className="text-white/90">
                The content of this website is created and maintained by the website operator. 
                All information is provided to the best of our knowledge and belief.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Disclaimer</h2>
              <div className="text-white/90 space-y-4">
                <p>
                  <strong>Liability for Contents:</strong> As service providers, we are liable for 
                  own contents of these websites according to Sec. 7, paragraph 1 German TMG (Telemediengesetz). 
                  However, according to Sec. 8 to 10 German TMG, service providers are not under obligation 
                  to permanently monitor submitted or stored information or to search for evidence that 
                  indicate illegal activities.
                </p>
                <p>
                  <strong>Liability for Links:</strong> Our offer contains links to external websites 
                  of third parties, on whose contents we have no influence. Therefore, we cannot assume 
                  any liability for these external contents. The respective provider or operator of the 
                  pages is always responsible for the contents of the linked pages.
                </p>
                <p>
                  <strong>Copyright:</strong> The contents and works created by the site operators 
                  on these pages are subject to German copyright law. The reproduction, processing, 
                  distribution and any kind of commercial use of such material beyond the scope of 
                  the copyright law shall require the prior written consent of its respective author or creator.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 mt-8">Hosting</h2>
              <p className="text-white/90">
                This website is hosted on Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. 
                For more information about Vercel's data processing, please visit their 
                <a href="https://vercel.com/legal/privacy-policy" className="text-blue-300 hover:text-blue-200 underline" target="_blank" rel="noopener noreferrer">
                  privacy policy
                </a>.
              </p>
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


