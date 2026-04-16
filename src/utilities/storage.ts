export const storage = {
  save: (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value)),

  load: <T>(key: string): T | null => {
    const data = localStorage.getItem(key)
    return data ? (JSON.parse(data) as T) : null
  },

  remove: (key: string) => localStorage.removeItem(key),
}
