export interface IAuthResponse<T = undefined> {
  success: boolean
  data?: T
  error?: string
}
