import { useEffect, useState } from 'react';
import axios from 'axios';
import { FetchedData } from '../contains/Types';

interface Props {
  prefCodes: number[];
}
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

function useFetchPopulation({ prefCodes }: Props): FetchedData[] | null {
  const [fetchedData, setFetchedData] = useState<FetchedData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (prefCodes.length === 0) {
          setFetchedData(null);
          return;
        }
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

    fetchData();
  }, [prefCodes]);

  return fetchedData;
}

export default useFetchPopulation;
