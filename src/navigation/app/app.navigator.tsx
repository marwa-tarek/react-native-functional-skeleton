import React from "react"
import { StatusBar } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { navigationRef } from "@yourProjectName/navigation/utils"
import { defaultHeaderStyles } from "@yourProjectName/navigation/constants"
import { AuthNavigator } from "@yourProjectName/navigation"

export const Stack = createStackNavigator()

// @refresh reset
export const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={"dark-content"} />
        <Stack.Navigator mode="modal" screenOptions={defaultHeaderStyles} initialRouteName={""}>
          {AuthNavigator()}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
