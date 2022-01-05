import { R } from "@yourProjectName/assets"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ILoginViewProps } from "./login.types"

export const LoginView = ({ onLoginClick }: ILoginViewProps) => {
  return (
    <SafeAreaView style={R.appStyles.center}>
      <Pressable onPress={onLoginClick}>
        <Text>Welcome to login</Text>
      </Pressable>
    </SafeAreaView>
  )
}
