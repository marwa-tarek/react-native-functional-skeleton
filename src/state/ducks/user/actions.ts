import { ILoginAction, UserActionType } from "./types"

export const loginAction = (email: string, password: string): ILoginAction => ({
  type: UserActionType.login,
  payload: {
    email,
    password,
  },
})
