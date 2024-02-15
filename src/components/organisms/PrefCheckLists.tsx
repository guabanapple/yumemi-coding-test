import { v4 as uuidv4 } from 'uuid';
import PrefCheckBox from '../molecules/PrefCheckBox';

interface Pref {
  prefCode: number;
  prefName: string;
  checked: boolean;
}

interface Props {
  prefData: Pref[];
  onChange: (prefName: string) => void;
}

function PrefCheckLists({ prefData, onChange }: Props) {
  const CheckBoxesPerPref = prefData.map((pref) => <PrefCheckBox prefData={pref} key={uuidv4()} onChange={onChange} />);

  return <ul>{CheckBoxesPerPref}</ul>;
}

export default PrefCheckLists;
