import { supabase, getPortfolioData } from './supabase';

// Enhanced data fetcher that tries Supabase first, then falls back to local JSON
export const fetchData = async (endpoint) => {
  try {
    // Extract section name from endpoint (e.g., '/data/personal.json' -> 'personal')
    const section = endpoint.replace('/data/', '').replace('.json', '');
    
    // Try to get data from Supabase first
    const supabaseData = await getPortfolioData(section);
    
    if (supabaseData) {
      return supabaseData;
    }
    
    // Fallback to local JSON files
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && url !== 'your_supabase_url_here' && key !== 'your_supabase_anon_key_here';
};