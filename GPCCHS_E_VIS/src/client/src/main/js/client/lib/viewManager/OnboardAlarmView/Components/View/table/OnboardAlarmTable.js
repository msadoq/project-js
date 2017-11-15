/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { Label, Glyphicon } from 'react-bootstrap';
import classnames from 'classnames';
import _ from 'lodash/fp';
import handleContextMenu from '../../../../../windowProcess/common/handleContextMenu';
import withMouseWheelEvents from '../../../../../windowProcess/common/hoc/withMouseWheelEvents';
import withBatchedSetState from '../../../../../windowProcess/common/hoc/withBatchedSetState';
import { OBA_ALARM_ACKSTATE_REQUIREACK as REQUIRE_ACK } from '../../../../../constants';

import styles from './OnboardAlarmTable.css';

const THEAD_DEFAULT_HEIGHT = 22; // in pixel

const COLS = ['onBoardDate', 'alarmType', 'satellite', 'telemetryType', 'RIDId', 'RIDName', 'reportType', 'ackState'];
const PARAMETERS_COLS = ['name', 'value'];

const CollapseButton = ({ onClick, collapsed }) => (
  <span
    title={collapsed ? 'Uncollapse' : 'Collapse'}
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
  lines, position, displayedRows, rowHeight, selectedAlarms, hoveredParameter,
  onCollapse, onUncollapse, onClickAlarm, onMouseEnter, onMouseLeave,
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
          const columns = line.type === 'alarm' ? COLS : PARAMETERS_COLS;
          if (line.type === 'alarm' || line.type === 'parameter') {
            const isHovered = hoveredParameter.alarmOid === line.alarm.oid
                           && hoveredParameter.parameterIndex === line.parameterIndex;
            return (
              <tr
                onClick={() => onClickAlarm(line.alarm)}
                onMouseEnter={() => onMouseEnter(line)}
                onMouseLeave={() => onMouseLeave(line)}
                key={key}
                className={classnames({
                  [styles.selectable]: line.alarm.ackState === REQUIRE_ACK,
                  [styles.hover]: isHovered,
                  alarmChildren: line.type === 'parameter',
                  alarm: line.type === 'alarm',
                  selected: Boolean(selectedAlarms[line.alarm.oid]),
                })}
                style={{ width: '100%', height: `${rowHeight}px` }}
              >
                {
                  columns.map((col, index) => (
                    <td
                      style={{ }}
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
              onClick={() => onClickAlarm(line.alarm)}
              onMouseEnter={() => onMouseEnter(line)}
              onMouseLeave={() => onMouseLeave(line)}
              style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }}
              className={classnames({
                [styles.selectable]: line.alarm.ackState === REQUIRE_ACK,
                alarmChildren: true,
                selected: Boolean(selectedAlarms[line.alarm.oid]),
              })}
              key={key}
            >
              {
                PARAMETERS_COLS.map(col => (
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
  hoveredParameter: PropTypes.shape({
    alarmOid: PropTypes.string,
    parametedIndex: PropTypes.number,
  }),
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onUncollapse: PropTypes.func.isRequired,
  onClickAlarm: PropTypes.func.isRequired,
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
  hoveredParameter: {},
};

const initialState = {
  position: 0,
  selectedAlarms: {},
  hoveredParameter: undefined,
};

class TableView extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    mainMenu: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired,
    mode: PropTypes.number.isRequired,
    domain: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
    indexedLines: PropTypes.shape({}).isRequired,
    lines: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.shape({}),
      type: PropTypes.string,
    })).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    rowHeight: PropTypes.number,
    openAckModal: PropTypes.func.isRequired,
    openInspector: PropTypes.func.isRequired,
    collapse: PropTypes.func.isRequired,
    uncollapse: PropTypes.func.isRequired,
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
      this.setState(_.update('position', _.add(-1)));
    }
  }

  onScrollDown = () => {
    if (this.state.position < this.getLastPosition()) {
      this.setState(_.update('position', _.add(1)));
    }
  }

  onAlarmContextMenu = (e) => {
    e.stopPropagation();
    const n = this.getNbSelectedAlarms();
    const getTimestamps = _.keys;
    const { hoveredParameter = {} } = this.state;
    const path = [hoveredParameter.alarmOid, 'parameters', hoveredParameter.parameterIndex, 'name'];
    const parameterName = _.get(path, this.props.indexedLines);
    const openInspectorMenu = parameterName ? [
      {
        label: `Open '${parameterName}' parameter in inspector`,
        click: () => this.props.openInspector(parameterName),
        enabled: Boolean(parameterName),
      },
      { type: 'separator' },
    ] : [];
    const menu = [
      {
        label: `Acknowledge ${n} alarm${n === 1 ? '' : 's'}`,
        click: () => {
          this.props.openAckModal(this.props.viewId, getTimestamps(this.state.selectedAlarms));
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

  getNbSelectedAlarms = () => _.size(this.state.selectedAlarms)

  hoverParameter = (line) => {
    if (line.type === 'parameter') {
      this.setState(_.set('hoveredParameter', {
        alarmOid: line.alarm.oid,
        parameterIndex: line.parameterIndex,
      }));
    }
  }

  unhoverParameter = (line) => {
    if (line.type === 'parameter') {
      this.setState(_.unset('hoveredParameter'));
    }
  }

  toggleAlarmSelection = (alarm) => {
    const { oid, ackState } = alarm;
    if (ackState === REQUIRE_ACK) {
      const selectedAlarmsPath = ['selectedAlarms', oid];
      if (this.state.selectedAlarms[oid]) {
        this.setState(_.unset(selectedAlarmsPath));
      } else {
        this.setState(_.set(selectedAlarmsPath, alarm));
      }
    }
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
          hoveredParameter={this.state.hoveredParameter}
          onMouseEnter={this.hoverParameter}
          onMouseLeave={this.unhoverParameter}
          onCollapse={this.props.collapse}
          onUncollapse={this.props.uncollapse}
          onClickAlarm={this.toggleAlarmSelection}
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
