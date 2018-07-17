/* eslint-disable no-unused-vars */
import {
  WS_VIEW_ADD_ENTRYPOINT,
  WS_VIEW_OPENED,
  WS_VIEW_UPDATE_ENTRYPOINT,
} from '../../types';
import { getConfigurationByViewId } from '../../../viewManager';
import { getPageIdByViewId } from '../../reducers/pages';
import { askItemMetadata } from '../../actions/catalogs';


const onNeededMetadata = ({ dispatch, getState }) => next => (action) => { // rename to 'triggerAskMetadata'
  const state = getState();

  const _askEntryPointRelatedMetadata = (entryPoint, { viewId }) => {
    const { connectedData } = entryPoint;

    if (!connectedData) {
      return;
    }

    const { domain, timeline, catalog, catalogItem } = connectedData;

    const pageId = getPageIdByViewId(state, { viewId });

    dispatch(askItemMetadata(viewId, pageId, domain, timeline, catalog, catalogItem));
  };

  const _askEntryPointsRelatedMetadata = (entryPoints, { viewId }) => {
    if (entryPoints) {
      entryPoints.forEach((ep) => {
        _askEntryPointRelatedMetadata(ep, { viewId });
      });
    }
  };

  if (action.type === WS_VIEW_OPENED) {
    const { viewId } = action.payload;
    const conf = getConfigurationByViewId(state, { viewId });
    _askEntryPointsRelatedMetadata(conf.entryPoints, { viewId });
  }

  if (
    action.type === WS_VIEW_ADD_ENTRYPOINT ||
    action.type === WS_VIEW_UPDATE_ENTRYPOINT
  ) {
    const { viewId, entryPoint } = action.payload;
    _askEntryPointRelatedMetadata(entryPoint, { viewId });
  }

  return next(action);
};

export default onNeededMetadata;
