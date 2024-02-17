import PrefCheckLists from '../organisms/PrefCheckLists';
import Graph from '../organisms/Graph';
import { ProcessedData, Pref, OptionLabels } from '../../contains/Types';
import SelectForm from '../organisms/SelectForm';
import { StyledHeader, StyledResultArea, StyledWaitingArea } from '../../Styles/styles';

interface Props {
  prefData: Pref[];
  optionLabels: OptionLabels;
  processedDate: ProcessedData[];
  onChangeSelect: (selectedOption: string) => void;
  onChangeCheckBox: (prefName: string) => void;
}

function Template({ prefData, optionLabels, processedDate, onChangeSelect, onChangeCheckBox }: Props) {
  return (
    <main>
      {/* <h1>都道府県別：人口グラフ</h1> */}
      <section>
        <StyledHeader>都道府県一覧</StyledHeader>
        {prefData.length > 0 ? (
          <PrefCheckLists prefData={prefData} onChange={onChangeCheckBox} />
        ) : (
          <StyledWaitingArea>データを読み込んでいます</StyledWaitingArea>
        )}
      </section>
      {prefData.length > 0 && processedDate.length > 0 && (
        <section>
          <StyledHeader>人口情報タイプ</StyledHeader>
          <SelectForm optionLabels={optionLabels} onChange={onChangeSelect} />
          {processedDate.length > 0 && <Graph populationData={processedDate} />}
        </section>
      )}
      {prefData.length > 0 && processedDate.length === 0 && (
        <StyledResultArea>都道府県を選択すると結果が表示されます</StyledResultArea>
      )}
    </main>
  );
}

export default Template;
