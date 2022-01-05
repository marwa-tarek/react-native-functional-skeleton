import Firestore from "@react-native-firebase/firestore"
import { QuerySnapshot, IConverters } from "./types"

export const parseSnapshotToObjects = <T>(snapshot: QuerySnapshot, converters: IConverters<T>): T[] => {
  return snapshot.docs.map((doc) => converters.fromDB(doc.id, doc.data()))
}

export const arrayUnion = (value: any) => Firestore.FieldValue.arrayUnion(value)

export const increment = () => Firestore.FieldValue.increment(1)

// Format firestore exceptions to readable error message to user and log only unhandled exceptions (general errors) using Rollbar
export const getLocalError = (error: any, label: string): string => {
  switch (error) {
    default:
      //TODO: add general error string
      return ""
  }
}
