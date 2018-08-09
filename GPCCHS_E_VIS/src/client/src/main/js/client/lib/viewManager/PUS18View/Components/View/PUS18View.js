import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS18View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';

// ON BOARD CTRL PROCEDURE
const onBoardCtrlProceduresTooltips = {
  obcpId: { mode: 'lastUpdateModeObcpId', time: 'lastUpdateTimeObcpId' },
  status: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  stepId: { mode: 'lastUpdateModeStepId', time: 'lastUpdateTimeStepId' },
  partitionId: { mode: 'lastUpdateModePartitionId', time: 'lastUpdateModePartitionId' },
  observabilityLevel: { mode: 'lastUpdateModeObsLevel', time: 'lastUpdateTimeObsLevel' },
  priority: { mode: 'lastUpdateModePriority', time: 'lastUpdateTimePriority' },
};
const _onBoardCtrlProceduresModifier = tableModifier(onBoardCtrlProceduresTooltips);

const _onBoardCtrlProceduresStatusKeyList = [
  'status',
];
// apply background color to cells for which value is ENABLED or DISABLED
const _onBoardCtrlProceduresOverrideStyle = tableOverrideStyle(_onBoardCtrlProceduresStatusKeyList);

// PROCEDURE PARAMETERS

export default class PUS18View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS18ViewContainer mapStateToProps
    serviceApid: PropTypes.number,
    serviceApidName: PropTypes.string,
    apids: PropTypes.arrayOf(PropTypes.shape({
      apidName: PropTypes.string,
      apidRawValue: PropTypes.string,
    })),
  };

  static defaultProps = {
    serviceApid: null,
    serviceApidName: null,
    apids: [],
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      serviceApid,
      serviceApidName,
      apids,
      viewId,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus18">
          <div className="header">
            {renderHeaders(
              serviceApid,
              serviceApidName
            )}
          </div>
          <div className="col-sm-12">
            <div className="row">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'onBoardCtrlProcedures'}
                contentModifier={_onBoardCtrlProceduresModifier}
                overrideStyle={_onBoardCtrlProceduresOverrideStyle}
              />
            </div>
            <div className="row">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'procedureParameters'}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export const renderHeaders = (
  serviceApid,
  serviceApidName
) => (
  <ErrorBoundary>
    <div className="info col-sm-4 pus18_ap">
      Application Process&nbsp;
      <input type="text" disabled value={serviceApidName} />&nbsp;
      <input className="mw50" type="text" disabled value={serviceApid} />
    </div>
  </ErrorBoundary>
);

export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus18 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
