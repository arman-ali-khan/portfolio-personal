// useSWRData.js
import useSWR from 'swr';

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

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}   
