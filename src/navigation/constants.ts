import { StackNavigationOptions } from "@react-navigation/stack"

export const defaultHeaderStyles: StackNavigationOptions = {
  headerTitleStyle: {
    display: "none",
  },
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
  },
}

export const navigatorScreenOptions = {
  ...defaultHeaderStyles,
  headerShown: false,
}
