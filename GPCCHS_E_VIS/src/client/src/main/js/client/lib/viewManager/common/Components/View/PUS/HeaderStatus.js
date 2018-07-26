import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const popoverStyle = {
  height: 80,
};

/**
 * @param id
 * @param title
 * @param time
 * @param mode
 * @returns {*}
 */

const generatePopover = ({ id, title, time, mode }) => (
  <Popover
    id={id}
    placement="bottom"
    title={title}
    style={popoverStyle}
  >
    <div>Last update Time: {time}</div>
    <div>Last update Mode: {mode}</div>
  </Popover>
);

generatePopover.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};

const popoverTrigger = ['hover', 'focus']; // avoid creating a new object in render

export default class HeaderStatus extends Component {
  static propTypes = {
    // From PUSViewContainer mapStateToProps
    status: PropTypes.string,
    lastUpdateMode: PropTypes.string,
    lastUpdateTime: PropTypes.string,
    label: PropTypes.string,
    pusTag: PropTypes.string,
  };

  static defaultProps = {
    status: null,
    lastUpdateMode: null,
    lastUpdateTime: null,
    label: null,
    pusTag: null,
  };

  render() {
    const {
      status,
      lastUpdateMode,
      lastUpdateTime,
      label,
      pusTag,
    } = this.props;
    const statusStyle = 'mw100 '.concat(
      ['DISABLED', 'ENABLED'].includes(status) ?
      status.toLowerCase() : ''
    );
    const statusSpan = (
      <span>
        {label}&nbsp;
        <input type="text" className={statusStyle} disabled value={status} />
      </span>
    );
    return (
      <div className={`info col-sm-4 pus${pusTag}_ss`}>
        <OverlayTrigger
          trigger={popoverTrigger}
          placement="right"
          overlay={generatePopover({
            id: 'popover-service-apid',
            title: 'Service Status',
            time: lastUpdateTime,
            mode: lastUpdateMode,
          })}
        >
          {statusSpan}
        </OverlayTrigger>
        <span className="spacing" />
      </div>
    );
  }
}
