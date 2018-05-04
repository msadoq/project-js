import simple from 'store/helpers/simpleActionCreator';
import {
  WS_APIDS_ASK,
  WS_APIDS_ADD,
} from '../types';

export const askApids = simple(
  WS_APIDS_ASK,
  'domainId',
  'sessionId'
);

export const addApids = simple(
  WS_APIDS_ADD,
  'tupleId',
  'apids'
);
