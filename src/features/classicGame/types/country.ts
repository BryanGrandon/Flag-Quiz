type CountryFlags = {
  png: string
  svg: string
  alt: string
}

type NativeNameMap = {
  [locale: string]: {
    official: string
    common: string
  }
}

type CountryNameInfo = {
  common: string
  official: string
  nativeName: NativeNameMap
}

export type Country = {
  flags: CountryFlags
  name: CountryNameInfo
  capital: string[]
  population: number
}
