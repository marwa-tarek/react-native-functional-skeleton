import React from "react"
import { navigatorScreenOptions } from "@yourProjectName/navigation/constants"
import { Stack } from "@yourProjectName/navigation"
import { LoginScreen } from "@yourProjectName/views/containers"

export enum AuthRoutes {
  LogIn = "LogIn",
}

export type AuthStackParams = {
  [AuthRoutes.LogIn]: undefined
}

const AuthNavigator = () => {
  return (
    <>
      <Stack.Screen name={AuthRoutes.LogIn} component={LoginScreen} options={navigatorScreenOptions} />
    </>
  )
}

export default AuthNavigator
