// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : split of viewData cleaning in dataReducer for plot
// END-HISTORY
// ====================================================================

import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

// eslint-disable-next-line import/prefer-default-export
export const cleanViewData = simple(types.WS_VIEWDATA_CLEAN, 'dataMap', 'previousDataMap');
