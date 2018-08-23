import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { PUS_SERVICE_19 } from 'constants';
import { open as openModal } from 'store/actions/modals';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import PUS19View from './PUS19View';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';
import { injectTabularData } from '../../../commonData/reducer';
import parameters from '../../../../common/configurationManager';

const formatBinaryProfile = binaryProfile => (
  binaryProfile.length === 0
    ? []
    : binaryProfile.match(/.{1,16}/g).map(row => row.match(/.{1,2}/g))
);
const updatesConstantsAndTables = (pusData) => {
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  let data = pusData;
  for (let i = 0; i < data.headers.length; i += 1) {
    data.headers[i].serviceApidName = _.getOr(null, 'serviceApidName', data.headers[i]);
    data.headers[i].serviceApid = _.getOr(null, 'serviceApid', data.headers[i]);
    data.headers[i].serviceStatus = statuses[String(_.getOr(200, 'serviceStatus', data.headers[i]))];
    data.headers[i].lastUpdateModeServiceStatus = updateTypes[String(_.getOr(200, 'lastUpdateModeServiceStatus', data.headers[i]))];
    data.headers[i].lastUpdateTimeServiceStatus = _.getOr(null, 'lastUpdateTimeServiceStatus', data.headers[i]);
  }

  data = injectTabularData(
    data,
    'eventActions',
    _.getOr([], ['dataForTables', 'pus19EventAction'], data)
      .map(action => ({
        ...action,
        actionStatus: statuses[String(_.getOr(200, 'actionStatus', action))],
        lastUpdateModeActionStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeActionStatus', action))],
        lastUpdateModeEventActionRid: updateTypes[String(_.getOr(200, 'lastUpdateModeEventActionRid', action))],
        lastUpdateModeActionTc: updateTypes[String(_.getOr(200, 'lastUpdateModeActionTc', action))],
        actionTcPacket: formatBinaryProfile(_.getOr('', 'actionTcPacket', action)),
      }))
  );

  return _.omit(['dataForTables'], data);
};


const mapStateToProps = (state, { viewId }) => {
  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_19 });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    data = updatesConstantsAndTables(data);
  }

  const windowId = getWindowIdByViewId(state, { viewId });

  const eventActionsData = _.get(['tables', 'eventActions'], data); // data for modal

  return {
    data,
    eventActionsData,
    windowId,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  onCommandCellDoubleClick: (windowId, binaryProfile) => {
    dispatch(
      openModal(
        windowId,
        {
          type: 'pus19Modal',
          title: 'View Details',
          viewId,
          binaryProfile,
        }
      )
    );
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onCommandCellDoubleClick: (rowIndex) => {
    const { eventActionsData } = stateProps;

    const data = eventActionsData.data[rowIndex];

    // extract modal data
    const {
      actionTcPacket,
    } = data;

    const binaryProfile = {
      actionTcPacket,
    };

    dispatchProps.onCommandCellDoubleClick(
      stateProps.windowId,
      binaryProfile
    );
  },
});

const PUS19ViewContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PUS19View);

PUS19ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS19ViewContainer;
