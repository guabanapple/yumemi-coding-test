import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchData = async (url: string, apiKey: string): Promise<any> => {
  const response = await axios.get(url, { headers: { 'X-API-KEY': apiKey } });
  return response.data.result;
};
