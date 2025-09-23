'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getProfileImagePath } from './utils/asset-utils'

// Interface for link data structure
interface LinkData {
  title: string
  url: string
  icon?: string
}

// Interface for profile data
interface ProfileData {
  name: string
  bio: string
  image: string
}

export default function Home() {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Your Name',
    bio: 'Your bio or description',
    image: '/default-avatar.png'
  })
  const [links, setLinks] = useState<LinkData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load profile data from environment variables
    const profileName = process.env.NEXT_PUBLIC_PROFILE_NAME || 'Your Name'
    const profileBio = process.env.NEXT_PUBLIC_PROFILE_BIO || 'Your bio or description'
    const profileImage = getProfileImagePath()
    
    setProfile({
      name: profileName,
      bio: profileBio,
      image: profileImage
    })

    // Load links from environment variables
    try {
      const linksJson = process.env.NEXT_PUBLIC_LINKS || '[]'
      const parsedLinks = JSON.parse(linksJson)
      setLinks(parsedLinks)
      console.log('Loaded links:', parsedLinks)
    } catch (error) {
      console.error('Error parsing links from environment variables:', error)
      // Fallback links for development
      setLinks([
        {
          title: 'GitHub',
          url: 'https://github.com',
          icon: '🐙'
        },
        {
          title: 'Twitter',
          url: 'https://twitter.com',
          icon: '🐦'
        },
        {
          title: 'LinkedIn',
          url: 'https://linkedin.com',
          icon: '💼'
        }
      ])
    }

    setIsLoading(false)
  }, [])

  // Handle link click with analytics tracking
  const handleLinkClick = (link: LinkData) => {
    console.log(`Link clicked: ${link.title} -> ${link.url}`)
    // You can add analytics tracking here if needed
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-8">
            {/* Profile Image with rounded circle and shadow */}
            <div className="mb-6">
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src={profile.image}
                  alt={`${profile.name} profile picture`}
                  fill
                  className="rounded-full object-cover shadow-2xl border-4 border-white/20"
                  priority
                />
              </div>
            </div>
            
            {/* Profile Name */}
            <h1 className="text-3xl font-bold text-white mb-2">
              {profile.name}
            </h1>
            
            {/* Profile Bio */}
            <p className="text-white/90 text-lg mb-8">
              {profile.bio}
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            {links.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <div className="flex items-center justify-center space-x-3">
                  {link.icon && (
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                  )}
                  <span className="text-white font-semibold text-lg">
                    {link.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <div className="flex justify-center space-x-6 mb-4">
              <a 
                href="/imprint" 
                className="text-white/70 hover:text-white text-sm underline transition-colors duration-300"
              >
                Imprint
              </a>
              <a 
                href="/privacy" 
                className="text-white/70 hover:text-white text-sm underline transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </div>
            <p className="text-white/70 text-sm">
              © 2024 {process.env.NEXT_PUBLIC_PROFILE_NAME}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
