import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import { PersistConfig } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IScreenState, ReducerType } from "./types"

const persistConfig: PersistConfig<IScreenState> = {
  key: ReducerType.Root,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}

export default persistConfig
