export interface QueryResult<T> {
  result: T[];
  currIndex: number;
  totalResults: number;
}