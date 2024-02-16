/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pref {
  prefCode: number;
  prefName: string;
  checked: boolean;
}

const ACCESS_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

function useFetchPref(): Pref[] | null {
  const [prefData, setPrefData] = useState<Pref[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiKey) {
      console.log('Failed to get api key.');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(ACCESS_URL, { headers: { 'X-API-KEY': apiKey } });
        setPrefData(response.data.result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }
  }, [loading]);

  return prefData;
}

export default useFetchPref;
