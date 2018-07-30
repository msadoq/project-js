import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import classnames from 'classnames';
import { createTableData } from '../../../pus/tooltip';
import { formatDate } from '../../../pus/utils';

const popoverStyle = { height: 70 };
const popoverTrigger = ['hover', 'focus']; // avoid creating a new object in render

const generatePopover = (id, time, mode) => (
  <Popover
    id={id}
    placement="bottom"
    style={popoverStyle}
  >
    {createTableData({
      lastUpdateMode: mode,
      lastUpdateTime: formatDate(time),
    })}
  </Popover>
);

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
    const statusSpan = (
      <span>
        {label}&nbsp;
        <input type="text" className={classnames('mw100', status.toLowerCase())} disabled value={status} />
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
