import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import parameters from 'common/configurationManager';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import { PUS_SERVICE_18 } from 'constants';
import PUS18View from './PUS18View';
import { injectTabularData } from '../../../commonData/reducer';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;
  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_18 });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    for (let i = 0; i < data.headers.length; i += 1) {
      data.headers[i].engineStatus = statuses[String(_.getOr(200, 'engineStatus', data.headers[i]))];
      data.headers[i].lastUpdateModeEngineStatus = updateTypes[String(_.getOr(200, 'lastUpdateModeEngineStatus', data.headers[i]))];
      data.headers[i].serviceApid = _.getOr(null, 'serviceApid', data.headers[i]);
      data.headers[i].serviceApidName = _.getOr(null, 'serviceApidName', data.headers[i]);
      data.headers[i].uniqueId = _.getOr(null, 'uniqueId', data.headers[i]);
    }

    data = injectTabularData(
      data,
      'onBoardCtrlProcedures',
      _.getOr([], ['dataForTables', 'pus018Obcp'], data)
        .map(obcp => ({
          ...obcp,
          status: statuses[String(_.getOr(200, 'status', obcp))],
          lastUpdateModeObcpId: updateTypes[String(_.getOr(200, 'lastUpdateModeObcpId', obcp))],
          lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', obcp))],
          lastUpdateModeStepId: updateTypes[String(_.getOr(200, 'lastUpdateModeStepId', obcp))],
          lastUpdateModePartitionId: updateTypes[String(_.getOr(200, 'lastUpdateModePartitionId', obcp))],
          lastUpdateModeObsLevel: updateTypes[String(_.getOr(200, 'lastUpdateModeObsLevel', obcp))],
          lastUpdateModePriority: updateTypes[String(_.getOr(200, 'lastUpdateModePriority', obcp))],
        }))
    );

    data = injectTabularData(
      data,
      'procedureParameters',
      _.uniqBy(
        'parameterId',
        _.getOr([], ['dataForTables', 'pus018Obcp'], data)
          .reduce((acc, store) => [
            ...acc,
            ...store.pusParameter.map(param => ({
              ...param,
              lastUpdateModeParameterId: updateTypes[String(_.getOr(200, 'lastUpdateModeParameterId', param))],
              obcpId: store.obcpId,
            })),
          ], [])
      )
    );

    data = _.omit(['dataForTables'], data);
  }

  const windowId = getWindowIdByViewId(state, { viewId });

  return {
    data,
    windowId,
  };
};

const PUS18ViewContainer = connect(mapStateToProps, null)(PUS18View);

PUS18ViewContainer.propTypes = { viewId: PropTypes.string.isRequired };

export default PUS18ViewContainer;
