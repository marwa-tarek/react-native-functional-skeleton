import { ReducerType } from "./types"
import { userReducer } from "@yourProjectName/state/ducks"

const reducers = {
  [ReducerType.User]: userReducer,
} as const

export default reducers
