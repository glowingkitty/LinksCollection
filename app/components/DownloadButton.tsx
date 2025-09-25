'use client'

import { useState } from 'react'

// Interface for DownloadButton props
interface DownloadButtonProps {
  className?: string
}

// Interface for contact data structure
interface ContactData {
  name: string
  bio: string
  email: string
  website: string
  links: Array<{
    title: string
    url: string
    icon?: string
  }>
}

export default function DownloadButton({ className = '' }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  // Generate vCard content from environment data
  const generateVCard = (): string => {
    console.log('Generating vCard from environment data')
    
    // Get data from environment variables
    const name = process.env.NEXT_PUBLIC_PROFILE_NAME || 'Your Name'
    const firstname = process.env.NEXT_PUBLIC_FIRSTNAME || ''
    const bio = process.env.NEXT_PUBLIC_PROFILE_BIO || 'Your bio or description'
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''
    const website = process.env.NEXT_PUBLIC_WEBSITE_URL || ''
    
    // Parse links from environment
    let links: Array<{ title: string; url: string; icon?: string }> = []
    try {
      const linksJson = process.env.NEXT_PUBLIC_LINKS || '[]'
      links = JSON.parse(linksJson)
      console.log('Parsed links for vCard:', links)
    } catch (error) {
      console.error('Error parsing links for vCard:', error)
    }

    // Generate vCard content
    let vcard = 'BEGIN:VCARD\n'
    vcard += 'VERSION:3.0\n'
    // Use firstname as the main name, profile name as nickname/display name
    const mainName = firstname || name
    vcard += `FN:${mainName}\n`
    vcard += `N:${mainName};;;\n`
    
    // Add profile name as nickname if it's different from firstname
    if (name && name !== firstname) {
      vcard += `NICKNAME:${name}\n`
    }
    
    if (email) {
      vcard += `EMAIL:${email}\n`
    }
    
    if (website) {
      vcard += `URL:${website}\n`
    }
    
    // Add bio as note
    if (bio) {
      vcard += `NOTE:${bio}\n`
    }
    
    // Add social links as URLs with labels
    links.forEach((link, index) => {
      if (link.url) {
        vcard += `URL;TYPE=${link.title}:${link.url}\n`
      }
    })
    
    vcard += 'END:VCARD\n'
    
    console.log('Generated vCard content:', vcard)
    return vcard
  }

  // Handle download button click
  const handleDownloadClick = async () => {
    try {
      setIsDownloading(true)
      console.log('Starting contact book download')
      
      // Generate vCard content
      const vcardContent = generateVCard()
      
      // Create blob and download
      const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)
      
      // Create download link
      const link = document.createElement('a')
      link.href = url
      link.download = `${process.env.NEXT_PUBLIC_PROFILE_NAME || 'contact'}.vcf`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      window.URL.revokeObjectURL(url)
      
      console.log('Contact book downloaded successfully')
    } catch (error) {
      console.error('Error downloading contact book:', error)
      // You could add a toast notification here for error handling
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownloadClick}
      disabled={isDownloading}
      className={`w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title="Download contact book"
      aria-label="Download contact book"
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
          // Download icon
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
        <span className="text-white font-semibold text-lg">
          {isDownloading ? 'Downloading...' : 'Download'}
        </span>
      </div>
    </button>
  )
}
