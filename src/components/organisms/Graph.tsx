/* eslint-disable @typescript-eslint/no-unused-vars */
import { LineChart, XAxis, YAxis, Legend, Tooltip, Line, CartesianGrid } from 'recharts';
import { PopulationData } from '../../contains/Types';
import { StyledCenteringBox } from '../../Styles/styles';
import useWindowSize from '../../hooks/useWindowSize';

interface Props {
  populationData: PopulationData[];
}

function Graph({ populationData }: Props) {
  const prefectures = Object.keys(populationData[0]).filter((key) => key !== 'year');

  const getRandomColor = () => {
    const h = Math.trunc(Math.random() * 360);
    const s = Math.trunc(Math.random() * 10) + 60;
    const l = 40;
    return `hsl( ${h}, ${s}%, ${l}% )`;
  };

  const mapLineList = prefectures.map((prefecture) => (
    <Line key={prefecture} type="monotone" dataKey={prefecture} stroke={getRandomColor()} yAxisId={0} />
  ));

  const windowSize = useWindowSize();

  return (
    <StyledCenteringBox>
      <LineChart
        width={windowSize * 0.9}
        height={400}
        data={populationData}
        margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend width={windowSize * 0.9} verticalAlign="top" margin={{ top: 0, left: 0, right: 0, bottom: 200 }} />
        <CartesianGrid stroke="#f5f5f5" />
        {mapLineList}
      </LineChart>
    </StyledCenteringBox>
  );
}

export default Graph;
