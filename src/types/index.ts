export enum HeadersEnum {
  Id = 0,
  FullName = 1,
  Phone = 2,
  Email = 3,
  Age = 4,
  Experience = 5,
  YearlyIncome = 6,
  HasChildren = 7,
  LicenseStates = 8,
  ExpirationDate = 9,
  LicenseNumber = 10,
  DuplicateWith = 11,
}

export interface DefaultError {
  name: string;
  row: string;
  id: number;
}

export interface DuplicateError extends DefaultError {
  duplicateId: string;
}

export type ErrorArray = (DefaultError | DuplicateError)[];

export type HeadersType = string[];

export type ValuesType = (string | number | boolean)[][]
