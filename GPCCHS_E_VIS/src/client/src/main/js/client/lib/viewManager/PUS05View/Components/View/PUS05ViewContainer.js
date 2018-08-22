import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import parameters from 'common/configurationManager';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import { PUS_SERVICE_05 } from 'constants';
import PUS05View from './PUS05View';
import { injectTabularData } from '../../../commonData/reducer';

import { getWindowIdByViewId } from '../../../../store/selectors/windows';


const mapStateToProps = (state, { viewId }) => {
  let data = getPUSViewData(state, { viewId, PUS_SERVICE_05 });

  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    for (let i = 0; i < data.headers.length; i += 1) {
      data.headers[i].status = statuses[_.getOr(200, 'status', data.headers[i])];
      data.headers[i].serviceApid = _.getOr(null, 'serviceApid', data.headers[i]);
      data.headers[i].serviceApidName = _.getOr(null, 'serviceApidName', data.headers[i]);
      data.headers[i].uniqueId = _.getOr(null, 'uniqueId', data.headers[i]);
    }

    // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
    data = injectTabularData(data, 'onBoardEvents',
    _.getOr([], ['pus005OnBoardEvent'], data)
      .map(boardEvent => ({
        ...boardEvent,
        onBoardStatus: statuses[String(_.getOr(200, 'onBoardStatus', boardEvent))],
        defaultOnBoardStatus: statuses[String(_.getOr(200, 'defaultOnBoardStatus', boardEvent))],
        lastUpdateModeRid: updateTypes[String(_.getOr(200, 'lastUpdateModeRid', boardEvent))],
        lastUpdateModeOnBoardStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeOnBoardStatus', boardEvent))],
        lastUpdateModeAlarmLevel: updateTypes[String(_.getOr(200, 'lastUpdateModeAlarmLevel', boardEvent))],
      }))
    );
    data = injectTabularData(data, 'received',
      _.getOr([], ['pus005ReceivedOnBoardEvent'], data)
        .map(received => ({
          ..._.omit(['parameter'], received),
          ..._.getOr([], 'parameter', received) // 10 first parameters received
            .slice(0, 10)
            .map((param, i) => (
              _.mapKeys(
                value => value.concat(i + 1)
                , param
              )
            ))
            .reduce((a, c) => _.assign(c, a), {}),
        }))
    );

    data = _.omit(['dataForTables'], data);
  }

  const windowId = getWindowIdByViewId(state, { viewId });

  return {
    data,
    windowId,
  };
};

const PUS05ViewContainer = connect(mapStateToProps, null)(PUS05View);

PUS05ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS05ViewContainer;
