export interface IResponse<T> {
  data?: T;
  success: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
  errors?: [
    {
      message: string;
      code: number;
      razon: string;
    },
  ];
}
