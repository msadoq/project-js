import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger } from 'react-bootstrap';
import parameters from 'common/configurationManager';
import classnames from 'classnames';
import { generatePopover } from '../../../pus/tooltip';

const popoverTrigger = ['hover', 'focus']; // avoid creating a new object in render
const statusColor = parameters.get('PUS_CONSTANTS').STATUS_COLOR;

export default class HeaderStatus extends Component {
  static propTypes = {
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
          type="text" className={classnames('mw100', status ? status.toLowerCase() : '')}
          disabled value={status} style={colorStyle}
        />
      </span>
    );
    return (
      <div className="header-status">
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
    );
  }
}
