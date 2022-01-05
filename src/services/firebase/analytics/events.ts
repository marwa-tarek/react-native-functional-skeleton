import analytics from "@react-native-firebase/analytics"

export class EventManager {
  public static logEvent(name: string, data: object) {
    analytics().logEvent(name, { ...data, date: new Date() })
  }
}
