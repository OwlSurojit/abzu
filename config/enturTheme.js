/*
 *  Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
the European Commission - subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.
You may obtain a copy of the Licence at:

  https://joinup.ec.europa.eu/software/page/eupl

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the Licence for the specific language governing permissions and
limitations under the Licence. */

import { fade } from 'material-ui/utils/colorManipulator';
import { getIn } from '../utils';

export const enturPrimary = '#41c0c4';
export const enturPrimaryDarker = '#37abaf';
export const enturDark = 'rgb(39, 58, 70)';
const cyan700 = '#0097a7';
const grey100 = '#f5f5f5';
const grey300 = '#e0e0e0';
const grey400 = '#bdbdbd';
const grey500 = '#9e9e9e';
const white = '#ffffff';
const darkBlack = 'rgba(0, 0, 0, 0.87)';
const fullBlack = 'rgba(0, 0, 0, 1)';

export const getTiamatEnv = () => {
  return getIn(window, ['config', 'tiamatEnv'], 'development');
};

export const getEnvColor = env => {
  let currentEnv = env || getTiamatEnv();
  switch (currentEnv.toLowerCase()) {
    case 'development': return '#d18e25';
    case 'test': return '#457645';
    case 'prod': return enturDark;
    default: return enturDark;
  }
}

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
    shadowColor: fullBlack
  },
  datePicker: {
    selectColor: enturPrimary,
    selectTextColor: white
  },
  checkbox: {
    checkedColor: enturPrimaryDarker
  },
  appBar: {
    color: enturDark
  }
};
