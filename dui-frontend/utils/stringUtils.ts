export function FirstUppercase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function FirstLowerCase(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1)
}

export function stripPathParams(path: string): string {
  return path.replace(/\/\{.+?\}/g, '')
}

export function sanitizeString(value: string) {
  const sanitized = value.trim().replaceAll('/', '').replaceAll('_', ' ').replaceAll('-', ' ')

  return addSpaceBeforeUppercase(FirstUppercase(sanitized))
}

export function addSpaceBeforeUppercase(value: string) {
  const matches = value.matchAll(/[A-Z]/g)
  let lastIndex = 0
  let match: undefined | IteratorResult<RegExpExecArray, RegExpExecArray> = undefined
  let result = ''
  do {
    match = matches.next()
    const index = match.done ? value.length : match.value.index
    if (index === 0) continue
    result += value.substring(lastIndex, index)
    if (!match.done) result += ' '
    lastIndex = index
  } while (!match.done)

  return result
}
