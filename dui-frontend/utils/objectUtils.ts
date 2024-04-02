export function extractField(data: any, field?: string): any {
  if (!field) return data

  const fields = field.split('.')
  let tmp = data
  for (const field of fields) {
    tmp = tmp[field]
  }
  return tmp
}
