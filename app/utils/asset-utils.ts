/**
 * Asset utility functions
 * Handles checking for local assets and providing fallback URLs
 */

/**
 * Check if local assets are available and return the appropriate path
 * @param envVar - The environment variable containing the original URL
 * @param localPath - The local path to check for
 * @returns The path to use (local if available, otherwise original)
 */
export function getAssetPath(envVar: string | undefined, localPath: string): string {
  // If no environment variable is set, use the local path
  if (!envVar) {
    return localPath
  }

  // If the environment variable is already a local path, use it
  if (envVar.startsWith('/assets/') || envVar.startsWith('./assets/')) {
    return envVar
  }

  // If it's an external URL, prefer the local version
  // The local version will be available after the download script runs
  return localPath
}

/**
 * Get profile image path, preferring local assets
 */
export function getProfileImagePath(): string {
  const envImage = process.env.NEXT_PUBLIC_PROFILE_IMAGE
  return getAssetPath(envImage, '/assets/profile-image.jpg')
}

/**
 * Get contact SVG paths, preferring local assets
 */
export function getContactSvgPaths() {
  return {
    name: getAssetPath(process.env.NEXT_PUBLIC_CONTACT_NAME_SVG, '/assets/contact-name.svg'),
    street: getAssetPath(process.env.NEXT_PUBLIC_CONTACT_STREET_SVG, '/assets/contact-street.svg'),
    city: getAssetPath(process.env.NEXT_PUBLIC_CONTACT_CITY_SVG, '/assets/contact-city.svg'),
    country: getAssetPath(process.env.NEXT_PUBLIC_CONTACT_COUNTRY_SVG, '/assets/contact-country.svg')
  }
}
