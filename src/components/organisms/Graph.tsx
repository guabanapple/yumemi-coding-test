/* eslint-disable @typescript-eslint/no-unused-vars */
import { LineChart, XAxis, Tooltip, Line, CartesianGrid } from 'recharts';

interface PopulationData {
  year: number;
  [prefName: string]: number;
}
interface Props {
  populationData: PopulationData[];
}

function Graph({ populationData }: Props) {
  const prefectures = Object.keys(populationData[0]).filter((key) => key !== 'year');

  const mapLineList = prefectures.map((prefecture) => (
    <Line key={prefecture} type="monotone" dataKey={prefecture} stroke="#ff7300" yAxisId={0} />
  ));

  return (
    <div>
      <LineChart width={400} height={400} data={populationData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="year" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        {mapLineList}
      </LineChart>
      ;
    </div>
  );
}

export default Graph;
