import { v4 as uuidv4 } from 'uuid';
import { Pref } from '../../contains/Types';
import { StyledList } from '../../Styles/Styles';

interface Props {
  prefData: Pref;
  onChange: (prefName: string) => void;
}

function PrefCheckBox({ prefData, onChange }: Props) {
  const id = uuidv4();
  const formattedPrefName = prefData.prefName.padEnd(4, '　');

  const handleChanged = () => {
    onChange(prefData.prefName);
  };

  return (
    <StyledList>
      <label htmlFor={id}>
        <input type="checkbox" id={id} name={prefData.prefName} checked={prefData.checked} onChange={handleChanged} />
        {formattedPrefName}
      </label>
    </StyledList>
  );
}

export default PrefCheckBox;
