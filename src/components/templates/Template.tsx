import PrefCheckLists from '../organisms/PrefCheckLists';
import Graph from '../organisms/Graph';
import { ProcessedData, Pref, OptionLabels } from '../../contains/Types';
import SelectForm from '../organisms/SelectForm';
import { StyledHeader, StyledResultArea, StyledWaitingArea } from '../../Styles/Styles';

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
          <StyledWaitingArea width="700px" height="500px">
            データを読み込んでいます
          </StyledWaitingArea>
        )}
      </section>
      {processedDate.length > 0 ? (
        <section>
          <StyledHeader>人口情報タイプ</StyledHeader>
          <SelectForm optionLabels={optionLabels} onChange={onChangeSelect} />
          {processedDate.length > 0 && <Graph populationData={processedDate} />}
        </section>
      ) : (
        <StyledResultArea width="700px" height="400px" color="#ff8000">
          都道府県を選択すると結果が表示されます
        </StyledResultArea>
      )}
    </main>
  );
}

export default Template;
