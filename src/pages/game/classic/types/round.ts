export interface FlagImage {
  png: string
  svg: string
  alt: string
}

export interface GameRound {
  image: FlagImage
  options: string[]
}
