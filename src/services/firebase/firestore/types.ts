import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { IObject, KeyOf } from "@yourProjectName/utils"

export enum CollectionName {
  exampleCollection = "",
}

export type FromDBConverter<T> = (docID: string, data: IObject) => T
export type ToDBConverter<T> = (data: Partial<T>) => IObject

export interface IConverters<T> {
  fromDB: FromDBConverter<T>
  toDB?: ToDBConverter<T>
}

interface IBaseCollection<T> {
  name: CollectionName
  fields: DBFieldType<Omit<T, "ID">>
  converters: IConverters<T>
}

type IReadOnlyCollection<T> = Readonly<IBaseCollection<T>>
export type ICollection<T> = IReadOnlyCollection<T> | Readonly<ISubCollection<T>>

export interface ISubCollection<T> extends Omit<IReadOnlyCollection<T>, "name"> {
  name: string
  path: string
  documentID?: string
}

export interface IDBResponse<T = undefined> {
  success: boolean
  data?: T
  error?: string
}

type CurateTimestamp = {
  _nanoseconds: number
  _seconds: number
}

export type CollectionRef = FirebaseFirestoreTypes.CollectionReference
export type DBQuery = FirebaseFirestoreTypes.Query
export type FilterOperator = FirebaseFirestoreTypes.WhereFilterOp
export type QuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot
export type DocumentRef = FirebaseFirestoreTypes.DocumentReference
export type PromiseResponse<T = undefined> = Promise<IDBResponse<T>>
export type TimeStamp = FirebaseFirestoreTypes.Timestamp & CurateTimestamp
export type Unsubscribe = () => void
export type OrderDirection = "asc" | "desc"
export type DocumentChangeType = FirebaseFirestoreTypes.DocumentChangeType
export type DBFieldType<T> = Readonly<Record<KeyOf<T>, string>>
