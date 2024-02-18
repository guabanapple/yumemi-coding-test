import { useEffect, useState } from 'react';
import { fetchData } from '../axios';

interface Pref {
  prefCode: number;
  prefName: string;
  checked: boolean;
}

const ACCESS_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

function useFetchPref(): Pref[] | null {
  const [prefData, setPrefData] = useState<Pref[] | null>(null);

  useEffect(() => {
    if (!apiKey) {
      console.log('Failed to get api key.');
      return;
    }

    const fetchDataFromAPI = async () => {
      try {
        const data = await fetchData(ACCESS_URL, apiKey);
        setPrefData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchDataFromAPI();
  }, []);

  return prefData;
}

export default useFetchPref;
