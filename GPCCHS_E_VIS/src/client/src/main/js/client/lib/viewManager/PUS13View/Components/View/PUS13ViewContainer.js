import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import parameters from 'common/configurationManager';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import { PUS_SERVICE_13 } from 'constants';
import { open as openModal } from 'store/actions/modals';
import PUS13View from './PUS13View';
import { injectTabularData } from '../../../commonData/reducer';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const transfertTypes = parameters.get('PUS_CONSTANTS').TRANSFERT_TYPE;
  const LtGroundStatuses = parameters.get('PUS_CONSTANTS').LARGE_TRANSFER_GROUND_STATUS;
  const LtPartStatuses = parameters.get('PUS_CONSTANTS').LARGE_TRANSFER_PART_STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_13 });


  if (typeof data === 'object' && Object.keys(data).length > 0) {
    data = injectTabularData(
      data,
      'uplink',
      _.getOr([], ['dataForTables', 'pUS013UplinkLdt'], data)
      .map(upData => ({
        status: LtGroundStatuses[String(_.getOr(10, 'status', upData))],
        transferType: transfertTypes[String(_.getOr(200, 'transferType', upData))],
        ...upData.transferType !== 1 ? // display fields only if FILE transfert type
        {
          fileTypeCode: '',
          partitionId: '',
          fileId: '',
          fileChecksum: '',
        } : {},
        lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', upData))],
        lastUpdateModeLduId: updateTypes[String(_.getOr(200, 'lastUpdateModeLduId', upData))],
        lastUpdateModeStartTime: updateTypes[String(_.getOr(200, 'lastUpdateModeStartTime', upData))],
        lastUpdateModeEndTime: updateTypes[String(_.getOr(200, 'lastUpdateModeEndTime', upData))],
        lastUpdateModeSize: updateTypes[String(_.getOr(200, 'lastUpdateModeSize', upData))],
        lastUpdateModeRemainSize: updateTypes[String(_.getOr(200, 'lastUpdateModeRemainSize', upData))],
        lastUpdateModePercent: updateTypes[String(_.getOr(200, 'lastUpdateModePercent', upData))],
        lastUpdateModeFailureCode: updateTypes[String(_.getOr(200, 'lastUpdateModeFailureCode', upData))],
        lastUpdateModeFileChecksum: updateTypes[String(_.getOr(200, 'lastUpdateModeFileChecksum', upData))],
      }))
    );
    data = injectTabularData(data, 'downlink',
      _.getOr([], ['dataForTables', 'pUS013DownlinkLdt'], data)
      .map(downData => ({
        status: LtGroundStatuses[String(_.getOr(10, 'status', downData))],
        transferType: transfertTypes[String(_.getOr(200, 'transferType', downData))],
        ...downData.transferType !== 1 ? // display fields only if FILE transfert type
        {
          fileTypeCode: '',
          partitionId: '',
          fileId: '',
          fileChecksum: '',
        } : {},
        lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', downData))],
        lastUpdateModeLduId: updateTypes[String(_.getOr(200, 'lastUpdateModeLduId', downData))],
        lastUpdateModeStartTime: updateTypes[String(_.getOr(200, 'lastUpdateModeStartTime', downData))],
        lastUpdateModeEndTime: updateTypes[String(_.getOr(200, 'lastUpdateModeEndTime', downData))],
        lastUpdateModeSize: updateTypes[String(_.getOr(200, 'lastUpdateModeSize', downData))],
        lastUpdateModeRemainSize: updateTypes[String(_.getOr(200, 'lastUpdateModeRemainSize', downData))],
        lastUpdateModePercent: updateTypes[String(_.getOr(200, 'lastUpdateModePercent', downData))],
        lastUpdateModeFailureCode: updateTypes[String(_.getOr(200, 'lastUpdateModeFailureCode', downData))],
        lastUpdateModeFileChecksum: updateTypes[String(_.getOr(200, 'lastUpdateModeFileChecksum', downData))],
      }))
    );

    data = _.omit(['dataForTables'], data);
  }

  const windowId = getWindowIdByViewId(state, { viewId });

  // data for modal
  const upModalData = _.get(['tables', 'uplink', 'data', 'pUS013LdtPart'], data)
    .map(part => ({
      ...part,
      status: LtPartStatuses[String(_.getOr('error', 'status', part))],
    }));
  const downModalData = _.get(['tables', 'downlink', 'data', 'pUS013LdtPart'], data)
    .map(part => ({
      ...part,
      status: LtPartStatuses[String(_.getOr('error', 'status', part))],
    }));

  return {
    data,
    upModalData,
    downModalData,
    windowId,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  onLdtCellDoubleClick: (windowId, partDetails) => {
    dispatch(
      openModal(
        windowId,
        {
          type: 'pus13Modal',
          title: 'View Details',
          viewId,
          partDetails,
        }
      )
    );
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onLdtCellDoubleClick: tableId => (rowIndex) => {
    let partDetails;
    if (tableId === 'uplink') {
      const { upModalData } = stateProps;

      partDetails = upModalData[rowIndex];
    }
    if (tableId === 'downlink') {
      const { downModalData } = stateProps;

      partDetails = downModalData[rowIndex];
    }
    if (partDetails) {
      dispatchProps.onCommandCellDoubleClick(
        stateProps.windowId,
        partDetails
      );
    } else {
      throw new Error('partDetails undefined');
    }
  },
});

const PUS13ViewContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PUS13View);

PUS13ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS13ViewContainer;
