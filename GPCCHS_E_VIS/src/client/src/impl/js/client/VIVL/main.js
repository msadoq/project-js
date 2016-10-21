/* eslint-disable global-require */
import TextView from './TextView/main';
import PlotView from './PlotView/main';
import { get, isFunction } from 'lodash';

const supportedView = { PlotView, TextView };

export default (viewType, functionName) => {
  const f = get(supportedView, [viewType, functionName]);
  if (!f || !isFunction(f)) {
    throw new Error(`invalid function ${functionName} for view type ${viewType}`)
  }

  return f;
};
