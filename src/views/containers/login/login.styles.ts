import { StyleSheet } from "react-native"
import { ImageStyleSheet, TextStyleSheet, ViewStyleSheet } from "@yourProjectName/utils"

const viewStyles = ViewStyleSheet({})

const textStyles = TextStyleSheet({})

const imageStyles = ImageStyleSheet({})

const styles = StyleSheet.create({
  ...viewStyles,
  ...textStyles,
  ...imageStyles,
})

export default styles
