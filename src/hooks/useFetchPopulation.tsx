import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  prefCodes: number[];
}

interface Data {
  year: number;
  value: number;
}

interface FetchedData {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: Data[];
    }[];
  };
}

function useFetchPopulation({ prefCodes }: Props): FetchedData[] | null {
  const [fetchedData, setFetchedData] = useState<FetchedData[] | null>(null);
  const apiKey = process.env.REACT_APP_RESAS_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = prefCodes.map(async (prefCode) => {
          const ACCESS_URL = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`;
          const response = await axios.get<FetchedData>(ACCESS_URL, { headers: { 'X-API-KEY': apiKey } });
          return response.data;
        });

        const fetchedDataArray = await Promise.all(promises);

        setFetchedData(fetchedDataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchedData(null);
      }
    };

    if (apiKey && prefCodes.length > 0) {
      fetchData();
    }
  }, [prefCodes]);

  return fetchedData;
}

export default useFetchPopulation;
