import { v4 as uuidv4 } from 'uuid';
import PrefCheckBox from '../molecules/PrefCheckBox';
import { Pref } from '../../contains/Types';
import { StyleCheckBoxList } from '../../Styles/styles';

interface Props {
  prefData: Pref[];
  onChange: (prefName: string) => void;
}

function PrefCheckLists({ prefData, onChange }: Props) {
  const CheckBoxesPerPref = prefData.map((pref) => <PrefCheckBox prefData={pref} key={uuidv4()} onChange={onChange} />);

  return (
    <div>
      <StyleCheckBoxList>{CheckBoxesPerPref}</StyleCheckBoxList>
    </div>
  );
}

export default PrefCheckLists;
