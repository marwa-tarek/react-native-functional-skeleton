import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { IPressableTextProps } from "./pressableText.types"

export const PressableText = ({ disabled = false, ...props }: IPressableTextProps) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={props.onPress} style={props.containerStyle}>
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  )
}
