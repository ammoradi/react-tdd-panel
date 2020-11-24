export type TColor = 'white' | 'black' | 'lightGray' | 'transparent'

export type TColors = {
  [key in TColor]: string
}

const colors: TColors = {
  white: '#fff',
  black: '#000',
  lightGray: '#f2f2f2',
  transparent: 'transparent'
}

export default colors
