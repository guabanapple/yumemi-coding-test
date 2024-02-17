export interface Pref {
  prefCode: number;
  prefName: string;
  checked: boolean;
}
export interface OptionLabels {
  options: string[] | [];
  selectedOption: string | null;
}
export interface Data {
  year: number;
  value: number;
}
export interface PopulationWithPrefCode {
  prefCode: number;
  populationData: {
    label: string;
    data: Data[];
  }[];
}
export interface PopulationWithPrefName {
  prefName: string;
  populationData: {
    label: string;
    data: Data[];
  }[];
}
export interface ProcessedData {
  year: number;
  [prefName: string]: number;
}
export interface PopulationData {
  year: number;
  [prefName: string]: number;
}
export interface FetchResult<T> {
  data: T | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
export interface FetchedData {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: Data[];
    }[];
  };
}
