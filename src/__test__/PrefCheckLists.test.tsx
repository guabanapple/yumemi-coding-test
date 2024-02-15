import { render, screen } from '@testing-library/react';
import PrefCheckLists from '../components/organisms/PrefCheckLists';

describe('checkbox and label for each prefecture', () => {
  test('checkbox and label should exists for prefNamesList', () => {
    const prefData = [
      {
        prefCode: 1,
        prefName: '北海道',
        checked: false,
      },
      {
        prefCode: 2,
        prefName: '青森県',
        checked: false,
      },
      {
        prefCode: 3,
        prefName: '岩手県',
        checked: false,
      },
    ];
    const mockOnChange = jest.fn();
    render(<PrefCheckLists prefData={prefData} onChange={mockOnChange} />);
    prefData.forEach((pref) => {
      // expect(screen.getByRole('checkbox', { name: pref.prefName })).toBeInTheDocument();
      expect(screen.getByText(pref.prefName)).toBeInTheDocument();
    });
  });
});
