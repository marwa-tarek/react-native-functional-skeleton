import { call, select, takeLatest } from "redux-saga/effects"
import { ILoginAction, IUserAction, UserActionType } from "./types"
import { FirebaseManager } from "@yourProjectName/services/firebase"
import { FunctionName } from "@yourProjectName/services/firebase/types"
import { IAppState } from "@yourProjectName/state/storeConfig/types"

function* login(action: ILoginAction) {
  yield call(FirebaseManager.functions.callFunction, FunctionName.Login, {})
}

function* callSaga(action: IUserAction) {
  const sessionActive: boolean = yield select((state: IAppState) => state.user.sessionActive)
  if (!FirebaseManager.auth.currentUser && sessionActive) {
    // Handle logout
    return
  }

  switch (action.type) {
    case UserActionType.login:
      yield login(action)
  }
}

export function* userSubscription() {
  yield takeLatest(UserActionType.login, callSaga)
}
