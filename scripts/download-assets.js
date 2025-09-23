#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const https = require('https')

/**
 * Download assets from GitHub during build process
 * This ensures the site works without external dependencies
 */

const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets')

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true })
}

/**
 * Download a file from URL and save it locally
 */
function downloadFile(url, localPath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading: ${url}`)
    
    const file = fs.createWriteStream(localPath)
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
        return
      }
      
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        console.log(`✅ Downloaded: ${path.basename(localPath)}`)
        resolve()
      })
      
      file.on('error', (err) => {
        fs.unlink(localPath, () => {}) // Delete partial file
        reject(err)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

/**
 * Main function to download all assets
 */
async function downloadAssets() {
  try {
    console.log('🚀 Starting asset download...')
    
    // Load environment variables from .env.local (if it exists)
    const envPath = path.join(__dirname, '..', '.env.local')
    if (fs.existsSync(envPath)) {
      require('dotenv').config({ path: envPath })
    }
    
    // Get URLs from environment variables
    const profileImageUrl = process.env.NEXT_PUBLIC_PROFILE_IMAGE
    const contactNameSvgUrl = process.env.NEXT_PUBLIC_CONTACT_NAME_SVG
    const contactStreetSvgUrl = process.env.NEXT_PUBLIC_CONTACT_STREET_SVG
    const contactCitySvgUrl = process.env.NEXT_PUBLIC_CONTACT_CITY_SVG
    const contactCountrySvgUrl = process.env.NEXT_PUBLIC_CONTACT_COUNTRY_SVG
    
    const downloads = []
    
    // Download profile image
    if (profileImageUrl && profileImageUrl.startsWith('http')) {
      const profileImagePath = path.join(ASSETS_DIR, 'profile-image.jpg')
      downloads.push(
        downloadFile(profileImageUrl, profileImagePath)
      )
    }
    
    // Download contact SVGs
    if (contactNameSvgUrl && contactNameSvgUrl.startsWith('http')) {
      const nameSvgPath = path.join(ASSETS_DIR, 'contact-name.svg')
      downloads.push(downloadFile(contactNameSvgUrl, nameSvgPath))
    }
    
    if (contactStreetSvgUrl && contactStreetSvgUrl.startsWith('http')) {
      const streetSvgPath = path.join(ASSETS_DIR, 'contact-street.svg')
      downloads.push(downloadFile(contactStreetSvgUrl, streetSvgPath))
    }
    
    if (contactCitySvgUrl && contactCitySvgUrl.startsWith('http')) {
      const citySvgPath = path.join(ASSETS_DIR, 'contact-city.svg')
      downloads.push(downloadFile(contactCitySvgUrl, citySvgPath))
    }
    
    if (contactCountrySvgUrl && contactCountrySvgUrl.startsWith('http')) {
      const countrySvgPath = path.join(ASSETS_DIR, 'contact-country.svg')
      downloads.push(downloadFile(contactCountrySvgUrl, countrySvgPath))
    }
    
    // Wait for all downloads to complete
    await Promise.all(downloads)
    
    // Update environment variables for the current process
    process.env.NEXT_PUBLIC_PROFILE_IMAGE = '/assets/profile-image.jpg'
    process.env.NEXT_PUBLIC_CONTACT_NAME_SVG = '/assets/contact-name.svg'
    process.env.NEXT_PUBLIC_CONTACT_STREET_SVG = '/assets/contact-street.svg'
    process.env.NEXT_PUBLIC_CONTACT_CITY_SVG = '/assets/contact-city.svg'
    process.env.NEXT_PUBLIC_CONTACT_COUNTRY_SVG = '/assets/contact-country.svg'
    
    console.log('📝 Updated environment variables for local assets')
    
    console.log('✅ All assets downloaded successfully!')
    
  } catch (error) {
    console.error('❌ Error downloading assets:', error)
    process.exit(1)
  }
}

// Run the download process
downloadAssets()
