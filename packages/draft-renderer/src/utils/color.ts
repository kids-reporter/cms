import { colorHex } from './constants'

export enum ThemeColorEnum {
  RED = 'red',
  BLUE = 'blue',
  YELLOW = 'yellow',
}

export type ThemeColorType =
  | ThemeColorEnum.BLUE
  | ThemeColorEnum.RED
  | ThemeColorEnum.YELLOW

export function getColorHex(themeColor: ThemeColorType) {
  switch (themeColor) {
    case ThemeColorEnum.RED: {
      return colorHex.red
    }
    case ThemeColorEnum.YELLOW: {
      return colorHex.yellow
    }
    case ThemeColorEnum.BLUE:
    default: {
      return colorHex.blue
    }
  }
}
