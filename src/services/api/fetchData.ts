export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  const data: T = await response.json()
  return data
}
