import { StyledList } from '../../Styles/Styles';

interface Props {
  // eslint-disable-next-line react/require-default-props
  isChecked?: boolean;
  id: string;
  name: string;
  value: string;
  onChange: (selectedOption: string) => void;
}

function RadioButton({ isChecked, id, name, value, onChange }: Props) {
  return (
    <StyledList>
      <label htmlFor={id}>
        {isChecked ? (
          <input type="radio" name={name} id={id} onChange={() => onChange(value)} checked />
        ) : (
          <input type="radio" name={name} id={id} onChange={() => onChange(value)} />
        )}
        {value}
      </label>
    </StyledList>
  );
}

export default RadioButton;
