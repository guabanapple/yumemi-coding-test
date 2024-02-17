import { v4 as uuid4 } from 'uuid';
import RadioButton from '../atoms/RadioButton';

interface Props {
  options: string[];
  selectedOption: string;
  onChange: (selectedOption: string) => void;
}

function RadioForm({ options, selectedOption, onChange }: Props) {
  const isChecked = true;
  const radioButtons = options.map((option) =>
    selectedOption === option ? (
      <RadioButton
        isChecked={isChecked}
        key={uuid4()}
        id={uuid4()}
        name="showType"
        value={option}
        onChange={onChange}
      />
    ) : (
      <RadioButton key={uuid4()} id={uuid4()} name="showType" value={option} onChange={onChange} />
    )
  );

  return (
    <div>
      <ul>{radioButtons}</ul>
    </div>
  );
}

export default RadioForm;
