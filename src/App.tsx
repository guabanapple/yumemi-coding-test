/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import PullDown from './components/atoms/PullDown';
import useFetchPref from './hooks/useFetchPref';
import PrefCheckLists from './components/organisms/PrefCheckLists';

interface Pref {
  prefCode: number;
  prefName: string;
  checked: boolean;
}
interface OptionData {
  options: string[];
  selectedOption: string;
}

function App() {
  const [prefData, setPrefData] = useState<Pref[]>([]);
  const [optionData, setOptionData] = useState<OptionData>({ options: ['------'], selectedOption: '------' });

  const handlePullDownChanged = (selectedOption: string) => {
    setOptionData((prevState) => ({
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
  const data = useFetchPref();
  useEffect(() => {
    if (data) {
      const newData = data.map((d) => ({ ...d, checked: false }));
      setPrefData(newData);
    }
  }, [data]);

  return (
    <div>
      <h3>hello</h3>
      {prefData && <PrefCheckLists prefData={prefData} onChange={handleCheckBoxChanged} />}
      <PullDown options={optionData.options} onChange={handlePullDownChanged} />
      <div>GraphArea</div>
    </div>
  );
}

export default App;
