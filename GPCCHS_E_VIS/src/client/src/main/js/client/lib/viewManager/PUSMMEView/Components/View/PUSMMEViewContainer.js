import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { open as openModal } from 'store/actions/modals';
import { getData } from 'viewManager/PUSMMEView/store/dataReducer';
import PUSMMEView from './PUSMMEView';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });

  const packetsData = _.get(
    ['tables', 'packets'],
    data
  );

  return {
    serviceApid: _.getOr(null, 'serviceApid', data),
    serviceApidName: _.getOr(null, 'serviceApidName', data),
    apids: _.getOr(null, ['entryPoints', 0, 'connectedData', 'apids'], config),
    packetsData,
    windowId,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  onCommandCellDoubleClick: (windowId, packetStore, packetParameter) => {
    dispatch(
      openModal(
        windowId,
        {
          type: 'pusMmeModal',
          title: 'Details for command',
          viewId,
          packetStore,
          packetParameter,
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
    const { packetsData } = stateProps;

    const data = packetsData.data[rowIndex];

    // extract modal data
    const {
      pusMmePacketStore,
      pusMmePacketParameter,
    } = data;

    dispatchProps.onCommandCellDoubleClick(
      stateProps.windowId,
      pusMmePacketStore,
      pusMmePacketParameter
    );
  },
});

const PUSMMEViewContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PUSMMEView);

export default PUSMMEViewContainer;
