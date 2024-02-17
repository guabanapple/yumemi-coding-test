import PullDown from '../atoms/PullDown';
import RadioForm from '../molecules/RadioForm';
import { OptionLabels } from '../../contains/Types';
import { JustCentering } from '../../Styles/Styles';

interface Props {
  optionLabels: OptionLabels;
  onChange: (selectedOption: string) => void;
}

function SelectForm({ optionLabels, onChange }: Props) {
  // 画面サイズに応じて表示するコンポーネントを変更
  //   const isBig = false;
  return (
    <JustCentering>
      <RadioForm options={optionLabels.options} selectedOption={optionLabels.selectedOption!} onChange={onChange} />
      <PullDown options={optionLabels.options} selectedOption={optionLabels.selectedOption!} onChange={onChange} />
    </JustCentering>
  );
}

export default SelectForm;
