import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrefCheckLists from '../components/organisms/PrefCheckLists';

describe('PrefCheckLists component', () => {
  test('renders correctly with prefData', () => {
    const prefData = [
      { prefCode: 1, prefName: '東京', checked: true },
      { prefCode: 2, prefName: '大阪', checked: true },
      { prefCode: 3, prefName: '京都', checked: true },
    ];

    const onChangeMock = jest.fn();

    render(<PrefCheckLists prefData={prefData} onChange={onChangeMock} />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(prefData.length);

    prefData.forEach((pref, index) => {
      const checkboxLabel = screen.getByText(pref.prefName);
      expect(checkboxLabel).toBeInTheDocument();

      const checkbox = checkboxes[index];
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });
  });

  test('calls onChange handler when checkbox is clicked', () => {
    const prefData = [
      { prefCode: 1, prefName: '東京', checked: true },
      { prefCode: 2, prefName: '大阪', checked: false },
      { prefCode: 3, prefName: '京都', checked: true },
    ];

    const onChangeMock = jest.fn();

    render(<PrefCheckLists prefData={prefData} onChange={onChangeMock} />);

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox, index) => {
      userEvent.click(checkbox);
      expect(onChangeMock).toHaveBeenCalledWith(prefData[index].prefName);
    });
  });
});
