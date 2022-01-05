import { all, call } from "redux-saga/effects"
import { userSubscription } from "@yourProjectName/state/ducks"

export default function* rootSaga() {
  yield all([call(userSubscription)])
}
