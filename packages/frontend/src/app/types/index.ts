export type Photo = {
  imageFile?: {
    width: number
    height: number
  }
  resized?: {
    small: string
    medium: string
    large: string
  }
}
