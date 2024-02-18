import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Template from '../components/templates/Template';

describe('Template component', () => {
  test('renders waiting area when prefData is empty', () => {
    const onChangeSelectMock = jest.fn();
    const onChangeCheckBoxMock = jest.fn();

    render(
      <Template
        prefData={[]}
        optionLabels={{ options: ['Option1', 'Option2'], selectedOption: 'Option1' }}
        processedDate={[]}
        onChangeSelect={onChangeSelectMock}
        onChangeCheckBox={onChangeCheckBoxMock}
      />
    );

    expect(screen.getByText('データを読み込んでいます')).toBeInTheDocument();
  });

  test('renders result area when processedDate is empty', () => {
    const onChangeSelectMock = jest.fn();
    const onChangeCheckBoxMock = jest.fn();

    render(
      <Template
        prefData={[{ prefCode: 1, prefName: '東京', checked: true }]}
        optionLabels={{ options: ['Option1', 'Option2'], selectedOption: 'Option1' }}
        processedDate={[]}
        onChangeSelect={onChangeSelectMock}
        onChangeCheckBox={onChangeCheckBoxMock}
      />
    );

    expect(screen.getByText('都道府県を選択すると結果が表示されます')).toBeInTheDocument();
  });

  test('renders SelectForm and Graph with populated prefData and processedDate', () => {
    const prefData = [{ prefCode: 1, prefName: '東京', checked: true }];
    const optionLabels = { options: ['Option1', 'Option2'], selectedOption: 'Option1' };
    const processedDate = [{ year: 2020, Tokyo: 10000 }];

    const onChangeSelectMock = jest.fn();
    const onChangeCheckBoxMock = jest.fn();

    render(
      <Template
        prefData={prefData}
        optionLabels={optionLabels}
        processedDate={processedDate}
        onChangeSelect={onChangeSelectMock}
        onChangeCheckBox={onChangeCheckBoxMock}
      />
    );

    expect(screen.getByText('東京')).toBeInTheDocument();
    expect(screen.getByText('Option1')).toBeInTheDocument();
    expect(screen.getByText('Option2')).toBeInTheDocument();

    userEvent.click(screen.getByText('Option2'));
    expect(onChangeSelectMock).toHaveBeenCalledWith('Option2');
  });
});
