'use client'

import { useState } from 'react'

// Interface for CVDownloadButton props
interface CVDownloadButtonProps {
  className?: string
  cvFileName?: string
  cvDisplayName?: string
}

export default function CVDownloadButton({ 
  className = '',
  cvFileName = 'cv.pdf',
  cvDisplayName = 'CV'
}: CVDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  
  // Check if CV is available (either locally or via URL)
  const cvUrl = process.env.NEXT_PUBLIC_CV_PDF_URL
  const isCvAvailable = cvUrl || true // Assume local file exists if no URL provided

  // Handle CV download button click
  const handleCVDownloadClick = async () => {
    try {
      setIsDownloading(true)
      console.log('Starting CV download')
      
      // Create download link for the CV file
      const link = document.createElement('a')
      
      // Use external URL if available, otherwise use local file
      if (cvUrl && cvUrl.startsWith('http')) {
        link.href = cvUrl
        link.target = '_blank'
        console.log('Using external CV URL:', cvUrl)
      } else {
        // For Vercel, files in public/ directory are served from root
        link.href = `/${cvFileName}` // CV files should be in public/ directory for Vercel
        link.target = '_blank' // Open in new tab as fallback
        console.log('Using local CV file:', cvFileName)
      }
      
      link.download = cvFileName
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log('CV download initiated successfully')
    } catch (error) {
      console.error('Error downloading CV:', error)
      // You could add a toast notification here for error handling
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      onClick={handleCVDownloadClick}
      disabled={isDownloading}
      className={`w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title={`Download ${cvDisplayName}`}
      aria-label={`Download ${cvDisplayName}`}
    >
      <div className="flex items-center justify-center space-x-3">
        {isDownloading ? (
          // Loading spinner
          <svg
            className="w-6 h-6 text-white animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        ) : (
          // CV/Resume icon
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
        <span className="text-white font-semibold text-lg">
          {isDownloading ? 'Downloading...' : `Download ${cvDisplayName}`}
        </span>
      </div>
    </button>
  )
}
