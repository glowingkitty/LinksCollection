#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * Vercel build script that downloads assets and builds the project
 */

async function vercelBuild() {
  try {
    console.log('🚀 Starting Vercel build process...')
    
    // Download assets first
    console.log('📥 Downloading external assets...')
    execSync('node scripts/download-assets.js', { stdio: 'inherit' })
    
    // Build the Next.js project
    console.log('🔨 Building Next.js project...')
    execSync('next build', { stdio: 'inherit' })
    
    console.log('✅ Vercel build completed successfully!')
    
  } catch (error) {
    console.error('❌ Vercel build failed:', error)
    process.exit(1)
  }
}

vercelBuild()
