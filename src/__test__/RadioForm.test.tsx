import { render, screen } from '@testing-library/react';
import RadioForm from '../components/molecules/RadioForm';

describe('radio form', () => {
  test('renders radio buttons correctly', () => {
    const mockOnChange = jest.fn();
    const options = ['op1', 'op2', 'op3'];
    const selectedOption = options[0];
    render(<RadioForm options={options} selectedOption={selectedOption} onChange={mockOnChange} />);
    const radioButtons = screen.getAllByRole('radio');

    expect(radioButtons).toHaveLength(options.length);

    radioButtons.forEach((radioButton, index) => {
      expect(radioButton).toHaveAttribute('name', 'showType');
      expect(screen.getByLabelText(options[index])).toBeInTheDocument();
    });
  });
});
