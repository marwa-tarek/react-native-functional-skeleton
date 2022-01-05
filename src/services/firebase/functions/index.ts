import functions from "@react-native-firebase/functions"
import { getLocalError } from "./utils"
import { IFunctionResponse } from "./types"

class FunctionsManager {
  public async callFunction<T, R>(name: string, requestData: T): Promise<IFunctionResponse<R>> {
    try {
      const response = await functions().httpsCallable(name)(requestData)
      return { success: true, data: response.data }
    } catch (error) {
      console.log(`Functions/${name} :`, error)
      return { success: false, error: getLocalError(error.message, `Functions/${name}`) }
    }
  }

  public async callFunctionParseResponse<T, R>(name: string, requestData: T): Promise<IFunctionResponse<R>> {
    try {
      const response = await functions().httpsCallable(name)(requestData)
      return { success: true, data: JSON.parse(response.data) }
    } catch (error) {
      console.log(`Functions/${name} :`, error)
      return { success: false, error: getLocalError(error, `Functions/${name}`) }
    }
  }
}

export default new FunctionsManager()
