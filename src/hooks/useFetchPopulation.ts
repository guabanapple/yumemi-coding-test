import { useEffect, useState } from 'react';
import axios from 'axios';
import { FetchedData, PopulationWithPrefCode } from '../contains/Types';

interface Props {
  prefCodes: number[];
}
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

function useFetchPopulation({ prefCodes }: Props): PopulationWithPrefCode[] | null {
  const [population, setPopulation] = useState<PopulationWithPrefCode[] | null>(null);

  const combinePrefNameToData = (fetchedData: FetchedData[]): PopulationWithPrefCode[] => {
    if (fetchedData && fetchedData.length === prefCodes.length) {
      const newData: PopulationWithPrefCode[] = fetchedData.map((item, index) => ({
        prefCode: prefCodes[index],
        populationData: item.result.data.map((d) => ({
          label: d.label,
          data: d.data,
        })),
      }));
      return newData;
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (prefCodes.length === 0) {
          setPopulation(null);
          return;
        }
        const promises = prefCodes.map(async (prefCode) => {
          const ACCESS_URL = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`;
          const response = await axios.get<FetchedData>(ACCESS_URL, { headers: { 'X-API-KEY': apiKey } });
          return response.data;
        });

        const fetchedDataArray = await Promise.all(promises);
        const combined: PopulationWithPrefCode[] = combinePrefNameToData(fetchedDataArray);
        setPopulation(combined);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPopulation(null);
      }
    };

    fetchData();
  }, [prefCodes]);

  return population;
}

export default useFetchPopulation;
