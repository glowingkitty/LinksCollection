#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const https = require('https')
const sharp = require('sharp')

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
 * Generate favicon from profile image
 */
async function generateFavicon(profileImagePath) {
  try {
    console.log('🎨 Generating favicon from profile image...')
    
    // Generate multiple favicon sizes
    const faviconSizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 64, name: 'favicon-64x64.png' },
      { size: 96, name: 'favicon-96x96.png' },
      { size: 128, name: 'favicon-128x128.png' },
      { size: 192, name: 'favicon-192x192.png' },
      { size: 256, name: 'favicon-256x256.png' }
    ]
    
    const publicDir = path.join(__dirname, '..', 'public')
    
    // Generate each favicon size
    for (const { size, name } of faviconSizes) {
      const outputPath = path.join(publicDir, name)
      await sharp(profileImagePath)
        .resize(size, size, { fit: 'cover' })
        .png()
        .toFile(outputPath)
      console.log(`✅ Generated: ${name}`)
    }
    
    // Generate ICO file (favicon.ico) - 32x32 size
    const icoPath = path.join(publicDir, 'favicon.ico')
    await sharp(profileImagePath)
      .resize(32, 32, { fit: 'cover' })
      .png()
      .toFile(icoPath)
    console.log('✅ Generated: favicon.ico')
    
    // Generate Apple touch icon
    const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png')
    await sharp(profileImagePath)
      .resize(180, 180, { fit: 'cover' })
      .png()
      .toFile(appleTouchPath)
    console.log('✅ Generated: apple-touch-icon.png')
    
    console.log('🎨 Favicon generation completed!')
    
  } catch (error) {
    console.error('❌ Error generating favicon:', error)
    throw error
  }
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
    
    // Generate favicon from the downloaded profile image
    const profileImagePath = path.join(ASSETS_DIR, 'profile-image.jpg')
    if (fs.existsSync(profileImagePath)) {
      await generateFavicon(profileImagePath)
    }
    
    // Create a marker file to indicate that local assets are available
    const markerPath = path.join(__dirname, '..', 'public', 'assets', '.local-assets-available')
    fs.writeFileSync(markerPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      assets: [
        'profile-image.jpg',
        'contact-name.svg',
        'contact-street.svg',
        'contact-city.svg',
        'contact-country.svg'
      ]
    }, null, 2))
    
    console.log('📝 Created marker file for local assets')
    
    console.log('✅ All assets downloaded successfully!')
    
  } catch (error) {
    console.error('❌ Error downloading assets:', error)
    process.exit(1)
  }
}

// Run the download process
downloadAssets()
