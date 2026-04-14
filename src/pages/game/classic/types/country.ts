type Flags = {
  png: string
  svg: string
  alt: string
}

type CountryNativeName = {
  [key: string]: {
    official: string
    common: string
  }
}

type CountryName = {
  common: string
  official: string
  nativeName: CountryNativeName
}

export type Country = {
  flags: Flags
  name: CountryName
  capital: string[]
  population: number
}
