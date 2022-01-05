import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage"
import { IStorageResponse } from "./types"
import { getLocalError } from "./utils"

class StorageManager {
  public getRef(path: string): FirebaseStorageTypes.Reference {
    return storage().ref(path)
  }

  public async uploadFile(ref: FirebaseStorageTypes.Reference, filePath: string): Promise<IStorageResponse> {
    const uploadTask = await ref.putFile(filePath)
    if (uploadTask.state === "success") {
      const url = await ref.getDownloadURL()
      return { success: true, url }
    } else {
      console.log("Storage/uploadFile : ", uploadTask.error)
      return { success: false, error: getLocalError(uploadTask.error, "Storage/uploadFile") }
    }
  }

  public async uploadString(ref: FirebaseStorageTypes.Reference, file: string): Promise<IStorageResponse> {
    const uploadTask = await ref.putString(file, "data_url")
    if (uploadTask.state === "success") {
      const url = await ref.getDownloadURL()
      return { success: true, url }
    } else {
      console.log("Storage/uploadString : ", uploadTask.error)
      return { success: false, error: getLocalError(uploadTask.error, "Storage/uploadString") }
    }
  }

  public async deleteFile(ref: FirebaseStorageTypes.Reference): Promise<IStorageResponse> {
    try {
      await ref.delete()
      return { success: true }
    } catch (error) {
      console.log("Storage/delete : ", error)
      return { success: false, error: getLocalError(error, "Storage/delete") }
    }
  }
}

export default new StorageManager()
