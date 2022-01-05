import { ViewStyle, TextStyle, ImageStyle } from "react-native"

// Trick to ensure this type accept strict empty object only.
// since any object is a child from empty object.
export interface IEmpty {
  _?: never
}

// FIXME: Is there a better way to define this?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IObject<T = any> = Record<string, T>

// Trick to convert view style object `obj` type form {[key in string]: ViewStyle} to
// {[key in keysof typeof obj]: ViewStyle }
export function ViewStyleSheet<V extends string>(obj: Record<V, ViewStyle>) {
  return obj
}

// Trick to convert text style object `obj` type form {[key in string]: TextStyle} to
// {[key in keysof typeof obj]: TextStyle }
export function TextStyleSheet<V extends string>(obj: Record<V, TextStyle>) {
  return obj
}

// Trick to convert image style object `obj` type form {[key in string]: ImageStyle} to
// {[key in keysof typeof obj]: ImageStyle }
export function ImageStyleSheet<V extends string>(obj: Record<V, ImageStyle>) {
  return obj
}

export type KeyOf<T> = keyof Required<T>

export const objectKeys = <T>(object: T): (keyof T)[] => {
  return Object.keys(object) as (keyof T)[]
}

export type Nullable<T> = T | undefined | null
