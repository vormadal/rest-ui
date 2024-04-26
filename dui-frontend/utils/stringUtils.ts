export function FirstUppercase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  
  export function FirstLowerCase(value: string) {
    return value.charAt(0).toLowerCase() + value.slice(1)
  }
  
  export function stripPathParams(path: string): string {
    return path.replace(/\/\{.+?\}/g, '')
  }
  