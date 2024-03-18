export function merge(target: any, source: any) {
  return Object.assign(target, source)
}

export function isEmpty(value: any) {
  return value === undefined || value === null
}
