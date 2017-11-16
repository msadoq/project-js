/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { Label, Glyphicon } from 'react-bootstrap';
import classnames from 'classnames';
import _ from 'lodash/fp';
import handleContextMenu from '../../../../../windowProcess/common/handleContextMenu';
import withMouseWheelEvents from '../../../../../windowProcess/common/hoc/withMouseWheelEvents';
import withBatchedSetState from '../../../../../windowProcess/common/hoc/withBatchedSetState';
import { GMA_ALARM_ACKSTATE_REQUIREACK as REQUIRE_ACK } from '../../../../../constants';

import styles from './GroundAlarmTable.css';

const THEAD_DEFAULT_HEIGHT = 22; // in pixel

const MESSAGE_IS_PLAYING_TIMEBAR = 'You cannot select an alarm when timebar is playing';
const COLS = ['', 'parameterName', 'parameterType', 'firstOccurence', 'lastOccurence', 'duration', 'rawValue', 'physicalValue', 'satellite', 'ackState'];
const TRANSITION_COLS = ['', 'onboardDate', 'groundDate', 'convertedValue', 'extractedValue', 'rawValue', 'monitoringState'];

const CollapseButton = ({ onClick, collapsed }) => (
  <span
    title={collapsed ? 'Expand' : 'Collapse'}
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    style={{ cursor: 'pointer' }}
  >
    <Label><Glyphicon glyph={collapsed ? 'plus' : 'minus'} /></Label>
  </span>
);
CollapseButton.propTypes = {
  onClick: PropTypes.func,
  collapsed: PropTypes.bool,
};
CollapseButton.defaultProps = {
  onClick: _.noop,
  collapsed: false,
};

const Table = ({
  lines, position, displayedRows, rowHeight, selectedAlarms, hoveredAlarm,
  onCollapse, onUncollapse, onClickAlarm, onMouseEnter, onMouseLeave, isPlayingTimebar,
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
                title={isPlayingTimebar ? MESSAGE_IS_PLAYING_TIMEBAR : ''}
                onMouseEnter={() => onMouseEnter(line.alarm)}
                onMouseLeave={() => onMouseLeave(line.alarm)}
                onClick={() => onClickAlarm(line.alarm)}
                key={key}
                className={classnames({
                  [styles.notAllowed]: isPlayingTimebar,
                  [styles.selectable]: line.alarm.ackState === REQUIRE_ACK && !isPlayingTimebar,
                  [styles.hover]: hoveredAlarm === line.alarm.oid,
                  alarmChildren: line.type === 'transition',
                  alarm: line.type === 'alarm',
                  selected: Boolean(selectedAlarms[line.alarm.oid]),
                })}
                style={{ width: '100%', height: `${rowHeight}px` }}
              >
                {
                  columns.map((col, index) => (
                    <td
                      className={classnames({
                        [styles.collapseButton]: index === 0,
                      })}
                      key={col}
                    >
                      {
                        index === 0 && line.type === 'alarm'
                        && (data.collapsed ? (
                          <CollapseButton collapsed onClick={() => onUncollapse(data.oid)} />
                        ) : (
                          <CollapseButton onClick={() => onCollapse(data.oid)} />
                        ))
                      }
                      {data[col]}
                    </td>
                  ))
                }
              </tr>
            );
          }
          return (
            <tr
              title={isPlayingTimebar ? MESSAGE_IS_PLAYING_TIMEBAR : ''}
              onMouseEnter={() => onMouseEnter(line.alarm)}
              onMouseLeave={() => onMouseLeave(line.alarm)}
              onClick={() => onClickAlarm(line.alarm)}
              style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }}
              className={classnames({
                [styles.notAllowed]: isPlayingTimebar,
                [styles.selectable]: line.alarm.ackState === REQUIRE_ACK && !isPlayingTimebar,
                [styles.hover]: hoveredAlarm === line.alarm.oid,
                alarmChildren: true,
                selected: Boolean(selectedAlarms[line.alarm.oid]),
              })}
              key={key}
            >
              {
                TRANSITION_COLS.map((col, index) => (
                  <th
                    className={classnames({
                      [styles.collapseButton]: index === 0,
                    })}
                    key={col}
                  >
                    {col}
                  </th>
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
  onCollapse: PropTypes.func.isRequired,
  onUncollapse: PropTypes.func.isRequired,
  onClickAlarm: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  selectedAlarms: PropTypes.shape({}).isRequired,
  hoveredAlarm: PropTypes.string,
  position: PropTypes.number,
  lines: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({}),
    type: PropTypes.string,
  })).isRequired,
  rowHeight: PropTypes.number.isRequired,
  displayedRows: PropTypes.number.isRequired,
  isPlayingTimebar: PropTypes.bool.isRequired,
};
Table.defaultProps = {
  hoveredAlarm: '',
  position: 0,
};

