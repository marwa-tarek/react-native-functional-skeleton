import { IUserAction, IUserState, UserActionType } from "./types"

const initialState: IUserState = {
  sessionActive: false,
  name: "",
  username: "",
  email: "",
}

export const userReducer = (state: IUserState = initialState, action: IUserAction): IUserState => {
  switch (action.type) {
    case UserActionType.login:
      const { email } = action.payload
      return { ...state, email }
    default:
      return state
  }
}
