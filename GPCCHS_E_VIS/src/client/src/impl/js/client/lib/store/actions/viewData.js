import get from 'lodash/fp/get';
import pipe from 'lodash/fp/pipe';
import negate from 'lodash/fp/negate';
import isEmpty from 'lodash/fp/isEmpty';

import simple from '../simpleActionCreator';
import * as types from '../types';
import { withProfiling } from './enhancers';

export const importPayload = simple(types.DATA_IMPORT_VIEWDATA, 'viewData');
export const removeAllData = simple(types.DATA_REMOVE_ALL_VIEWDATA);

const isInjectingData = negate(pipe(get('payload.dataToInject'), isEmpty));

export const updateViewData = withProfiling(
  'data injection',
  simple(
    types.DATA_UPDATE_VIEWDATA,
    'oldViewMap',
    'newViewMap',
    'dataToInject'
  ),
  { predicate: (state, action) => isInjectingData(action) },
);
