import PullDown from '../atoms/PullDown';
import RadioForm from '../molecules/RadioForm';
import { OptionLabels } from '../../contains/Types';
import { StyledCenteringBox } from '../../Styles/styles';
import useWindowSize from '../../hooks/useWindowSize';

interface Props {
  optionLabels: OptionLabels;
  onChange: (selectedOption: string) => void;
}

function SelectForm({ optionLabels, onChange }: Props) {
  const windowSize = useWindowSize();
  let selectType: 'radio' | 'pullDown';
  if (windowSize <= 480) {
    selectType = 'pullDown';
  } else {
    selectType = 'radio';
  }

  return (
    <StyledCenteringBox>
      {selectType === 'pullDown' ? (
        <PullDown options={optionLabels.options} selectedOption={optionLabels.selectedOption!} onChange={onChange} />
      ) : (
        <RadioForm options={optionLabels.options} selectedOption={optionLabels.selectedOption!} onChange={onChange} />
      )}
    </StyledCenteringBox>
  );
}

export default SelectForm;