const initialState = {
  position: 0,
  hoveredAlarm: undefined,
};

class TableView extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    mainMenu: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired,
    toggleSelection: PropTypes.func.isRequired,
    selectedAlarms: PropTypes.shape({}).isRequired,
    mode: PropTypes.number.isRequired,
    domain: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
    lines: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.shape({}),
      type: PropTypes.string,
    })).isRequired,
    indexedLines: PropTypes.shape({}).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    rowHeight: PropTypes.number,
    openAckModal: PropTypes.func.isRequired,
    openInspector: PropTypes.func.isRequired,
    collapse: PropTypes.func.isRequired,
    uncollapse: PropTypes.func.isRequired,
    isPlayingTimebar: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    rowHeight: THEAD_DEFAULT_HEIGHT, // in pixel
  }

  state = initialState

  componentWillReceiveProps(nextProps) {
    if (this.state.position >= this.getLastPosition(nextProps)) {
      this.setState(_.set('position', this.getLastPosition(nextProps)));
    }
    if (
      this.props.domain !== nextProps.domain
      || this.props.timeline !== nextProps.timeline
      || this.props.mode !== nextProps.mode
    ) {
      this.resetState();
    }
  }

  onScrollUp = () => {
    if (this.state.position > 0) {
      this.unhoverAlarm();
      this.setState(_.update('position', _.add(-1)));
    }
  }

  onScrollDown = () => {
    if (this.state.position < this.getLastPosition()) {
      this.unhoverAlarm();
      this.setState(_.update('position', _.add(1)));
    }
  }

  onAlarmContextMenu = (e) => {
    e.stopPropagation();
    const n = this.getNbSelectedAlarms();
    const getOids = _.keys;
    const parameterName = _.get([this.state.hoveredAlarm, 'parameterName'], this.props.indexedLines);
    const openInspectorMenu = parameterName ? [
      {
        label: `Open '${parameterName}' parameter in inspector`,
        click: () => this.props.openInspector(parameterName),
        enabled: Boolean(this.state.hoveredAlarm),
      },
      { type: 'separator' },
    ] : [];
    const menu = [
      {
        label: `Acknowledge ${n} alarm${n === 1 ? '' : 's'}`,
        click: () => {
          this.props.openAckModal(this.props.viewId, getOids(this.props.selectedAlarms));
        },
        enabled: n > 0,
      },
      { type: 'separator' },
      ...openInspectorMenu,
      ...this.props.mainMenu,
    ];
    handleContextMenu(menu);
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

  getNbSelectedAlarms = () => _.size(this.props.selectedAlarms)

  toggleAlarmSelection = (alarm) => {
    const { oid, ackState } = alarm;
    if (ackState === REQUIRE_ACK && !this.props.isPlayingTimebar) {
      this.props.toggleSelection(oid);
    }
  }

  hoverAlarm = ({ oid }) => {
    this.setState(_.set('hoveredAlarm', oid));
  }

  unhoverAlarm = () => {
    this.setState(_.unset('hoveredAlarm'));
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
        className={classnames('AlarmView', styles.container)}
        onContextMenu={this.onAlarmContextMenu}
        style={style}
      >
        <div style={{ top: `calc(${this.getScrollBarPosition()}px + ${THEAD_DEFAULT_HEIGHT}px)` }} className={styles.scrollbar} />
        <Table
          isPlayingTimebar={this.props.isPlayingTimebar}
          onMouseEnter={this.hoverAlarm}
          onMouseLeave={this.unhoverAlarm}
          hoveredAlarm={this.state.hoveredAlarm}
          onCollapse={this.props.collapse}
          onUncollapse={this.props.uncollapse}
          onClickAlarm={this.toggleAlarmSelection}
          selectedAlarms={this.props.selectedAlarms}
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
