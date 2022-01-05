export enum FunctionName {
  Login = "", // TODO: Add cloud function name when created
}

export interface IFunctionResponse<T> {
  success: boolean
  data?: T
  error?: string
}
