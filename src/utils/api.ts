/**
 * Dynamic API Base URL resolver.
 * Uses VITE_API_URL environment variable if set.
 * Automatically falls back to live Render backend if hosted on Vercel, Netlify, or any production domain.
 * Uses relative path for local proxy server.
 */
export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Route any production deployment (Vercel, Netlify, Custom Domain) to live Render backend
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return 'https://protfolio-backend-ye50.onrender.com';
    }
  }
  
  return '';
};
