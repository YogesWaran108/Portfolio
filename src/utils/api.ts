/**
 * Dynamic API Base URL resolver.
 * Uses VITE_API_URL environment variable if set.
 * Automatically falls back to live Render backend if hosted on Netlify.
 * Uses relative path for local proxy server.
 */
export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  
  if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
    return 'https://protfolio-backend-ye50.onrender.com';
  }
  
  return '';
};
