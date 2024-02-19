import axios from 'axios';
import { fetchData } from '../axios';

axios.get = jest.fn();

describe('fetch data', () => {
  test('successfully fetch data from api', async () => {
    const data = [
      { prefCode: 1, prefName: '東京', checked: false },
      { prefCode: 2, prefName: '大阪', checked: false },
      { prefCode: 3, prefName: '名古屋', checked: false },
    ];
    const apiKey = 'keykey';
    (axios.get as jest.Mock).mockResolvedValue({ data: { result: data } });
    await expect(fetchData('https://example.com', apiKey)).resolves.toEqual(data);
  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
    const apiKey = 'keykey';
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));
    await expect(fetchData('https://example.com', apiKey)).rejects.toThrow(errorMessage);
  });
});
