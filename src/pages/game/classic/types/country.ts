interface Flags {
  png: string
  svg: string
  alt: string
}

interface CountryNativeName {
  [key: string]: {
    official: string
    common: string
  }
}

interface CountryName {
  common: string
  official: string
  nativeName: CountryNativeName
}

export interface Country {
  flags: Flags
  name: CountryName
  capital: string[]
  population: number
}
