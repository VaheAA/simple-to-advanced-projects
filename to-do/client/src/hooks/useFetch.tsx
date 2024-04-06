import { useState } from 'react';

interface FetchState<T> {
  data: T | null;
  error: any | null;
  loading: boolean;
}

export default function useFetch<T>(): {
  state: FetchState<T>;
  fetchRequest: (url: string, options?: RequestInit) => Promise<void>;
} {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false // Initially not loading
  });

  const fetchRequest = async (url: string, options?: RequestInit) => {
    setState({ ...state, loading: true }); // Update loading status
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = (await response.json()) as T;

      setState({ data, error: null, loading: false });
    } catch (error) {
      setState({ data: null, error, loading: false });
    }
  };

  return { state, fetchRequest };
}
