import { StyleSheet } from "react-native"
import { TextStyleSheet, ViewStyleSheet } from "@yourProjectName/utils"

const viewStyles = ViewStyleSheet({})

const textStyles = TextStyleSheet({})

const styles = StyleSheet.create({
  ...viewStyles,
  ...textStyles,
})

export default styles
