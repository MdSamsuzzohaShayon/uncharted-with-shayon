// shared/utils/helpers.ts

/**
 * Format a date string to a human-readable format
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

/**
 * Format a number with K/M suffixes
 */
export const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
}

/**
 * Format travel cost with currency
 */
export const formatTravelCost = (cost: number, currency: string = '৳'): string => {
    return `${currency}${cost.toLocaleString()}`
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatTimeAgo = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
}

/**
 * Validate if coordinates are valid
 */
export const hasValidCoordinates = (lat: any, lng: any): boolean => {
    return typeof lat === 'number' && typeof lng === 'number' &&
        !isNaN(lat) && !isNaN(lng) &&
        lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

/**
 * Get human-readable location string from coordinates
 */
export const getLocationString = (lat: any, lng: any): string => {
    if (!hasValidCoordinates(lat, lng)) return 'Location to be discovered'
    return `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(2)}°${lng >= 0 ? 'E' : 'W'}`
}

/**
 * Extract YouTube video ID from URL
 */
export const getYouTubeId = (url: string): string => {
    if (!url) return ''
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match?.[1] || ''
}

/**
 * Calculate reading time in minutes
 */
export const calculateReadingTime = (text: string): number => {
    if (!text) return 1
    const words = text.split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
}

/**
 * Render markdown content
 */
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})

export const renderMarkdown = (content: string): string => {
    return content ? md.render(content) : ''
}

/**
 * Truncate text to a specified length
 */
export const truncateText = (text: string, maxLength: number = 160): string => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}