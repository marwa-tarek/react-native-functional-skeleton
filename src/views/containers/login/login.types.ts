import { NavigationProp } from "@yourProjectName/navigation/types"
import { AuthRoutes, AuthStackParams } from "@yourProjectName/navigation/auth/auth.navigator"

export interface ILoginScreenProps {}

export type LoginScreenNavigationProp = NavigationProp<AuthStackParams, AuthRoutes.LogIn>

export interface ILoginViewProps {
  onLoginClick: () => void
}
