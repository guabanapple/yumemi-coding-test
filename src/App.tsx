import { useState } from 'react';

import useFetchPref from './hooks/useFetchPref';
import usePopulationData from './hooks/usePopulationData';

import { Pref, OptionLabels } from './contains/Types';

import Template from './components/templates/Template';
import { GlobalStyle } from './Styles/styles';

function App() {
  const [prefData, setPrefData] = useState<Pref[]>([]);
  const [optionLabels, setOptionLabels] = useState<OptionLabels>({ options: [], selectedOption: null });

  const handleSelectChanged = (selectedOption: string) => {
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

  if (population && optionLabels.selectedOption === null) {
    setOptionLabels({
      options: labels,
      selectedOption: labels[0],
    });
  }

  return (
    <>
      <GlobalStyle />
      <Template
        prefData={prefData}
        optionLabels={optionLabels}
        processedDate={processedDate}
        onChangeSelect={handleSelectChanged}
        onChangeCheckBox={handleCheckBoxChanged}
      />
    </>
  );
}

export default App;
