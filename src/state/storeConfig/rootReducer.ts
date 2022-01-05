import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import rootPersistConfig from "./persistConfig"
import reducers from "./reducers"

const appReducer = combineReducers(reducers)

const rootReducer = (state: any, action: any) => {
  // In case using redux-persist, we need to clean app storage.
  // Redux-persist keeps a copy of state in a storage engine, and the state copy will be loaded from there on refresh.
  return appReducer(state, action)
}
export default persistReducer(rootPersistConfig, rootReducer)
