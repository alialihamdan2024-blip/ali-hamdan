
/**
 * Utility to process image URLs.
 * 
 * - If the URL is a local API proxy (starts with /api), return as is.
 * - Otherwise, use an external caching proxy (wsrv.nl) for optimization.
 * 
 * @param url - The original source URL of the image
 * @param width - Desired width for optimization (default: 800px)
 * @returns The processed image URL
 */
export const cleanImageUrl = (url: string | undefined, width: number = 800): string => {
  if (!url) return '';
  
  // If it's already a local proxy URL, return it directly
  if (url.startsWith('/api') || url.startsWith('data:')) {
      return url;
  }
  
  let clean = url;
  
  // Fix common issue where URLs might be doubled up (e.g. proxy appended twice)
  if (clean.includes('http') && clean.lastIndexOf('http') > 0) {
    clean = clean.substring(clean.lastIndexOf('http'));
  }
  
  // URL Encode the source to safely pass it as a query parameter
  const encodedUrl = encodeURIComponent(clean);
  
  // Construct the proxy URL
  // w: width
  // q: quality (80%)
  // output: webp (modern, smaller format)
  // il: interlaced (progressive loading)
  // maxage: 1y (Cache for 1 year to prevent loss if source is deleted)
  return `https://wsrv.nl/?url=${encodedUrl}&w=${width}&q=80&output=webp&il&maxage=1y`;
};
