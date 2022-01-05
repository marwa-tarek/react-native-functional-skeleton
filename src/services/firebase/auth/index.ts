import Auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { getLocalError } from "./utils"
import { IAuthResponse } from "./types"

class AuthManager {
  public onIdTokenChanged(listener: FirebaseAuthTypes.AuthListenerCallback) {
    return Auth().onIdTokenChanged(listener)
  }

  public async loginUserByEmail(email: string, password: string): Promise<IAuthResponse> {
    try {
      await Auth().signInWithEmailAndPassword(email, password)
      return { success: true }
    } catch (e) {
      console.log("Auth/loginUserByEmail: " + e)
      return { success: false, error: getLocalError(e, "Auth/loginUserByEmail") }
    }
  }

  public get currentUser() {
    return Auth().currentUser
  }

  public currentUserID() {
    return Auth().currentUser?.uid
  }

  public async logOut() {
    await Auth().signOut()
  }

  public async isEmailVerified(): Promise<IAuthResponse> {
    try {
      await Auth().currentUser?.reload()
      return { success: Auth().currentUser?.emailVerified || false }
    } catch (e) {
      console.log("Auth/isEmailVerified: " + e)
      return { success: false, error: getLocalError(e, "Auth/isEmailVerified") }
    }
  }

  public async sendEmailVerificationLink(): Promise<IAuthResponse> {
    try {
      if (Auth().currentUser) {
        let result = false
        await Auth()
          .currentUser?.sendEmailVerification()
          .then(() => {
            result = true
          })
          .catch(() => {
            result = false
          })
        if (result) {
          return { success: true }
        } else {
          throw new Error("")
        }
      } else {
        throw new Error("")
      }
    } catch (e) {
      console.log("Auth/sendEmailVerificationLink: " + e)
      return { success: false, error: getLocalError(e, "Auth/sendEmailVerificationLink") }
    }
  }

  public async createUserWithEmailAndPassword(email: string, pass: string): Promise<IAuthResponse> {
    try {
      await Auth().createUserWithEmailAndPassword(email, pass)
      return { success: true }
    } catch (e) {
      console.log("Auth/createUserWithEmailAndPassword: " + e)
      return { success: false, error: getLocalError(e, "Auth/createUserWithEmailAndPassword") }
    }
  }

  public async sendEmailResetLink(email: string): Promise<IAuthResponse> {
    try {
      await Auth().sendPasswordResetEmail(email)
      return { success: true }
    } catch (e) {
      console.log("Auth/sendEmailResetLink: " + e)
      return { success: false, error: getLocalError(e, "Auth/sendEmailResetLink") }
    }
  }

  public async changeAccountPassword(currentPassword: string, newPassword: string): Promise<IAuthResponse> {
    try {
      const email = Auth().currentUser?.email
      if (email) {
        const authCredential = Auth.EmailAuthProvider.credential(email, currentPassword)
        await Auth().currentUser?.reauthenticateWithCredential(authCredential)
        await Auth().currentUser?.updatePassword(newPassword)
        return { success: true }
      } else {
        return { success: false }
      }
    } catch (e) {
      console.log("Auth/changeAccountPassword: " + e)
      return { success: false, error: getLocalError(e, "Auth/changeAccountPassword") }
    }
  }
}

export default new AuthManager()
