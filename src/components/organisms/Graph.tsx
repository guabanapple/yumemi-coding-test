/* eslint-disable @typescript-eslint/no-unused-vars */
import { LineChart, XAxis, YAxis, Legend, Tooltip, Line, CartesianGrid } from 'recharts';
import { PopulationData } from '../../contains/Types';

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
      <LineChart width={700} height={400} data={populationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        {mapLineList}
      </LineChart>
      ;
    </div>
  );
}

export default Graph;
