/**
 * Utility functions for handling bio text formatting
 */

/**
 * Splits bio text into multiple lines based on periods followed by spaces
 * Example: "Designer, developer, maker. Into hackspaces, AI & learning."
 * Becomes: ["Designer, developer, maker.", "Into hackspaces, AI & learning."]
 * 
 * @param bioText - The bio text to split
 * @returns Array of text segments that should be displayed on separate lines
 */
export function splitBioText(bioText: string): string[] {
  if (!bioText || bioText.trim() === '') {
    return [bioText]
  }

  // Split on periods followed by a space, but preserve the period
  // This regex matches a period followed by a space, and captures both
  const segments = bioText.split(/(\.\s+)/)
  
  // Filter out empty strings and combine periods with their preceding text
  const result: string[] = []
  let currentSegment = ''
  
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    
    if (segment === '. ') {
      // This is a period followed by space, add it to current segment and push
      currentSegment += '.'
      result.push(currentSegment.trim())
      currentSegment = ''
    } else if (segment.trim() !== '') {
      // This is text content, add it to current segment
      currentSegment += segment
    }
  }
  
  // Add any remaining content
  if (currentSegment.trim() !== '') {
    result.push(currentSegment.trim())
  }
  
  // If no splits were made, return the original text
  return result.length > 0 ? result : [bioText]
}

/**
 * Formats bio text for display with proper line breaks
 * 
 * @param bioText - The bio text to format
 * @returns Array of text segments for rendering with line breaks
 */
export function formatBioForDisplay(bioText: string): string[] {
  return splitBioText(bioText)
}
