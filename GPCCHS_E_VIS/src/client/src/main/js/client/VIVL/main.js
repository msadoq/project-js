import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';

import TextView from './TextView/main';
import PlotView from './PlotView/main';
import DynamicView from './DynamicView/main';

const supportedView = { PlotView, TextView, DynamicView };

export default (viewType, functionName) => {
  const f = _get(supportedView, [viewType, functionName]);
  if (!f || !_isFunction(f)) {
    throw new Error(`invalid function ${functionName} for view type ${viewType}`);
  }

  return f;
};
