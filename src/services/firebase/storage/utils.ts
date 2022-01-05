// Format firebase storage exceptions to readable error message to user and log only unhandled exceptions (general errors) using Rollbar
export const getLocalError = (error: any, lable: string): string => {
  switch (error) {
    default:
      //TODO: Add rollbar logging and general error dialog here
      return ""
  }
}
