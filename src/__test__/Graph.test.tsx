import { render, screen } from '@testing-library/react';
import Graph from '../components/organisms/Graph';

describe('Graph', () => {
  test('Graph is correctly exists', () => {
    const populationData = [
      { year: 2020, pref1: 1110, pref2: 2220 },
      { year: 2021, pref1: 1111, pref2: 2221 },
      { year: 2022, pref1: 1112, pref2: 2222 },
    ];
      render(<Graph populationData={populationData} />);
      
  });
});
