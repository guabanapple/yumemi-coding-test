import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrefCheckBox from '../components/molecules/PrefCheckBox';

describe('checkbox', () => {
  test('correctly rendered', () => {
    const prefData = {
      prefCode: 1,
      prefName: '北海道',
      checked: false,
    };
    const mockOnChange = jest.fn();
    render(<PrefCheckBox prefData={prefData} onChange={mockOnChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const checkboxLabel = screen.getByText('北海道');
    expect(checkboxLabel).toBeInTheDocument();
  });
  test('prefName exists', () => {
    const prefData = {
      prefCode: 1,
      prefName: '北海道',
      checked: false,
    };
    const mockOnChange = jest.fn();
    render(<PrefCheckBox prefData={prefData} onChange={mockOnChange} />);
    const prefNameText = screen.getByText('北海道');
    expect(prefNameText).toBeInTheDocument();
  });

  describe('onchange event', () => {
    test('onchange event should return correct prefName', () => {
      const prefData = {
        prefCode: 1,
        prefName: '北海道',
        checked: false,
      };
      const mockOnChange = jest.fn();
      render(<PrefCheckBox prefData={prefData} onChange={mockOnChange} />);
      const checkbox = screen.getByRole('checkbox', { name: '北海道' });

      userEvent.click(checkbox);
      expect(mockOnChange).toHaveBeenCalledWith('北海道');
    });
    test('default is not checked and after clicked should be checked ', () => {
      const prefData = {
        prefCode: 1,
        prefName: '北海道',
        checked: false,
      };
      const mockOnChange = jest.fn();
      render(<PrefCheckBox prefData={prefData} onChange={mockOnChange} />);
      const checkboxBeforeClick = screen.getByRole('checkbox', { name: '北海道' });

      expect(checkboxBeforeClick).not.toBeChecked();
      userEvent.click(checkboxBeforeClick);
      prefData.checked = true;
      cleanup();

      render(<PrefCheckBox prefData={prefData} onChange={mockOnChange} />);
      const checkboxAfterClick = screen.getByRole('checkbox', { name: '北海道' });
      expect(checkboxAfterClick).toBeChecked();
    });
  });
});
