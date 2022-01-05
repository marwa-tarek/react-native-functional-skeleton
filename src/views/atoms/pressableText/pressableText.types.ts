import { TextStyle, ViewStyle } from "react-native"

export interface IPressableTextProps {
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  text: string
  disabled?: boolean
  onPress: () => void
}
