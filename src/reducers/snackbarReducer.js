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

import {
  APOLLO_MUTATION_ERROR,
  ERROR,
  OPENED_SNACKBAR,
  DISMISSED_SNACKBAR,
} from "../actions/Types";
import { markBranchHit } from "../test/instrumentation/coverageData";

export const initialState = {
  snackbarOptions: {
    isOpen: false,
    message: "",
    status: null,
  },
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case APOLLO_MUTATION_ERROR:
      markBranchHit("rolesReducer", 0);
      return Object.assign({}, state, {
        snackbarOptions: {
          isOpen: true,
          status: ERROR,
          errorMsg: getErrorMsg(action.error),
        },
      });

    case OPENED_SNACKBAR:
      markBranchHit("rolesReducer", 1);
      return Object.assign({}, state, {
        snackbarOptions: {
          isOpen: true,
          status: action.payload.status,
          errorMsg: null,
        },
      });

    case DISMISSED_SNACKBAR:
      markBranchHit("rolesReducer", 2);
      return Object.assign({}, state, { snackbarOptions: { isOpen: false } });
      
    default:
      markBranchHit("rolesReducer", 3);
      return state;
  }
};

const getErrorMsg = (error) => {
  if (error && error.length) {
    return error[0].message;
  }
  return null;
};

export default rolesReducer;
