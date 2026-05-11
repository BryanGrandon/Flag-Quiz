type DynamicStorageKeyProps = {
  base: string
  dynamic: string[]
}
export const dynamicStorageKey = ({ base, dynamic }: DynamicStorageKeyProps) => {
  let key: string = base
  for (let i = 0; i < dynamic.length; i++) key += `:${dynamic[i]}`
  return key
}
