/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import PullDown from '../components/atoms/PullDown';

interface Pref {
  prefCode: number;
  prefName: string;
  checked: boolean;
}
interface OptionData {
  options: string[];
  selectedOption: string;
}

function useGraph() {
    const [optionData, setOptionData] = useState<OptionData>({ options: ['------'], selectedOption: '------' });
    


  return <div>useGraph</div>;
}

export default useGraph;
