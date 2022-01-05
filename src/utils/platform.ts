import { Dimensions, Platform, TextStyle } from "react-native"
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen"

export const IS_IOS = Platform.OS === "ios"

export const IS_ANDROID = Platform.OS === "android"

export const IS_DEV_ENV = __DEV__ === true

export const DEVICE_VERSION = Platform.Version

export const getWindowHeight = () => Dimensions.get("window").height

export const getWindowWidth = () => Dimensions.get("window").width

// The dimensions of the provided designs screen
const DESIGN_SCREEN_WIDTH = 375
const DESIGN_SCREEN_HEIGHT = 869

// Calculate the adaptive width given the design screen width dimension.
// To be used for style props like: width, marginHorizontal, fontSize, ...
export const wp = (designWidth: number) => {
  return widthPercentageToDP((designWidth * 100) / DESIGN_SCREEN_WIDTH)
}

// Calculate the adaptive height given the design screen height dimension.
// To be used for style props like: height, marginVertical, ...
export const hp = (designHeight: number) => {
  return heightPercentageToDP((designHeight * 100) / DESIGN_SCREEN_HEIGHT)
}

export function fontSizing(size: number, spacing: number, height: number): TextStyle {
  return {
    fontSize: hp(size),
    letterSpacing: spacing,
    lineHeight: hp(height),
  }
}
