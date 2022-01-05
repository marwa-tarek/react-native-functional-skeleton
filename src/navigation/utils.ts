/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import { CommonActions, createNavigationContainerRef } from "@react-navigation/native"
import { AuthRoutes, AuthStackParams } from "./auth/auth.navigator"
import { AppRoutes } from "./routes"

export type AppStackParamList = AuthStackParams
export type AppRouteList = AppRoutes & AuthRoutes

export const navigationRef = createNavigationContainerRef<AppStackParamList>()

export function navigate(name: keyof AppStackParamList, params: AppStackParamList[AppRouteList]): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(routes = [], index = 0): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      })
    )
  }
}

export function navigateAndSimpleReset(name: string, index = 0): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      })
    )
  }
}

export const getCurrentRoute = () => {
  return navigationRef.getCurrentRoute()?.name || ""
}
