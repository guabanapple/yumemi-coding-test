import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectForm from '../components/organisms/SelectForm';

describe('SelectForm component', () => {
  test('renders PullDown when window size is less than or equal to 480', () => {
    const optionLabels = {
      options: ['Option1', 'Option2', 'Option3'],
      selectedOption: 'Option1',
    };
    const mockOnChange = jest.fn();

    global.innerWidth = 480;

    render(<SelectForm optionLabels={optionLabels} onChange={mockOnChange} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
  });

  test('renders RadioForm when window size is greater than 480', () => {
    const optionLabels = {
      options: ['Option1', 'Option2', 'Option3'],
      selectedOption: 'Option1',
    };
    const mockOnChange = jest.fn();

    global.innerWidth = 800;

    render(<SelectForm optionLabels={optionLabels} onChange={mockOnChange} />);

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  test('calls onChange handler with selected option', () => {
    const optionLabels = {
      options: ['Option1', 'Option2', 'Option3'],
      selectedOption: 'Option1',
    };
    const mockOnChange = jest.fn();

    global.innerWidth = 480;

    render(<SelectForm optionLabels={optionLabels} onChange={mockOnChange} />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Option2');

    expect(mockOnChange).toHaveBeenCalledWith('Option2');
  });
});
