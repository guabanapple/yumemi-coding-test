/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';

jest.mock('axios');

describe('useFetch', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data successfully', async () => {
    const responseData = { someData: 'data' };
    const url = 'https://example.com/api';
    const headers = { 'X-API-KEY': 'api_key' };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: responseData });

    let result: any;
    await act(async () => {
      result = renderHook(() => useFetch({ url, headers }));
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0)); // フック内の非同期処理を待つ
    });

    expect(result.result.current.data).toEqual(responseData);
    expect(result.result.current.error).toBeNull();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url, { headers });
  });

  it('handles errors correctly', async () => {
    const errorMessage = 'Error message';
    const url = 'https://example.com/api';
    const headers = { 'X-API-KEY': 'api_key' };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    let result: any;
    await act(async () => {
      result = renderHook(() => useFetch({ url, headers }));
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0)); // フック内の非同期処理を待つ
    });

    expect(result.result.current.data).toBeNull();
    expect(result.result.current.error).toBe(errorMessage);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url, { headers });
  });
});
