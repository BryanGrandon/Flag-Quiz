export const isValidOption = <T extends Record<string, string>>(obj: T, value: string | null): value is T[keyof T] => {
  return value !== null && Object.values(obj).includes(value as T[keyof T])
}
