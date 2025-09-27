declare type ExcludedEntityFields<T = never> =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'setDefaultValues'
  | 'cleanup'
  | 'prepare'
  | T;

declare interface FindManyResponse<T> {
  data: T[];
  total: number;
  offset: number;
  limit?: number;
  query?: string;
}

declare interface GenericError {
  message: string | Array<object>;
  error?: string;
  statusCode: number;
}
