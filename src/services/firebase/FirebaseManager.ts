import { default as DBManager } from "./firestore"
import { default as AuthManager } from "./auth"
import { default as FunctionManager } from "./functions"
import { default as StorgeManager } from "./storage"

class FirebaseManager {
  public db = DBManager
  public auth = AuthManager
  public functions = FunctionManager
  public storage = StorgeManager
}

export default new FirebaseManager()
