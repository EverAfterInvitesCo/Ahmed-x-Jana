export function getAssetUrl(fileName: string): string {
  const cleanName = fileName.replace(/^\/?(public\/)?/, '');
  const baseUrl = import.meta.env.BASE_URL || './';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${cleanName}`;
}

export const MEDIA_ASSETS = {
  gatesVideo: getAssetUrl('gates.mp4'),
  dovesVideo: getAssetUrl('doves.mp4'),
  // Direct absolute path starting from root BASE_URL
  backgroundImg: `${import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/'}bg.png`,
};