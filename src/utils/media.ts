/**
 * Resolves public media asset URLs cleanly regardless of GitHub Pages subpaths.
 */
export function getAssetUrl(fileName: string): string {
  // If user passes a full URL or absolute path, clean it up
  const cleanName = fileName.replace(/^\/?(public\/)?/, '');
  
  // import.meta.env.BASE_URL is provided by Vite (e.g. './' or '/repo-name/')
  const baseUrl = import.meta.env.BASE_URL || './';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  return `${normalizedBase}${cleanName}`;
}

export const MEDIA_ASSETS = {
  gatesVideo: getAssetUrl('gates.mp4'),
  dovesVideo: getAssetUrl('doves.mp4'),
  backgroundImg: getAssetUrl('bg.png'),
};