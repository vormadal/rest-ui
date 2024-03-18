function format(includeDate: boolean, includeTime: boolean, value?: Date) {
  if (!value) return undefined

  if(typeof value === 'string') value = new Date(value)
  
  const year = value.getFullYear()
  const month = (value.getMonth() + 1).toString().padStart(2, '0')
  const day = value.getDate().toString().padStart(2, '0')

  const hours = value.getHours().toString().padStart(2, '0')
  const minutes = value.getMinutes().toString().padStart(2, '0')

  const date = `${year}-${month}-${day}`
  const time = `${hours}:${minutes}`
  if (includeDate && !includeTime) return date
  if (!includeDate && includeTime) return time

  return `${date}T${time}`
}

export function formatInputDate(value?: Date) {
  return format(true, false, value)
}

export function formatInputDateTime(value?: Date) {
  return format(true, true, value)
}

export function formatInputTime(value?: Date) {
  console.log('time', value)
  return format(false, true, value)
}

export function parseTime(value: string): Date {
  const parts = value.split(':')
  const hours = Number.parseInt(parts[0])
  const minutes = Number.parseInt(parts[1])
  const date = new Date(0)
  date.setHours(hours)
  date.setMinutes(minutes)
  return date
}

export function time2Minutes(value: Date): number {
  return value.getHours() * 60 + value.getMinutes()
}

export function time2Seconds(value: Date): number {
  return time2Minutes(value) * 60 + value.getSeconds()
}
