import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS14View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';

// @todo hbenjelloun implement
const bodyCellsPackets = [
  {
    label: 'forwardingStatus',
    onHover: () => console.log('tooltip forwardingStatus. Use lastUpdateModeFwdStatus & lastUpdateTimeFwdStatus'),
  },
  {
    label: 'rid',
    onHover: () => console.log('tooltip rid. Use lastUpdateModeRid & lastUpdateTimeRid'),
  },
  {
    label: 'sid',
    onHover: () => console.log('tooltip sid. Use lastUpdateModeSid & lastUpdateTimeSid'),
  },
  {
    label: 'sidLabel',
    onHover: () => console.log('tooltip sidLabel. Use lastUpdateModeSid & lastUpdateTimeSid'),
  },
  {
    label: 'subsamplingRatio',
    onHover: () => console.log('tooltip subsamplingRatio. Use lastUpdateModeSubSamplingRatio & lastUpdateTimeSubSamplingRatio'),
  },
  {
    label: 'totalTimeShiftOffset',
    onHover: () => console.log('tooltip totalTimeShiftOffset. Use lastUpdateModeTotalTimeShiftOffset & lastUpdateTimeTotalTimeShiftOffset'),
  },
];

const backgroundDisabled = { backgroundColor: '#e67e22' };
const backgroundEnabled = { backgroundColor: '#2ecc71' };
const emptyObject = {};

// apply background color to cells for which value is ENABLED or DISABLED
export const overrideStyle = ({ content }) => ({
  ...(
// eslint-disable-next-line no-nested-ternary
    content.value === 'DISABLED'
    ? backgroundDisabled
    : content.value === 'ENABLED'
      ? backgroundEnabled
      : emptyObject
  ),
});

export default class PUS14View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS14ViewContainer mapStateToProps
    serviceApid: PropTypes.number,
    serviceApidName: PropTypes.string,
  };

  static defaultProps = {
    serviceApid: null,
    serviceApidName: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      serviceApid,
      serviceApidName,
      viewId,
    } = this.props;

    if (!isValid(serviceApidName, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus14">
          <div className="header">
            {renderHeaders(
              serviceApid,
              serviceApidName
            )}
          </div>
          <div className="info col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'pus014TmPacket'}
                bodyCellActions={bodyCellsPackets}
                overrideStyle={overrideStyle}
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
    <div className="info col-sm-4 pus14_ap">
      Application Process&nbsp;
      <input type="text" disabled value={serviceApidName} />&nbsp;
      <input className="mw50" type="text" disabled value={serviceApid} />
    </div>
  </ErrorBoundary>
);

export const isValid = (applicationProcessName, applicationProcessId) =>
  typeof applicationProcessName === 'string' &&
  applicationProcessName.length > 0 &&
  typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus14 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
