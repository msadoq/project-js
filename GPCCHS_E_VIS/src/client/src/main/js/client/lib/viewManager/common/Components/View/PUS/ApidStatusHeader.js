import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { OverlayTrigger } from 'react-bootstrap';
import parameters from 'common/configurationManager';
import classnames from 'classnames';
import { generatePopover } from '../../../pus/tooltip';
import './ApidStatusHeader.scss';

const popoverTrigger = ['hover', 'focus']; // avoid creating a new object in render
const statusColor = parameters.get('PUS_CONSTANTS').STATUS_COLOR;

export default class ApidStatusHeader extends Component {
  static propTypes = {
    serviceApidName: PropTypes.string.isRequired,
    serviceApid: PropTypes.number.isRequired,
    status: PropTypes.string,
    lastUpdateMode: PropTypes.string,
    lastUpdateTime: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    status: null,
    lastUpdateMode: null,
    lastUpdateTime: null,
    label: 'Status',
    id: 'popover-service-status',
  };

  render() {
    const {
      serviceApidName,
      serviceApid,
      status,
      lastUpdateMode,
      lastUpdateTime,
      label,
      id,
    } = this.props;
    const colorStyle = { backgroundColor: statusColor[status] };
    const statusSpan = (
      <span>
        {label}&nbsp;
        <input
          type="text" className={classnames('mw80', status ? status.toLowerCase() : '')}
          disabled value={status} style={colorStyle}
        />
      </span>
    );
    return (
      <ErrorBoundary>
        <div className="apid col-sm-4">
          Application Process&nbsp;
          <input className="mw100" type="text" disabled value={serviceApidName} />&nbsp;
          <input className="mw30" type="text" disabled value={serviceApid} />
        </div>
        <div className="status col-sm-4">
          <OverlayTrigger
            trigger={popoverTrigger}
            placement="bottom"
            overlay={generatePopover(
              id,
              lastUpdateTime,
              lastUpdateMode
            )}
          >
            {statusSpan}
          </OverlayTrigger>
          <span className="spacing" />
        </div>
      </ErrorBoundary>
    );
  }
}
