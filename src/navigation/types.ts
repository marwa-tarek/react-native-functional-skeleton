import { CompositeNavigationProp, ParamListBase } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "./utils"

/**
 * Use this when typing your navigation: https://reactnavigation.org/docs/typescript/
 */
export type NavigationProp<StackParams extends ParamListBase, CurrentScreen extends string> = CompositeNavigationProp<
  StackNavigationProp<StackParams, CurrentScreen>,
  StackNavigationProp<AppStackParamList>
>
