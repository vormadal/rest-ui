import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractField<V = string>(data: unknown, field?: string): V | undefined {
  if (!field || !data) return data as V
  if (typeof data !== 'object') return data as V

  const fields = field.split('.')
  let tmp = data
  for (const field of fields) {
    const keys = Object.keys(tmp)
    if (keys.includes(field)) {
      tmp = tmp[field as keyof typeof tmp]
    }
  }
  return tmp as V
}
