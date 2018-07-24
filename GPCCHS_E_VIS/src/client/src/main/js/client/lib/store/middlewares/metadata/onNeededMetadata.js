import _ from 'lodash/fp';

import {
  WS_VIEW_ADD_ENTRYPOINT,
  WS_VIEW_OPENED,
  WS_VIEW_UPDATE_ENTRYPOINT,
} from '../../types';
import { getConfigurationByViewId } from '../../../viewManager';
import { askItemMetadata } from '../../actions/catalogs';
import { getDomainId } from '../../reducers/domains';
import { getSessionId, getSessionNameFromTimeline } from '../../reducers/sessions';
import { get } from '../../../common/configurationManager';

const wildcardCharacter = get('WILDCARD_CHARACTER');

const onNeededMetadata = ({ dispatch, getState }) => next => (action) => {
  const state = getState();

  const _askEntryPointRelatedMetadata = (entryPoint) => {
    const { connectedData } = entryPoint;

    if (!connectedData) {
      return;
    }

    const { domain: domainName, timeline: timelineId, catalog, catalogItem } = connectedData;

    const domainId = getDomainId(state, { domainName });
    const sessionName = getSessionNameFromTimeline(state, { timelineId, wildcardCharacter });
    const sessionId = getSessionId(state, { sessionName });

    dispatch(askItemMetadata(domainId, sessionId, catalog, catalogItem));
  };

  const _askEntryPointsRelatedMetadata = (entryPoints) => {
    if (entryPoints) {
      entryPoints.forEach((ep) => {
        _askEntryPointRelatedMetadata(ep);
      });
    }
  };

  if (action.type === WS_VIEW_OPENED) {
    const { viewId } = action.payload;
    const conf = getConfigurationByViewId(state, { viewId });
    _askEntryPointsRelatedMetadata(_.getOr([], 'entryPoints', conf));
  }

  if (
    action.type === WS_VIEW_ADD_ENTRYPOINT ||
    action.type === WS_VIEW_UPDATE_ENTRYPOINT
  ) {
    const { entryPoint } = action.payload;

    _askEntryPointRelatedMetadata(entryPoint);
  }

  return next(action);
};

export default onNeededMetadata;
