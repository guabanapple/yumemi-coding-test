// App.tsx
import { useState } from 'react';
import PullDown from './components/atoms/PullDown';
import useFetchPref from './hooks/useFetchPref';
import PrefCheckLists from './components/organisms/PrefCheckLists';
import usePopulationData from './hooks/usePopulationData';
import Graph from './components/organisms/Graph';
import { Pref, OptionLabels } from './contains/Types';

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

  const { population, processedDate, labels } = usePopulationData({ prefData, optionLabels });

  // デフォルトでグラフを描くよう、firstLabelをドロップダウンにセット
  if (population && optionLabels.selectedOption === '------') {
    setOptionLabels({
      ...optionLabels,
      selectedOption: labels[0],
    });
  }

  return (
    <div>
      <h3>hello</h3>
      {prefData && <PrefCheckLists prefData={prefData} onChange={handleCheckBoxChanged} />}
      <PullDown
        options={labels || ['-----']}
        selectedOption={optionLabels.selectedOption}
        onChange={handlePullDownChanged}
      />
      {processedDate.length > 0 && <Graph populationData={processedDate} />}
    </div>
  );
}

export default App;
