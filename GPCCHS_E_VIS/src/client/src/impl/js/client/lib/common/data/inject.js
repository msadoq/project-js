import { each, set, get, has } from 'lodash';
import profiling from '../debug/profiling';
import debug from '../debug/mainDebug';
import vivl from '../../../VIVL/main';
import getViewDefinitions from './map/visibleViews';
import { importPayload } from '../../store/actions/viewData';

const logger = debug('data:inject');

export function rangeValues(remoteIdPayload, ep, epName, viewState) {
  const lower = ep.expectedInterval[0];
  const upper = ep.expectedInterval[1];
  const newState = {}; // = { ...viewState };

  each(remoteIdPayload, (value, time) => {
    const timestamp = time;
    // check value is in interval
    if (timestamp < lower || timestamp > upper) {
      return;
    }
    const masterTime = timestamp + ep.offset;
    if (viewState[masterTime]) {
      newState[masterTime] = viewState[masterTime];
      newState[masterTime][epName] =
        { x: value[ep.fieldX], value: value[ep.fieldY] };
    } else {
      set(newState, [masterTime, epName],
        { x: value[ep.fieldX], value: value[ep.fieldY] });
    }
  });
  return newState;
}


// Get the nearest value from the current time
export function oneValue(remoteIdPayload, ep, epName, viewSubState) {
  // Entry points on this remoteId
  const lower = ep.expectedInterval[0];
  const current = ep.expectedInterval[1];
  // previous time recorded
  let previousTime = 0;
  if (viewSubState && viewSubState.index[epName]) {
    if (viewSubState.index[epName] < current) {
      previousTime = viewSubState.index[epName];
    }
  }
  let newValue;
  // search over payloads
  each(remoteIdPayload, (p, time) => {
    if (time < lower || time > current) {
      return;
    }
    if (time >= previousTime) {
      newValue = { time, value: p[ep.field] };
      previousTime = time;
    }
  });
  return newValue;
}

export function selectData(state, viewDefinitions, payload) {
  const bag = {};
  // remoteId
  each(viewDefinitions, (view, viewId) => {
    // Check view type
    const dataLayout = vivl(view.type, 'dataLayout')();
    switch (dataLayout) {
      case 'one': {
        // Entry points
        each(view.entryPoints, (ep, epName) => {
          // No payload for this remote Id
          if (!has(payload, ep.remoteId)) {
            return;
          }
          // Get current state for update
          const currentSubState = get(state, ['viewData', viewId]);
          // compute new data
          const newData = oneValue(payload[ep.remoteId], ep, epName, currentSubState);
          if (!newData) {
            return;
          }
          set(bag, [viewId, 'index', epName], newData.time);
          set(bag, [viewId, 'values', epName], newData.value);
          set(bag, [viewId, 'dataLayout'], dataLayout);
        });
        break;
      }
      case 'range': {
        let isFirstEp = true;
        // Get current state for update
        let epSubState = {};

        each(view.entryPoints, (ep, epName) => {
          // No payload for this remote Id
          if (!has(payload, ep.remoteId)) {
            return;
          }
          if (isFirstEp) {
            // master's timestamp (arbitrary determined from the first entryPoint)
            set(bag, [viewId, 'remove'], {
              lower: ep.expectedInterval[0] + ep.offset,
              upper: ep.expectedInterval[1] + ep.offset });
            isFirstEp = false;
          }

          epSubState = rangeValues(payload[ep.remoteId], ep, epName, epSubState);
        });
        if (Object.keys(epSubState).length !== 0) {
          set(bag, [viewId, 'add'], epSubState);
          set(bag, [viewId, 'dataLayout'], dataLayout);
        }
        break;
      }
      default:
        logger.warn(`unknown view type ${view.type}`);
    }
  });
  return bag;
}

export default function inject(state, dispatch, payload) {
  logger.verbose('begin');

  const start = profiling.start();
  const viewDefinitions = getViewDefinitions(state);
  const data = selectData(state, viewDefinitions, payload);
  dispatch(importPayload(data));

  profiling.stop(
    start,
    `dataInjection (${Object.keys(data).length ? Object.keys(data).length : 0} remoteId)`
  );
}
