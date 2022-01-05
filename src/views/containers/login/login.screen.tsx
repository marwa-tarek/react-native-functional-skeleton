import { loginAction } from "@yourProjectName/state/ducks"
import { IAppState } from "@yourProjectName/state/storeConfig/types"
import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ILoginScreenProps } from "./login.types"
import { LoginView } from "./login.view"

export const LoginScreen = (props: ILoginScreenProps) => {
  const dispatch = useDispatch()

  const userState = useSelector((state: IAppState) => state.user)
  console.log(userState)

  const login = useCallback(() => dispatch(loginAction("", "")), [dispatch])

  const onLoginClick = () => {
    console.log("Login PRESS !!")
    /* Setup Firebase first for each platform; Android & iOS */
    // login()
  }

  return <LoginView onLoginClick={onLoginClick} />
}
