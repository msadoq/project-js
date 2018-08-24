import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS13View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableModifier } from '../../../common/pus/utils';


// UP&DOWN LINK MODIFIER
const tooltips = {
  duId: { mode: 'lastUpdateModeLduId', time: 'lastUpdateTimeLduId' },
  status: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  transferType: { mode: 'lastUpdateModeLduId', time: 'lastUpdateTimeLduId' },
  startTime: { mode: 'lastUpdateModeStartTime', time: 'lastUpdateTimeStartTime' },
  endTime: { mode: 'lastUpdateModeEndTime', time: 'lastUpdateTimeEndTime' },
  size: { mode: 'lastUpdateModeSize', time: 'lastUpdateTimeSize' },
  remainingSize: { mode: 'lastUpdateModeRemainSize', time: 'lastUpdateTimeRemainSize' },
  percent: { mode: 'lastUpdateModePercent', time: 'lastUpdateTimePercent' },
  failureCode: { mode: 'lastUpdateModeFailureCode', time: 'lastUpdateTimeFailureCode' },
  fileChecksum: { mode: 'lastUpdateModeFileChecksum', time: 'lastUpdateTimeFileChecksum' },
};

const _linkModifier = tableModifier(tooltips);


export default class PUS13View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS13ViewContainer mapStateToProps
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

    return (
      <ErrorBoundary>
        <div className="pus13">
          <div className="col-sm-12">
            <div className="row">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'uplink'}
                contentModifier={_linkModifier}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="row">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'downlink'}
                contentModifier={_linkModifier}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}


export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus13 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
