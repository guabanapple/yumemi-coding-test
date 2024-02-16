import { useEffect, useState } from 'react';
import axios from 'axios';
import { FetchedData, PopulationWithPrefCode } from '../contains/Types';

interface Props {
  prefCodes: number[];
}

function useFetchPopulation({ prefCodes }: Props): PopulationWithPrefCode[] | null {
  const apiKey = process.env.REACT_APP_RESAS_API_KEY;
  const [population, setPopulation] = useState<PopulationWithPrefCode[] | null>(null);

  const prefCodesNotFetched = () => {
    if (!Array.isArray(population)) {
      return prefCodes;
    }
    // 人口データ取得済みの都道府県コード
    const prefCodesInPopulation = population.map((p) => p.prefCode);
    const notFetchedPrefList: number[] = prefCodes.filter((prefCode) => !prefCodesInPopulation.includes(prefCode));
    return notFetchedPrefList;
  };

  // 取得データにprefCodeを紐付け
  const combinePrefNameToData = (
    fetchedData: FetchedData[],
    notFetchedPrefList: number[]
  ): PopulationWithPrefCode[] => {
    const newData: PopulationWithPrefCode[] = fetchedData.map((item, index) => ({
      prefCode: notFetchedPrefList[index],
      populationData: item.result.data.map((d) => ({
        label: d.label,
        data: d.data,
      })),
    }));
    return newData;
  };

  useEffect(() => {
    const notFetchedPrefList = prefCodesNotFetched();
    const fetchData = async () => {
      try {
        if (notFetchedPrefList.length === 0) {
          return;
        }
        const promises = notFetchedPrefList.map(async (notFetchedPref) => {
          const ACCESS_URL = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${notFetchedPref}`;
          const response = await axios.get<FetchedData>(ACCESS_URL, { headers: { 'X-API-KEY': apiKey } });
          return response.data;
        });

        const fetchedDataArray = await Promise.all(promises);
        const combinedWithName: PopulationWithPrefCode[] = combinePrefNameToData(fetchedDataArray, notFetchedPrefList);
        setPopulation((prevState) => (prevState ? [...prevState, ...combinedWithName] : combinedWithName));
      } catch (error) {
        console.error('Error fetching data:', error);
        setPopulation(null);
      }
    };

    fetchData();
  }, [prefCodes]);

  if (!population) {
    return null;
  }
  // 取得データ一覧から該当するコードの人口データのみreturn
  return population?.filter((p) => prefCodes.includes(p.prefCode));
}

export default useFetchPopulation;
