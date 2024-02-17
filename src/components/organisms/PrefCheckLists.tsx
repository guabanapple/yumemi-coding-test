import { v4 as uuidv4 } from 'uuid';
import PrefCheckBox from '../molecules/PrefCheckBox';
import { Pref } from '../../contains/Types';

interface Props {
  prefData: Pref[];
  onChange: (prefName: string) => void;
}

function PrefCheckLists({ prefData, onChange }: Props) {
  const CheckBoxesPerPref = prefData.map((pref) => <PrefCheckBox prefData={pref} key={uuidv4()} onChange={onChange} />);

  // const isAnyChecked = () => {
  //   const checkedList = prefData.filter((pref) => pref.checked === true);
  //   if (checkedList.length === 0) {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <div>
      {/* {!isAnyChecked() && <p>都道府県を選択してください。</p>} */}
      <ul>{CheckBoxesPerPref}</ul>
    </div>
  );
}

export default PrefCheckLists;
