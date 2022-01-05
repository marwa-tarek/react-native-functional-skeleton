import { ImageSourcePropType, ImageStyle, ViewStyle } from "react-native"

export interface IImageButtonProps {
  containerStyle?: ViewStyle
  image: ImageSourcePropType
  imageStyle?: ImageStyle
  onClick: () => void
}
