const DYNAMIC_KEYS = {
  mode: 'Category_Mode',
}

type DynamicTypes = keyof typeof DYNAMIC_KEYS

type DynamicStorageKey = {
  base: DynamicTypes | string
  dynamic: string | string[]
}

export const dynamicStorageKey = ({ base, dynamic }: DynamicStorageKey) => {
  const concat = '_:_'

  switch (base) {
    case Object.keys(DYNAMIC_KEYS)[0]:
      return DYNAMIC_KEYS.mode + concat + dynamic

    // Delete
    default: {
      let key: string = base
      for (let i = 0; i < dynamic.length; i++) key += `:${dynamic[i]}`
      return key
    }
  }
}
