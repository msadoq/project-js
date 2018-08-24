import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS18View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';
import ApidStatusHeader from '../../../common/Components/View/PUS/ApidStatusHeader';

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
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
  };

  static defaultProps = {
    data: {
      headers: [],
      tables: {},
    },
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      viewId,
      data,
    } = this.props;

    if (typeof data === 'object' && Object.keys(data).length === 0) {
      return renderInvald('Please fill-in configuration');
    }

    const headers = data.headers.map(header => (
      <div key={header.serviceApid} className="header">
        {renderHeader(header)}
      </div>
    ));

    return (
      <ErrorBoundary>
        <div className="pus18">
          <div className="header">
            {headers}
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

export const renderHeader = (header) => {
  const {
    serviceApid,
    serviceApidName,
    engineStatus,
    lastUpdateModeEngineStatus,
    lastUpdateTimeEngineStatus,
  } = header;
  return (
    <ApidStatusHeader
      serviceApidName={serviceApidName}
      serviceApid={serviceApid}
      status={engineStatus}
      lastUpdateMode={lastUpdateModeEngineStatus}
      lastUpdateTime={lastUpdateTimeEngineStatus}
      label="Engine Status"
    />
  );
};

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
