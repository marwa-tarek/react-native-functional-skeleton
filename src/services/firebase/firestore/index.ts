import firestore from "@react-native-firebase/firestore"
import {
  ICollection,
  CollectionRef,
  FilterOperator,
  PromiseResponse,
  DocumentRef,
  Unsubscribe,
  OrderDirection,
  DocumentChangeType,
  ISubCollection,
} from "./types"
import { parseSnapshotToObjects, getLocalError } from "./utils"
import { Query } from "./query"

class FirestoreManager {
  private collectionRef = <T>(collection: ICollection<T>): CollectionRef => {
    return firestore().collection(collection.name)
  }

  private documentRef = <T>(collection: ICollection<T>, id: string): DocumentRef => {
    return firestore()
      .collection(collection.name)
      .doc(id)
  }

  public getSubCollection = <T>(baseSubCollection: ISubCollection<T>, documentID: string): ISubCollection<T> => ({
    ...baseSubCollection,
    name: baseSubCollection.path + "/" + documentID + "/" + baseSubCollection.name,
  })

  public buildQuery = <T, K extends keyof T & string>(
    collection: ICollection<T>,
    filterField: string,
    operator: FilterOperator,
    fieldValue: T[K]
  ): Query<T> => {
    return new Query(this.collectionRef(collection).where(filterField, operator, fieldValue), collection.converters)
  }

  public buildEqualQuery = <T, K extends keyof T & string>(
    collection: ICollection<T>,
    filterField: string,
    fieldValue: T[K]
  ): Query<T> => {
    return this.buildQuery(collection, filterField, "==", fieldValue)
  }

  public buildLimitQuery = <T, K extends keyof T & string>(collection: ICollection<T>, limit: number): Query<T> => {
    return new Query<T>(this.collectionRef(collection).limit(limit), collection.converters)
  }

  public buildOrderByQuery = <T, K extends keyof T & string>(
    collection: ICollection<T>,
    field: string,
    direction: OrderDirection = "asc"
  ): Query<T> => {
    return new Query<T>(this.collectionRef(collection).orderBy(field, direction), collection.converters)
  }

  public getCollectionData = async <T>(collection: ICollection<T>): PromiseResponse<T[]> => {
    try {
      const snapshot = await this.collectionRef(collection).get()
      const data = parseSnapshotToObjects<T>(snapshot, collection.converters)
      return { success: true, data }
    } catch (error) {
      console.log("Firestore/getCollectionData : ", error)
      return { success: false, error: getLocalError(error, "Firestore/getCollectionData") }
    }
  }

  public getQueryData = async <T>(query: Query<T>): PromiseResponse<T[]> => {
    try {
      const snapshot = await query.get()
      const data = parseSnapshotToObjects<T>(snapshot, query.converters)
      return { success: true, data }
    } catch (error) {
      console.log("Firestore/getQueryData : ", error)
      return { success: false, error: getLocalError(error, "Firestore/getQueryData") }
    }
  }

  public getFilteredData = async <T, K extends keyof T & string>(
    collection: ICollection<T>,
    filterField: string,
    operator: FilterOperator,
    fieldValue: T[K]
  ): PromiseResponse<T[]> => {
    const query = this.buildQuery(collection, filterField, operator, fieldValue)
    return this.getQueryData(query)
  }

  public getDocumentDataById = async <T>(collection: ICollection<T>, id: string): PromiseResponse<T> => {
    try {
      const doc = await this.documentRef(collection, id).get()
      const data = doc.data()

      if (data) {
        return { success: true, data: collection.converters.fromDB(doc.id, data) }
      } else {
        return { success: false }
      }
    } catch (error) {
      console.log("Firestore/getDocumentDataById : ", error)
      return { success: false, error: getLocalError(error, "Firestore/getDocumentDataById") }
    }
  }

  public checkDocumentExist = async <T>(collection: ICollection<T>, id: string): PromiseResponse<boolean> => {
    try {
      const doc = await this.documentRef(collection, id).get()
      if (doc.exists) {
        return { success: true, data: doc.exists }
      } else {
        return { success: false, error: getLocalError("Document doesn't exist", "Firestore/checkDocumentExist") }
      }
    } catch (error) {
      console.log("Firestore/checkDocumentExist : ", error)
      return { success: false, error: getLocalError(error, "Firestore/checkDocumentExist") }
    }
  }

  public addDocument = async <T>(collection: ICollection<T>, data: T): PromiseResponse<string> => {
    try {
      const dbData = (collection.converters.toDB && collection.converters.toDB(data)) ?? data
      const doc = await this.collectionRef(collection).add(dbData)
      return { success: true, data: doc.id }
    } catch (error) {
      console.log("Firestore/addDocument : ", error)
      return { success: false, error: getLocalError(error, "Firestore/addDocument") }
    }
  }

