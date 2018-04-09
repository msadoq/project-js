/* eslint-disable no-unused-vars */

import { WS_PAGE_UPDATE_LAYOUT } from '../../types';
import { updateTableHeight } from '../../actions/tableColumns';

const onPageLayoutUpdate = ({ dispatch, getState }) => next => (action) => {
  const state = getState();
  const { payload } = action;

  switch (action.type) {
    case WS_PAGE_UPDATE_LAYOUT: {
      // assuming there is only one layout update at a time
      const { i: viewId, h: height } = payload.layout[0];

      dispatch(updateTableHeight(viewId, height));
      break;
    }
    default:
      break;
  }

  return next(action);
};

export default onPageLayoutUpdate;
