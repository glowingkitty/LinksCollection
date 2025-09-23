'use client'

import { useState, useEffect } from 'react'
import { getContactSvgPaths } from '../utils/asset-utils'

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

        // Get SVG paths, preferring local assets
        const svgPaths = getContactSvgPaths()

        setSvgUrls(svgPaths)

        console.log('Contact SVG paths loaded successfully:', svgPaths)
      } catch (err) {
        console.error('Error loading SVG paths:', err)
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
    // Try to use local assets even in error state
    const fallbackPaths = getContactSvgPaths()
    return (
      <div className={`text-white/90 space-y-4 ${className}`}>
        <div className="flex items-center space-x-2">
          <strong>Name:</strong>
          <img 
            src={fallbackPaths.name} 
            alt="Contact Name" 
            className="h-5 w-auto filter invert pointer-events-none select-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="flex items-center space-x-2">
          <strong>Address:</strong>
          <img 
            src={fallbackPaths.street} 
            alt="Street Address" 
            className="h-5 w-auto filter invert pointer-events-none select-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="flex items-center space-x-2">
          <strong>Location:</strong>
          <img 
            src={fallbackPaths.city} 
            alt="City and ZIP" 
            className="h-5 w-auto filter invert pointer-events-none select-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="flex items-center space-x-2">
          <strong>Country:</strong>
          <img 
            src={fallbackPaths.country} 
            alt="Country" 
            className="h-5 w-auto filter invert pointer-events-none select-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
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
