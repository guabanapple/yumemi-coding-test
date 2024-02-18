import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioButton from '../components/atoms/RadioButton';

describe('radio button', () => {
  afterEach(() => cleanup());
  test('correctly render radio button', () => {
    const mockOnChange = jest.fn();
    render(<RadioButton id="radio" name="radio" value="test" onChange={mockOnChange} />);
    const radioButton = screen.getByRole('radio');
    expect(radioButton).toBeInTheDocument();
  });

  describe('checked or unchecked', () => {
    test('if have isChecked and it is true, then should be checked', () => {
      const mockOnChange = jest.fn();
      const isChecked = true;
      render(<RadioButton isChecked={isChecked} id="radio1" name="radio" value="test" onChange={mockOnChange} />);
      const radioButton = screen.getByRole('radio');
      expect(radioButton).toBeChecked();
    });
    test('if have not isChecked, then should not be checked', () => {
      const mockOnChange = jest.fn();
      render(<RadioButton id="radio" name="radio" value="test" onChange={mockOnChange} />);
      const radioButton = screen.getByRole('radio');
      expect(radioButton).not.toBeChecked();
    });
    test('if have isChecked, but is false, then also should not be checked', () => {
      const mockOnChange = jest.fn();
      const isChecked = false;
      render(<RadioButton isChecked={isChecked} id="radio" name="radio" value="test" onChange={mockOnChange} />);
      const radioButton = screen.getByRole('radio');
      expect(radioButton).not.toBeChecked();
    });
    test('unchecked radio checked, then already checked one should change unchecked', () => {
      const mockOnChange = jest.fn();
      const isChecked = true;
      const options = ['radio1', 'radio2'];
      const [options1, options2] = options;
      let selectedOption = options1;

      const checkSelectedOption = () => {
        if (selectedOption === options1) {
          render(
            <RadioButton isChecked={isChecked} id={options1} name="radio" value={options1} onChange={mockOnChange} />
          );
          render(<RadioButton id={options2} name="radio" value={options2} onChange={mockOnChange} />);
        } else {
          render(<RadioButton id={options1} name="radio" value={options1} onChange={mockOnChange} />);
          render(
            <RadioButton isChecked={isChecked} id={options2} name="radio" value={options2} onChange={mockOnChange} />
          );
        }
      };

      checkSelectedOption();
      const radioButtonChecked1 = screen.getByLabelText(options1);
      const radioButtonUnChecked1 = screen.getByLabelText(options2);
      expect(radioButtonChecked1).toBeChecked();
      expect(radioButtonUnChecked1).not.toBeChecked();

      userEvent.click(radioButtonUnChecked1);
      selectedOption = options2;
      cleanup();

      checkSelectedOption();

      const radioButtonChecked2 = screen.getByLabelText(options1);
      const radioButtonUnChecked2 = screen.getByLabelText(options2);
      expect(radioButtonChecked2).not.toBeChecked();
      expect(radioButtonUnChecked2).toBeChecked();
    });
  });

  describe('onChange func', () => {
    test('if unchecked, be checked then should call callback func', () => {
      const mockOnChange = jest.fn();
      render(<RadioButton id="radio" name="radio" value="test" onChange={mockOnChange} />);
      const radioButtonUnChecked = screen.getByRole('radio');
      userEvent.click(radioButtonUnChecked);
      expect(mockOnChange).toBeCalled();
    });
    test('onChange func should return correct radio button value', () => {
      const mockOnChange = jest.fn();
      render(<RadioButton id="radio1" name="radio" value="radio1" onChange={mockOnChange} />);
      render(<RadioButton id="radio2" name="radio" value="radio2" onChange={mockOnChange} />);
      render(<RadioButton id="radio3" name="radio" value="radio3" onChange={mockOnChange} />);
      const radioButton = screen.getByText('radio2');
      userEvent.click(radioButton);
      expect(mockOnChange).toBeCalledWith('radio2');
    });
  });
});
