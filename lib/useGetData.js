// useSWRData.js
import useSWR from 'swr';
import { getPortfolioData } from '../src/lib/supabase';

export default function useGetData(url) {
  // Check if it's a local JSON file or database data
  const isLocalFile = url.startsWith('/data/');
  
  const fetcher = async (key) => {
    if (isLocalFile) {
      // Extract section name from URL
      const section = key.replace('/data/', '').replace('.json', '');
      
      // Try to get data from database first
      const dbData = await getPortfolioData(section);
      
      if (dbData) {
        return dbData;
      }
      
      // Fallback to local JSON file
      const response = await fetch(key);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    } else {
      // Regular fetch for other URLs
      const response = await fetch(key);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    }
  };

  const { data, error, isValidating, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    loading: !data && !error,
    isValidating,
    mutate
  };
}