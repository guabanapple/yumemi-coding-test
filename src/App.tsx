/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo } from 'react';
import PullDown from './components/atoms/PullDown';
import useFetchPref from './hooks/useFetchPref';
import PrefCheckLists from './components/organisms/PrefCheckLists';
import useFetchPopulation from './hooks/useFetchPopulation';
import Graph from './components/organisms/Graph';
import { Pref, OptionLabels, PopulationWithPrefName, ProcessedData } from './contains/Types';

function App() {
  const [prefData, setPrefData] = useState<Pref[]>([]);
  const [optionLabels, setOptionLabels] = useState<OptionLabels>({ options: ['------'], selectedOption: '------' });

  const handlePullDownChanged = (selectedOption: string) => {
    setOptionLabels((prevState) => ({
      ...prevState,
      selectedOption,
    }));
  };
  const handleCheckBoxChanged = (prefName: string) => {
    setPrefData((prevState) =>
      prevState.map((pref) => (pref.prefName === prefName ? { ...pref, checked: !pref.checked } : pref))
    );
  };

  const prefs = useFetchPref();
  if (prefData.length < 1 && prefs) {
    const newData = prefs.map((p) => ({ ...p, checked: false }));
    setPrefData(newData);
  }

  // 無限ループを防ぐためメモ化
  const checkedPrefCodes = useMemo(
    () => prefData.filter((pref) => pref.checked === true).map((pref) => pref.prefCode),
    [prefData]
  );
  const population = useFetchPopulation({ prefCodes: checkedPrefCodes });

  // ドロップダウンの値セット
  if (optionLabels.options.length <= 1 && population) {
    const options = population[0].result.data.map((d) => d.label);
    setOptionLabels({ options, selectedOption: options[0] });
  }

  // チェックされたprefNameとpopulationデータの紐付け
  const populationWithPrefName: PopulationWithPrefName[] = useMemo(() => {
    if (population && population.length === checkedPrefCodes.length) {
      return population.map((item, index) => ({
        prefName: prefData.find((pref) => pref.prefCode === checkedPrefCodes[index])!.prefName,
        populationData: item.result.data.map((d) => ({
          label: d.label,
          data: d.data,
        })),
      }));
    }
    return [];
  }, [population, checkedPrefCodes, prefData]);

  // Rechartsで使用するフォーマットに変換
  const processDataByYear = (populationData: PopulationWithPrefName[]): ProcessedData[] => {
    const result: ProcessedData[] = [];

    populationData.forEach((pref) => {
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
  
  const processedDateByYear = processDataByYear(populationWithPrefName);

  return (
    <div>
      <h3>hello</h3>
      {prefData && <PrefCheckLists prefData={prefData} onChange={handleCheckBoxChanged} />}
      <PullDown
        options={population ? population[0].result.data.map((d) => d.label) : ['-----']}
        selectedOption={optionLabels.selectedOption}
        onChange={handlePullDownChanged}
      />
      {processedDateByYear.length > 1 && <Graph populationData={processedDateByYear} />}
    </div>
  );
}

export default App;
