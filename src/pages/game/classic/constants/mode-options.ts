import { CLASSIC_MODE, type ClassicMode } from './modes'

export type ClassicModeOption = {
  id: number
  label: string
  value: ClassicMode
}

export const CLASSIC_MODE_OPTIONS: ClassicModeOption[] = [
  {
    id: 1,
    label: 'Multiple Choice',
    value: CLASSIC_MODE.MULTIPLE_CHOICE,
  },
  {
    id: 2,
    label: 'Writing',
    value: CLASSIC_MODE.WRITING,
  },
]
