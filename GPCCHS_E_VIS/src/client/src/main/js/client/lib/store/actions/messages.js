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
