import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const StyledList = styled.li`
  list-style: none;
  display: inline-block;
  padding: 8px 16px;
  box-sizing: border-box;
  font-size: 1.1em;
`;

interface Pref {
  prefCode: number;
  prefName: string;
  checked: boolean;
}

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
