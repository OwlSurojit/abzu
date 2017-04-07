import {fade} from 'material-ui/utils/colorManipulator'

export const enturPrimary = '#41c0c4'
export const enturDark = 'rgb(39, 58, 70)'
const cyan700 = '#0097a7'
const grey100 = '#f5f5f5'
const grey300 = '#e0e0e0'
const grey400 = '#bdbdbd'
const grey500 = '#9e9e9e'
const white = '#ffffff'
const darkBlack = 'rgba(0, 0, 0, 0.87)'
const fullBlack = 'rgba(0, 0, 0, 1)'

export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: enturPrimary,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: enturPrimary,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: enturPrimary,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  datePicker: {
    selectColor: enturPrimary,
    selectTextColor: white,
  },
  appBar: {
    color: enturDark,
  },
}