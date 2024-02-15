/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef, useMemo } from 'react';
import PullDown from './components/atoms/PullDown';
import useFetchPref from './hooks/useFetchPref';
import PrefCheckLists from './components/organisms/PrefCheckLists';
import useFetchPopulation from './hooks/useFetchPopulation';

interface Pref {
  prefCode: number;
  prefName: string;
  checked: boolean;
}
interface OptionLabels {
  options: string[];
  selectedOption: string;
}

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

  // 要改善：初回レスポンスの保存
  const prefs = useFetchPref();
  if (prefData.length < 1 && prefs) {
    const newData = prefs.map((p) => ({ ...p, checked: false }));
    setPrefData(newData);
  }

  const checkedPrefCodes = useMemo(
    () => prefData.filter((pref) => pref.checked === true).map((pref) => pref.prefCode),
    [prefData]
  );
  const population = useFetchPopulation({ prefCodes: checkedPrefCodes });

  const dataWithCodes = useMemo(() => {
    if (population && checkedPrefCodes) {
      return population.map((item, index) => ({
        prefCode: checkedPrefCodes[index],
        populationData: item,
      }));
    }
    return [];
  }, [population, checkedPrefCodes]);

  return (
    <div>
      <h3>hello</h3>
      {prefData && <PrefCheckLists prefData={prefData} onChange={handleCheckBoxChanged} />}
      <PullDown
        options={population ? population[0].result.data.map((d) => d.label) : ['-----']}
        onChange={handlePullDownChanged}
      />
      <div>GraphArea</div>
    </div>
  );
}

export default App;
