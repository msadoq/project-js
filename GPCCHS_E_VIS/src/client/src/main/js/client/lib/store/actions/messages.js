// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Change addMessage action behavior .
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Automatically remove messages after a while
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Add animation to messages removing
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the mouse over the message
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Remove unused addOnce redux messages action
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';
import _ from 'lodash/fp';
import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export const add = simple(
  types.WS_MESSAGE_ADD,
  'containerId', // global, view or page id
  'type', // success, warning, danger, info
  (param) => {
    const messages = _.flatten([param]);
    const extractErrors = _.map(x => (x instanceof Error ? x.message : x));
    const addUuids = _.map(msg => ({ content: msg, uuid: v4() }));
    const createMessages = _.pipe(extractErrors, addUuids);
    return { messages: createMessages(messages) };
  }
);

const createRemove = ({ withAnimation = false } = {}) => (containerId, uuid) => ({
  type: types.WS_MESSAGE_REMOVE,
  payload: { containerId, uuid },
  meta: { withAnimation },
});

export const remove = createRemove();
export const removeWithAnimation = createRemove({ withAnimation: true });

export const cancelRemove = simple(
  types.WS_MESSAGE_CANCEL_REMOVING,
  'containerId',
  'uuid'
);

export const reset = simple(
  types.WS_MESSAGE_RESET,
  'containerId'
);
