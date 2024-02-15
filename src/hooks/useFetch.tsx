/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  url: string;
  headers?: { 'X-API-KEY': string };
}

interface FetchResult<T> {
  data: T | null;
  error: any;
}

function useFetch<T>({ url, headers }: Props): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
        setData(response.data);
        setError(null);
      } catch (e: any) {
        if (e.response) {
          setError(e.response.data.message);
        } else {
          setError('データ取得に失敗しました。');
        }
      }
    };
    fetchData();
  }, [url, headers]);

  return { data, error };
}

export default useFetch;
