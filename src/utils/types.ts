export interface Result<T> {
  message: string;
  data: T;
  code: number;
}
