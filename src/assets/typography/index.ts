import { TextStyle } from "react-native"
import colors from "@yourProjectName/assets/colors"
import { fontSizing, TextStyleSheet } from "@yourProjectName/utils"

/*
Alingment Styles
*/

const alignRight: TextStyle = { textAlign: "right" }
const alignCenter: TextStyle = { textAlign: "center" }
const alignLeft: TextStyle = { textAlign: "left" }

/*
Core Styles
*/

const header: TextStyle = {
  ...fontSizing(28, 0, 29.4),
  color: colors.Black,
}

const label: TextStyle = {
  ...fontSizing(12, 0, 13),
  color: colors.Black,
}

const typorgraphy = {
  core: TextStyleSheet({
    headerLeft: { ...header, ...alignLeft },
    headerCenter: { ...header, ...alignCenter },
    headerRight: { ...header, ...alignRight },
    label,
  }),
}

export default typorgraphy
