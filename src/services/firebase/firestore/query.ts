import { DBQuery, FilterOperator, QuerySnapshot, OrderDirection, DocumentChangeType, IConverters } from "./types"
import { parseSnapshotToObjects } from "./utils"

export class Query<T> {
  private dbQuery: DBQuery
  public converters: IConverters<T>

  public constructor(dbQuery: DBQuery, converter: IConverters<T>) {
    this.dbQuery = dbQuery
    this.converters = converter
  }

  public where<K extends keyof T & string>(filterField: K, operator: FilterOperator, fieldValue: T[K]): Query<T> {
    this.dbQuery = this.dbQuery.where(filterField, operator, fieldValue)
    return this
  }

  public limit(limit: number): Query<T> {
    this.dbQuery = this.dbQuery.limit(limit)
    return this
  }

  public orderBy<K extends keyof T & string>(filterField: K, direction: OrderDirection = "asc"): Query<T> {
    this.dbQuery = this.dbQuery.orderBy(filterField, direction)
    return this
  }

  public startAt<V extends T[keyof T]>(fieldValue: V): Query<T> {
    this.dbQuery = this.dbQuery.startAt(fieldValue)
    return this
  }

  public startAfter<V extends T[keyof T]>(fieldValue: V): Query<T> {
    this.dbQuery = this.dbQuery.startAfter(fieldValue)
    return this
  }

  public endAt<V extends T[keyof T]>(fieldValue: V): Query<T> {
    this.dbQuery = this.dbQuery.endAt(fieldValue)
    return this
  }

  public endBefore<V extends T[keyof T]>(fieldValue: V): Query<T> {
    this.dbQuery = this.dbQuery.endBefore(fieldValue)
    return this
  }

  public get(): Promise<QuerySnapshot> {
    return this.dbQuery.get()
  }

  // `live` flag indicate if you want only up-to-date version from server
  // and not the cache version
  public onSnapshot(onChange: (data: T[]) => void, onError?: (error: string) => void, live = false) {
    return this.dbQuery.onSnapshot(
      { includeMetadataChanges: live },
      (snapshot) => {
        // if `live` is false, we provide the data from the cache and server
        if (live && snapshot.metadata.fromCache) {
          return
        }

        const data = parseSnapshotToObjects<T>(snapshot, this.converters)
        onChange(data)
      },
      (error) => {
        onError && onError(error.message)
      }
    )
  }

  public onSnapshotChanges(onChange: (changeType: DocumentChangeType, data: T) => void, onError?: (error: string) => void) {
    return this.dbQuery.onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          onChange(change.type, this.converters.fromDB(change.doc.id, change.doc.data()))
        })
      },
      (error) => {
        onError && onError(error.message)
      }
    )
  }

  public onSnapshotDataChanges(onChange: (changeType: DocumentChangeType, data: T) => void, onError?: (error: string) => void) {
    return this.dbQuery.onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          onChange(change.type, this.converters.fromDB(change.doc.id, change.doc.data()))
        })
      },
      (error) => {
        onError && onError(error.message)
      }
    )
  }
}
