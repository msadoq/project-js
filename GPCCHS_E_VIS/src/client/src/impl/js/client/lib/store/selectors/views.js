import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import u from 'updeep';

import parseFormula from '../../dataManager/structures/common/formula';
import { getViewData } from './viewData';
import { compile } from '../../common/operators';

export const getViews =
  _.prop('views');

export const getView =
  (state, viewId) =>
    _.prop(viewId, getViews(state));

export const getEntryPointOnAxis = (state, viewId, axisId) => {
  const epOnAxis = [];
  if (!state.views[viewId] || !state.views[viewId].configuration.axes[axisId]) {
    return epOnAxis;
  }
  state.views[viewId].configuration.entryPoints.forEach((ep) => {
    if (ep.connectedDataX.axisId === axisId || ep.connectedDataY.axisId === axisId) {
      epOnAxis.push(ep.name);
    }
  });
  return epOnAxis;
};

export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

export const getViewConfiguration = createSelector(
  getView,
  _.prop('configuration')
);

export const getViewContent = createSelector(
  getViewConfiguration,
  _.prop('content')
);

export const decorateEntryPoint =
  _.cond([
    [_.anyPass([
      _.allPass([
        _.compose(parseFormula, _.path(['connectedDataX', 'formula'])),
        _.compose(parseFormula, _.path(['connectedDataY', 'formula']))
      ]),
      _.compose(parseFormula, _.path(['connectedData', 'formula']))
    ]), _.identity],
    [_.stubTrue, _.assoc('error', 'INVALID FORMULA')]
  ]);

export const getViewEntryPoints = createSelector(
  getView,
  _.pipe(
      _.pathOr([], ['configuration', 'entryPoints']),
      _.map(decorateEntryPoint)
  )
);

export const getViewEntryPoint = (state, viewId, epName) =>
  _.pipe(
    () => getViewEntryPoints(state, viewId).find(ep => ep.name === epName),
    decorateEntryPoint,
  )();

export const getViewEntryPointStateColors = createSelector(
  getViewEntryPoint,
  _.propOr([], 'stateColors')
);

const getEntryPoint = (epName, entryPoints) => entryPoints.find(ep => ep.name === epName);
const getEntryPointColorObj = ({ entryPoints, epName, value, dataProp }) => {
  const stateColor = _.propOr([], 'stateColors', getEntryPoint(epName, entryPoints))
    .filter(c =>
      (new RegExp(`${_.pathOr('', ['condition', 'field'], c)}$`, 'g'))
        .test(_.pathOr('', [dataProp, 'formula'], getEntryPoint(epName, entryPoints))))
    .find(c => compile(c.condition)(value));
  if (_.prop('color', stateColor)) {
    return {
      color: _.prop('color', stateColor)
    };
  }
};

// Return value obj for TextView with color and check if entryPoint is valid
const getTextValueFn = (entryPoints, epName) => ({ value, ...args }) => ({
  value,
  ...args,
  ...getEntryPointColorObj({
    entryPoints,
    epName,
    value,
    dataProp: 'connectedData'
  })
});

// Apply state colors on entry points value and return view data with state colors
export const getTextViewData = createSelector(
    getViewEntryPoints,
    getViewData,
    (entryPoints, data) => u({
      values: {
        ...Object.keys(_.getOr({}, ['values'], data)).reduce((acc, epName) => ({
          ...acc,
          [epName]: getTextValueFn(entryPoints, epName)
        }), {})
      }
    }, data)
);

// Apply state colors on entry points values and return view data with state colors
export const getPlotViewData = createSelector(
    getViewEntryPoints,
    getViewData,
    (entryPoints, data) => u({
      columns: columns =>
        (columns || []).map(col =>
          Object.keys(col)
            .filter(k => k !== 'x')
            .reduce((acc, epName) => ({
              ...acc,
              ...u({
                [epName]: ({ value, ...args }) => ({
                  value,
                  ...args,
                  ...getEntryPointColorObj({ entryPoints, epName, value, dataProp: 'connectedDataY' })
                })
              }, col)
            }), {})
        )
    }, data)
);
