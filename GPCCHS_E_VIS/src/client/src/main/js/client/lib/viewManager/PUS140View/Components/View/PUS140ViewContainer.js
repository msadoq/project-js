import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';

import parameters from 'common/configurationManager';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import { PUS_SERVICE_140 } from 'constants';
import PUS140View from './PUS140View';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';
import { injectTabularData } from '../../../commonData/reducer';

const mapStateToProps = (state, { viewId }) => {
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_140 });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    data = injectTabularData(
      data,
      'parameters',
      _.getOr([], ['dataForTables', 'pus140Parameter'], data)
        .map(param => ({
          ...param,
          lastUpdateModeParamId: updateTypes[String(_.getOr(200, 'lastUpdateModeParamId', param))],
          lastUpdateModeCurrentValue: updateTypes[String(_.getOr(200, 'lastUpdateModeCurrentValue', param))],
        }))
    );

    data = _.omit(['dataForTables'], data);
  }

  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });

  return {
    data,
    domain: _.getOr(null, ['entryPoints', 0, 'connectedData', 'domain'], config),
    timeline: _.getOr(null, ['entryPoints', 0, 'connectedData', 'timeline'], config),
    windowId,
  };
};

const PUS140ViewContainer = connect(mapStateToProps, null)(PUS140View);

PUS140ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS140ViewContainer;
