import { Middleware } from "redux"
import { persistStore } from "redux-persist"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import createDebugger from "redux-flipper"
import Logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
import appReducer from "./rootReducer"
import rootSaga from "./rootSaga"
import { IS_DEV_ENV } from "@yourProjectName/utils"

const configureAppStore = () => {
  // Saga configuration
  const sagaMiddleware = createSagaMiddleware()
  const loggerMiddleware: Middleware = Logger

  const appStore = configureStore({
    reducer: appReducer,
    middleware: IS_DEV_ENV ? [sagaMiddleware, loggerMiddleware, createDebugger()] : [sagaMiddleware],
    devTools: true,
  })

  sagaMiddleware.run(rootSaga)
  return appStore
}

const store = configureAppStore()

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
