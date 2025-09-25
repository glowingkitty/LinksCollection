'use client'

import { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'

// Interface for ShareButton props
interface ShareButtonProps {
  className?: string
}

export default function ShareButton({ className = '' }: ShareButtonProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [isGeneratingQR, setIsGeneratingQR] = useState(false)
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const overlayRef = useRef<HTMLDivElement>(null)

  // Get current page URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
      console.log('Current page URL:', window.location.href)
    }
  }, [])

  // Generate QR code when overlay opens
  useEffect(() => {
    if (isOverlayOpen && !qrCodeDataUrl && currentUrl) {
      generateQRCode()
    }
  }, [isOverlayOpen, qrCodeDataUrl, currentUrl])

  // Generate QR code for the current page URL
  const generateQRCode = async () => {
    if (!currentUrl) return
    
    try {
      setIsGeneratingQR(true)
      console.log(`Generating QR code for current page: ${currentUrl}`)
      
      // Generate QR code as data URL
      const qrDataUrl = await QRCode.toDataURL(currentUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      setQrCodeDataUrl(qrDataUrl)
      console.log('QR code generated successfully')
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGeneratingQR(false)
    }
  }

  // Handle share button click
  const handleShareClick = () => {
    console.log('Share button clicked for current page')
    setIsOverlayOpen(true)
  }

  // Handle overlay close
  const handleCloseOverlay = () => {
    console.log('Closing share overlay')
    setIsOverlayOpen(false)
  }

  // Handle overlay background click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleCloseOverlay()
    }
  }

  // Handle copy URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      console.log('URL copied to clipboard:', currentUrl)
      // You could add a toast notification here
    } catch (error) {
      console.error('Error copying URL to clipboard:', error)
    }
  }

  return (
    <>
      {/* Share Button */}
      <button
        onClick={handleShareClick}
        className={`w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group ${className}`}
        title="Share this link collection"
        aria-label="Share this link collection"
      >
        <div className="flex items-center justify-center space-x-3">
          <svg
            className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          <span className="text-white font-semibold text-lg">
            Share
          </span>
        </div>
      </button>

      {/* QR Code Overlay */}
      {isOverlayOpen && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-sm w-full mx-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                Share Link Collection
              </h3>
              <button
                onClick={handleCloseOverlay}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
                aria-label="Close overlay"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center space-y-4">
              {isGeneratingQR ? (
                <div className="w-64 h-64 flex items-center justify-center bg-white/5 rounded-xl">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              ) : qrCodeDataUrl ? (
                <div className="bg-white p-4 rounded-xl">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR code for this link collection"
                    className="w-64 h-64"
                  />
                </div>
              ) : (
                <div className="w-64 h-64 flex items-center justify-center bg-white/5 rounded-xl">
                  <span className="text-white/70">Failed to generate QR code</span>
                </div>
              )}

              {/* URL Display and Copy Button */}
              <div className="w-full">
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                  <p className="text-white/80 text-sm break-all">
                    {currentUrl}
                  </p>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2 px-4 text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  Copy URL
                </button>
              </div>

              {/* Instructions */}
              <p className="text-white/70 text-sm text-center">
                Scan the QR code with your phone to open the link
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
