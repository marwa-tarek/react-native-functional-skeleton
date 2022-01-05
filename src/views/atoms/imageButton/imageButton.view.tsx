import React from "react"
import { Image, TouchableOpacity } from "react-native"
import { IImageButtonProps } from "./imageButton.types"

export const ImageButton = (props: IImageButtonProps) => {
  return (
    <TouchableOpacity style={props.containerStyle} onPress={props.onClick}>
      <Image style={[props.imageStyle]} source={props.image} />
    </TouchableOpacity>
  )
}
