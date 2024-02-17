import { v4 as uuidv4 } from 'uuid';
import { StyledPullDown } from '../../Styles/styles';

interface Props {
  options: string[];
  selectedOption: string;
  onChange: (selectedOption: string) => void;
}

function PullDown({ options, selectedOption, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  };
  return (
    <StyledPullDown value={selectedOption} onChange={(e) => handleChange(e)}>
      {options.map((option) => (
        <option key={uuidv4()} value={option}>
          {option}
        </option>
      ))}
    </StyledPullDown>
  );
}

export default PullDown;
