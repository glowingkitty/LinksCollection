'use client'

import { useState, useEffect } from 'react'

interface ContactInfoProps {
  className?: string
}

export default function ContactInfo({ className = '' }: ContactInfoProps) {
  const [svgUrls, setSvgUrls] = useState({
    name: '',
    street: '',
    city: '',
    country: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSvgUrls = () => {
      try {
        setIsLoading(true)
        setError(null)

        // Get SVG URLs from environment variables
        const nameSvgUrl = process.env.NEXT_PUBLIC_CONTACT_NAME_SVG
        const streetSvgUrl = process.env.NEXT_PUBLIC_CONTACT_STREET_SVG
        const citySvgUrl = process.env.NEXT_PUBLIC_CONTACT_CITY_SVG
        const countrySvgUrl = process.env.NEXT_PUBLIC_CONTACT_COUNTRY_SVG

        if (!nameSvgUrl || !streetSvgUrl || !citySvgUrl || !countrySvgUrl) {
          throw new Error('Contact SVG URLs not configured')
        }

        setSvgUrls({
          name: nameSvgUrl,
          street: streetSvgUrl,
          city: citySvgUrl,
          country: countrySvgUrl
        })

        console.log('Contact SVG URLs loaded successfully')
      } catch (err) {
        console.error('Error loading SVG URLs:', err)
        setError(err instanceof Error ? err.message : 'Failed to load contact information')
      } finally {
        setIsLoading(false)
      }
    }

    loadSvgUrls()
  }, [])

  if (isLoading) {
    return (
      <div className={`text-white/90 space-y-2 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-32 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-48 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-40 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-24"></div>
        </div>
      </div>
    )
  }

  if (error) {
    console.warn('Contact info loading failed, using fallback:', error)
    return (
      <div className={`text-white/90 space-y-2 ${className}`}>
        <p><strong>Name:</strong> {process.env.NEXT_PUBLIC_PROFILE_NAME || 'Contact Name'}</p>
        <p><strong>Address:</strong> Street Address</p>
        <p><strong>Location:</strong> City, ZIP</p>
        <p><strong>Country:</strong> Country</p>
      </div>
    )
  }

  return (
    <div className={`text-white/90 space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <strong>Name:</strong>
        <img 
          src={svgUrls.name} 
          alt="Contact Name" 
          className="h-5 w-auto filter invert pointer-events-none select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onError={(e) => {
            console.error('Failed to load name SVG:', svgUrls.name)
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <strong>Address:</strong>
        <img 
          src={svgUrls.street} 
          alt="Street Address" 
          className="h-5 w-auto filter invert pointer-events-none select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onError={(e) => {
            console.error('Failed to load street SVG:', svgUrls.street)
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <strong>Location:</strong>
        <img 
          src={svgUrls.city} 
          alt="City and ZIP" 
          className="h-5 w-auto filter invert pointer-events-none select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onError={(e) => {
            console.error('Failed to load city SVG:', svgUrls.city)
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <strong>Country:</strong>
        <img 
          src={svgUrls.country} 
          alt="Country" 
          className="h-5 w-auto filter invert pointer-events-none select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onError={(e) => {
            console.error('Failed to load country SVG:', svgUrls.country)
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
    </div>
  )
}
