/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _ from 'lodash/fp';
import handleContextMenu from '../../../../../windowProcess/common/handleContextMenu';
import withMouseWheelEvents from '../../../../../windowProcess/common/hoc/withMouseWheelEvents';
import withBatchedSetState from '../../../../../windowProcess/common/hoc/withBatchedSetState';
import * as constants from '../../../../../constants';

import styles from './GroundAlarmTable.css';

const THEAD_DEFAULT_HEIGHT = 22; // in pixel

const COLS = ['parameterName', 'parameterType', 'firstOccurence', 'lastOccurence', 'duration', 'rawValue', 'physicalValue', 'satellite', 'ackState'];
const TRANSITION_COLS = ['onboardDate', 'groundDate', 'convertedValue', 'extractedValue', 'rawValue', 'monitoringState'];

const Table = ({
  lines, position, displayedRows, rowHeight, onClickAlarm, onContextMenu, selectedAlarms,
}) => (
  <table>
    <thead>
      <tr style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }}>
        {
          COLS.map(col => (
            <th key={col}>
              {col}
            </th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {
        _.slice(position, displayedRows + position)(lines).map((line, i) => {
          const data = line.data;
          const key = i; // TODO replace 'i' by a better key
          const columns = line.type === 'alarm' ? COLS : TRANSITION_COLS;
          if (line.type === 'alarm' || line.type === 'transition') {
            return (
              <tr
                onClick={() => onClickAlarm(line.alarm.timestamp)}
                onContextMenu={e => onContextMenu(e, line.alarm)}
                key={key}
                className={classnames({
                  transition: line.type === 'transition',
                  alarm: line.type === 'alarm',
                  selected: selectedAlarms[line.alarm.timestamp],
                })}
                style={{ width: '100%', height: `${rowHeight}px` }}
              >
                {
                  columns.map(col => (
                    <td
                      style={{ }}
                      key={col}
                    >
                      {data[col]}
                    </td>
                  ))
                }
              </tr>
            );
          }
          return (
            <tr
              onClick={() => onClickAlarm(line.alarm.timestamp)}
              onContextMenu={e => onContextMenu(e, line.alarm)}
              style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }}
              className={classnames({
                transition: true,
                selected: selectedAlarms[line.alarm.timestamp],
              })}
              key={key}
            >
              {
                TRANSITION_COLS.map(col => (
                  <th key={col}>{col}</th>
                ))
              }
            </tr>
          );
        })
      }
    </tbody>
  </table>
);

Table.propTypes = {
  onClickAlarm: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  selectedAlarms: PropTypes.shape({}).isRequired,
  position: PropTypes.number,
  lines: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({}),
    type: PropTypes.string,
  })).isRequired,
  rowHeight: PropTypes.number.isRequired,
  displayedRows: PropTypes.number.isRequired,
};
Table.defaultProps = {
  position: 0,
};

const initialState = {
  position: 0,
  selectedAlarms: {},
};

class TableView extends React.Component {
  static propTypes = {
    mainMenu: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired,
    domain: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
    lines: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.shape({}),
      type: PropTypes.string,
    })).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    rowHeight: PropTypes.number,
    openAckModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    rowHeight: THEAD_DEFAULT_HEIGHT, // in pixel
  }

  state = initialState

  componentWillReceiveProps(nextProps) {
    if (this.state.position >= this.getLastPosition(nextProps)) {
      this.setState(_.set('position', this.getLastPosition(nextProps)));
    }
    if (this.props.domain !== nextProps.domain || this.props.timeline !== nextProps.timeline) {
      this.resetState();
    }
  }

  onScrollUp = () => {
    if (this.state.position > 0) {
      this.setState(_.update('position', _.add(-1)));
    }
  }

  onScrollDown = () => {
    if (this.state.position < this.getLastPosition()) {
      this.setState(_.update('position', _.add(1)));
    }
  }

  onAlarmContextMenu = (e, alarm) => {
    const enabled = alarm.ackState === constants.ALARM_ACKSTATE_REQUIREACK;
    const menu = [
      { label: 'Acknowledge', click: () => this.props.openAckModal(alarm), enabled },
      { type: 'separator' },
      ...this.props.mainMenu,
    ];
    e.stopPropagation();
    this.toggleAlarmSelection(alarm.timestamp);
    handleContextMenu(menu, () => {
      this.toggleAlarmSelection(alarm.timestamp);
    });
  }


  getScrollAreaHeight = () => this.props.containerHeight - (this.props.rowHeight * 2)

  getNbDisplayedElems = (props = this.props) => (
    Math.floor(props.containerHeight / props.rowHeight) - 1
  )

  getLastPosition = (props = this.props) => (
    Math.max(0, (this.props.lines.length - this.getNbDisplayedElems(props)) + 1)
  )

  getScrollBarPosition = () => (
    Math.ceil((this.state.position / this.getLastPosition()) * this.getScrollAreaHeight())
  )

  toggleAlarmSelection = (timestamp) => {
    this.setState(_.update(['selectedAlarms', timestamp], _.negate(_.identity)));
  }

  resetState = () => {
    this.setState(_.always(initialState));
  }

  render() {
    const style = {
      height: this.props.containerHeight,
      width: this.props.containerWidth,
    };
    return (
      <div
        className={classnames('GroundAlarmView', styles.container)}
        style={style}
      >
        <div style={{ top: `calc(${this.getScrollBarPosition()}px + ${THEAD_DEFAULT_HEIGHT}px)` }} className={styles.scrollbar} />
        <Table
          onClickAlarm={_.noop}
          onContextMenu={this.onAlarmContextMenu}
          selectedAlarms={this.state.selectedAlarms}
          rowHeight={this.props.rowHeight}
          position={this.state.position}
          displayedRows={this.getNbDisplayedElems()}
          lines={this.props.lines}
        />
      </div>
    );
  }
}

export default _.compose(
  withBatchedSetState({ delay: 60 }), // throttled every 60ms
  withMouseWheelEvents()
)(TableView);
