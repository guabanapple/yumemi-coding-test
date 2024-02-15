import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PullDown from '../components/atoms/PullDown';

describe('pulldown', () => {
  test('exists', () => {
    const options: string[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
    const mockOnChange = jest.fn();
    render(<PullDown options={options} onChange={mockOnChange} />);
    const pulldown = screen.getByRole('combobox');
    expect(pulldown).toBeInTheDocument();
  });

  test('is correct options', () => {
    const options: string[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
    const mockOnChange = jest.fn();
    render(<PullDown options={options} onChange={mockOnChange} />);
    options.forEach((option) => {
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument();
    });
  });
  test('onchange event should be triggered with correct value', () => {
    const options: string[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
    const mockOnChange = jest.fn();
    render(<PullDown options={options} onChange={mockOnChange} />);

    const selectElement = screen.getByRole('combobox');
    userEvent.selectOptions(selectElement, '生産年齢人口');
    expect(mockOnChange).toHaveBeenCalledWith('生産年齢人口');
  });
});
