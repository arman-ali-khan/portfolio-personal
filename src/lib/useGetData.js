import useSWR from 'swr';

// Simple fetcher function that handles both local JSON and potential Supabase data
const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export default function useGetData(url) {
  const { data, error, isValidating, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    loading: !data && !error,
    isValidating,
    mutate
  };
}