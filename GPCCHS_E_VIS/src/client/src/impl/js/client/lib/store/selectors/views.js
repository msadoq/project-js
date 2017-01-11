import { createSelector } from 'reselect';
import _get from 'lodash/get';
import u from 'updeep';

import parseFormula from '../../dataManager/structures/common/formula';
import { getViewData } from './viewData';
import { compile } from '../../common/operators';

export const getViews = state => _get(state, ['views']);

export const getView = (state, viewId) => _get(getViews(state), [viewId]);

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
  view => _get(view, ['configuration'])
);

export const getViewEntryPoints = createSelector(
  getView,
  view => _get(view, ['configuration', 'entryPoints'], [])
);

export const getViewEntryPoint = (state, viewId, epName) =>
  getViewEntryPoints(state, viewId).find(ep => ep.name === epName);

export const getViewEntryPointStateColors = createSelector(
  getViewEntryPoint,
  ep => _get(ep, ['stateColors'], [])
);

const getEntryPoint = (epName, entryPoints) => entryPoints.find(ep => ep.name === epName);
const getEntryPointColorObj = ({ entryPoints, epName, value, dataProp }) => {
  const stateColor = _get(getEntryPoint(epName, entryPoints), ['stateColors'], [])
    .filter(c =>
      (new RegExp(`${_get(c, ['condition', 'field'], '')}$`, 'g'))
        .test(_get(getEntryPoint(epName, entryPoints), [dataProp, 'formula'], '')))
    .find(c => compile(c.condition)(value));
  if (_get(stateColor, ['color'])) {
    return {
      color: _get(stateColor, ['color'])
    };
  }
};

const validateFormula = (entryPoints, epName) => {
  const formula = _get(getEntryPoint(epName, entryPoints), ['connectedData', 'formula']);
  return parseFormula(formula);
};

// Return value obj for TextView with color and check if entryPoint is valid
const getTextValueFn = (entryPoints, epName) => ({ value, ...args }) => {
  const isFormulaValid = validateFormula(entryPoints, epName);
  return {
    value: isFormulaValid ? value : 'INVALID FORMULA',
    ...args,
    ...(() => (
      isFormulaValid ?
        getEntryPointColorObj({
          entryPoints,
          epName,
          value,
          dataProp: 'connectedData'
        }) : {}
    ))()
  };
};

// Apply state colors on entry points value and return view data with state colors
export const getTextViewData = createSelector(
    getViewEntryPoints,
    getViewData,
    (entryPoints, data) => u({
      values: {
        ...Object.keys(_get(data, ['values'], {})).reduce((acc, epName) => ({
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
