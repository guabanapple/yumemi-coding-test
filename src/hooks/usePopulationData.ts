// usePopulationData.tsx
import { useMemo } from 'react';
import useFetchPopulation from './useFetchPopulation';
import { PopulationWithPrefName, ProcessedData, Pref, OptionLabels } from '../contains/Types';

interface Props {
  prefData: Pref[];
  optionLabels: OptionLabels;
}

function usePopulationData({ prefData, optionLabels }: Props) {
  const checkedPrefCodes = useMemo(
    () => prefData.filter((pref) => pref.checked === true).map((pref) => pref.prefCode),
    [prefData]
  );
  const population = useFetchPopulation({ prefCodes: checkedPrefCodes });

  const populationWithPrefName: PopulationWithPrefName[] = useMemo(() => {
    if (population && population.length === checkedPrefCodes.length) {
      return population.map((item) => ({
        prefName: prefData.find((pref) => pref.prefCode === item.prefCode)!.prefName,
        populationData: item.populationData.map((d) => ({
          label: d.label,
          data: d.data,
        })),
      }));
    }
    return [];
  }, [population, checkedPrefCodes, prefData]);

  const labels: string[] = populationWithPrefName.flatMap((data) => data.populationData.map((d) => d.label));

  const processDataByYearAndOption = (prefPopulation: PopulationWithPrefName[]): ProcessedData[] => {
    const result: ProcessedData[] = [];

    prefPopulation.forEach((pref) => {
      pref.populationData
        .filter(({ label }) => label === optionLabels.selectedOption)
        .forEach(({ data }) => {
          data.forEach(({ year, value }) => {
            const entry = result.find((e) => e.year === year);
            if (entry) {
              entry[pref.prefName] = value;
            } else {
              result.push({ year, [pref.prefName]: value });
            }
          });
        });
    });
    return result;
  };

  const processedDateByYear = useMemo(
    () => processDataByYearAndOption(populationWithPrefName),
    [populationWithPrefName, optionLabels.selectedOption]
  );

  return { population, processedDate: processedDateByYear, labels };
}

export default usePopulationData;
