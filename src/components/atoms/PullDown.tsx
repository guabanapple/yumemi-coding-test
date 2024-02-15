// import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  options: string[];
  onChange: (option: string) => void;
}

function PullDown({ options, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  };
  return (
    <div>
      <select onChange={(e) => handleChange(e)}>
        {options.map((option) => (
          <option key={uuidv4()} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PullDown;