  public updateDocument = async <T>(collection: ICollection<T>, id: string, data: Partial<T>): PromiseResponse => {
    try {
      const dbData = (collection.converters.toDB && collection.converters.toDB(data)) ?? data
      await this.documentRef(collection, id).update(dbData)
      return { success: true }
    } catch (error) {
      console.log("Firestore/updateDocument : ", error)
      return { success: false, error: getLocalError(error, "Firestore/updateDocument") }
    }
  }

  public updateNestedDocument = async <P, C>(
    parentCollection: ICollection<P>,
    childCollection: ICollection<C>,
    parentId: string,
    childId: string,
    data: Partial<C>
  ): PromiseResponse => {
    try {
      const dbData = (childCollection.converters.toDB && childCollection.converters.toDB(data)) ?? data
      const ref = firestore()
        .collection(parentCollection.name)
        .doc(parentId)
        .collection(childCollection.name)
        .doc(childId)
      if ((await ref.get()).exists) {
        ref.update(dbData)
      } else {
        ref.set(dbData)
      }
      return { success: true }
    } catch (error) {
      console.log("Firestore/updateNestedDocument : ", error)
      return { success: false, error: getLocalError(error, "Firestore/updateNestedDocument") }
    }
  }

  public setDocument = async <T>(collection: ICollection<T>, id: string, data: Partial<T>, merge = true): PromiseResponse => {
    try {
      const dbData = (collection.converters.toDB && collection.converters.toDB(data)) ?? data
      await this.documentRef(collection, id).set(dbData, { merge })
      return { success: true, data: undefined }
    } catch (error) {
      console.log("Firestore/setDocument : ", error)
      return { success: false, error: getLocalError(error, "Firestore/setDocument") }
    }
  }

  public deleteDocument = async <T>(collection: ICollection<T>, id: string): PromiseResponse => {
    try {
      await this.documentRef(collection, id).delete()
      return { success: true, data: undefined }
    } catch (error) {
      console.log("Firestore/deleteDocument : ", error)
      return { success: false, error: getLocalError(error, "Firestore/deleteDocument") }
    }
  }

  public registerCollectionListener = <T>(
    collection: ICollection<T>,
    onChange: (changeType: DocumentChangeType, data: T) => void,
    onError?: (error: string) => void
  ): Unsubscribe => {
    return this.collectionRef(collection).onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          onChange(change.type, collection.converters.fromDB(change.doc.id, change.doc.data()))
        })
      },
      (error) => {
        console.log("Firestore/registerCollectionListener : ", error)
        const readableError = getLocalError(error, "Firestore/registerCollectionListener")
        onError && onError(readableError)
      }
    )
  }

  // `live` flag indicate if you want only up-to-date version from server
  // and not the cache version
  public registerLiveCollectionListener = <T>(
    collection: ICollection<T>,
    onChange: (data: T[]) => void,
    onError?: (error: string) => void,
    live = false
  ): Unsubscribe => {
    return this.collectionRef(collection).onSnapshot(
      { includeMetadataChanges: live },
      (snapshot) => {
        // if `live` is false, we provide the data from the cache and server
        if (live && snapshot.metadata.fromCache) {
          return
        }

        const data = parseSnapshotToObjects<T>(snapshot, collection.converters)
        onChange(data)
      },
      (error) => {
        console.log("Firestore/registerLiveCollectionListener : ", error)
        const readableError = getLocalError(error, "Firestore/registerLiveCollectionListener")
        onError && onError(readableError)
      }
    )
  }

  public registerQueryListener = <T>(
    query: Query<T>,
    onChange: (changeType: DocumentChangeType, data: T) => void,
    onError?: (error: string) => void
  ): Unsubscribe => {
    return query.onSnapshotChanges(onChange, onError)
  }

  // `live` flag indicate if you want only up-to-date version from server
  // and not the cache version
  public registerLiveQueryListener = <T>(
    query: Query<T>,
    onChange: (data: T[]) => void,
    onError?: (error: string) => void,
    live = false
  ): Unsubscribe => {
    return query.onSnapshot(onChange, onError, live)
  }

  public registerDocumentListener = <T>(
    collection: ICollection<T>,
    documentID: string,
    onChange: (data: T) => void,
    onError?: (error: string) => void
  ): Unsubscribe => {
    return this.documentRef(collection, documentID).onSnapshot(
      (snapshot) => {
        const data = snapshot.data()
        if (data) {
          onChange(collection.converters.fromDB(snapshot.id, data))
        }
      },
      (error) => {
        console.log("Firestore/registerDocumentListener : ", error)
        const readableError = getLocalError(error, "Firestore/registerDocumentListener")
        onError && onError(readableError)
      }
    )
  }
}

export default new FirestoreManager()
