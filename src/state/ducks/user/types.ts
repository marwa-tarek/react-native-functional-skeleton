import { FSAWithPayload } from "flux-standard-action"

export interface IUserState {
  sessionActive: boolean
  ID?: string
  name: string
  username: string
  email: string
}

export enum UserActionType {
  login = "user/login",
}

export type ILoginAction = FSAWithPayload<
  UserActionType.login,
  {
    email: string
    password: string
  }
>

export type IUserAction = ILoginAction
