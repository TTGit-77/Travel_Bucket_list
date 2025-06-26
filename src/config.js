// Backend URL configuration
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://travel-bucket-list-backend.onrender.com';

export const API_BASE_URL = BACKEND_URL;

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'API request failed');
  }
  
  return response.json();
}; 