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

import GrouOfStopPlace from '../models/GroupOfStopPlace';
import StopPlace from '../models/StopPlace';

export const getGroupOfStopPlace = (state, action) => {
  if (action.operationName === 'getGroupOfStopPlaces') {
    const groupOfStopPlace = extractGroupOfStopPlace(
      action,
      'groupOfStopPlaces'
    );
    if (groupOfStopPlace !== null) {
      const clientGroup = new GrouOfStopPlace(groupOfStopPlace).toClient();

      return Object.assign({}, state, {
        current: copy(clientGroup),
        original: copy(clientGroup),
        isModified: false,
        notFound: false,
        zoom: 15
      });
    } else {
      return Object.assign({}, state, {
        current: null,
        original: null,
        isModified: false,
        notFound: true
      });
    }
  }
  return state;
};

export const addMemberToGroup = (current, payLoad) => {
  let membersJSON = payLoad.data;

  if (membersJSON == null) {
    return current;
  }

  let newGroup = copy(current);

  const members = Object.keys(membersJSON).map(key =>
    new StopPlace(membersJSON[key][0], true).toClient()
  );
  newGroup.members = newGroup.members.concat(members);

  return newGroup;
};

const extractGroupOfStopPlace = (action, key) => {
  const data = action.result.data[key];
  if (Array.isArray(data) && data.length) {
    return data[0];
  } else {
    return data;
  }
};

const copy = data => JSON.parse(JSON.stringify(data));
