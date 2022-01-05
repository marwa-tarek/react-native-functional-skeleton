// Format firebase cloud functions exceptions to readable error message to user and log only unhandled exceptions (general errors) using Rollbar
export const getLocalError = (error: any, label: string): string => {
  switch (error) {
    default:
      //TODO add general error here
      return ""
  }
}
