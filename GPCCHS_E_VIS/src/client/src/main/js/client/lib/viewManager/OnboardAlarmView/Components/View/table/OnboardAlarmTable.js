/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { Label, Glyphicon } from 'react-bootstrap';
import classnames from 'classnames';
import _ from 'lodash/fp';
import handleContextMenu from '../../../../../windowProcess/common/handleContextMenu';
import withMouseWheelEvents from '../../../../../windowProcess/common/hoc/withMouseWheelEvents';
import withBatchedSetState from '../../../../../windowProcess/common/hoc/withBatchedSetState';
import { ALARM_ACKSTATE_REQUIREACK as REQUIRE_ACK } from '../../../../../constants';

import styles from './OnboardAlarmTable.css';

const THEAD_DEFAULT_HEIGHT = 22; // in pixel

const MESSAGE_IS_PLAYING_TIMEBAR = 'You cannot select an alarm when timebar is playing';
const COLS = ['', 'timestamp', 'onBoardDate', 'alarmType', 'satellite', 'telemetryType', 'RIDId', 'RIDName', 'reportType', 'ackState'];
const PARAMETERS_COLS = ['', 'name', 'value'];

const CollapseButton = ({ onClick, collapsed }) => (
  <Label
    title={collapsed ? 'Expand' : 'Collapse'}
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    className={classnames({
      [styles.collapseButton]: true,
    })}
  >
    <Glyphicon glyph={collapsed ? 'plus' : 'minus'} />
  </Label>
);
CollapseButton.propTypes = {
  onClick: PropTypes.func,
  collapsed: PropTypes.bool,
};
CollapseButton.defaultProps = {
  onClick: _.noop,
  collapsed: false,
};

const Arrow = ({ mode }) => (
  <Label
    className={classnames({
      [styles.sortArrow]: true,
    })}
  >
    <Glyphicon glyph={mode === 'ASC' ? 'chevron-up' : 'chevron-down'} />
  </Label>
);
Arrow.propTypes = {
  mode: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
};

const Table = ({
  rows, position, displayedRows, rowHeight,
  selectedAlarms, expandedAlarms, hoveredParameter, isPlayingTimebar, sort,
  onCollapse, onUncollapse, onClickAlarm, onMouseEnter, onMouseLeave, toggleSort,
}) => (
  <table>
    <thead>
      <tr
        style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }}
      >
        {
          COLS.map(col => (
            <th
              onClick={() => (
                col !== '' && toggleSort(col)
              )}
              className={classnames({
                [styles.header]: col !== '',
              })}
              key={col}
            >
              { sort.column === col && <Arrow mode={sort.mode} /> }
              {col}
            </th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {
        _.slice(position, displayedRows + position)(rows).map((line, i) => {
          const data = line.data;
          const key = i; // TODO replace 'i' by a better key
          const columns = line.type === 'alarm' ? COLS : PARAMETERS_COLS;
          if (line.type === 'alarm' || line.type === 'parameter') {
            const isHovered = hoveredParameter.alarmOid === line.alarm.oid
                           && hoveredParameter.parameterIndex === line.parameterIndex;
            return (
              <tr
                title={isPlayingTimebar ? MESSAGE_IS_PLAYING_TIMEBAR : ''}
                onClick={() => onClickAlarm(line.alarm)}
                onMouseEnter={() => onMouseEnter(line)}
                onMouseLeave={() => onMouseLeave(line)}
                key={key}
                className={classnames({
                  [styles.notAllowed]: isPlayingTimebar,
                  [styles.selectable]: line.alarm.ackState === REQUIRE_ACK && !isPlayingTimebar,
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
                      className={classnames({
                        [styles.collapseColumn]: index === 0,
                      })}
                      key={col}
                    >
                      {
                        index === 0 && line.type === 'alarm'
                        && (expandedAlarms[line.alarm.oid] ? (
                          <CollapseButton onClick={() => onCollapse(data.oid)} />
                        ) : (
                          <CollapseButton collapsed onClick={() => onUncollapse(data.oid)} />
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
              onClick={() => onClickAlarm(line.alarm)}
              onMouseEnter={() => onMouseEnter(line)}
              onMouseLeave={() => onMouseLeave(line)}
              style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }}
              className={classnames({
                [styles.notAllowed]: isPlayingTimebar,
                [styles.selectable]: line.alarm.ackState === REQUIRE_ACK && !isPlayingTimebar,
                alarmChildren: true,
                selected: Boolean(selectedAlarms[line.alarm.oid]),
              })}
              key={key}
            >
              {
                line.type === 'parameter_header_title' ? (
                  PARAMETERS_COLS.map((col, index) => (
                    <th
                      className={classnames({
                        [styles.collapseColumn]: index === 0,
                      })}
                      key={col}
                    >
                      {col}
                    </th>
                  ))
                ) : [
                  <th
                    key="1"
                    className={classnames({
                      [styles.collapseColumn]: true,
                    })}
                  />,
                  <th
                    key="2"
                    style={{ fontStyle: 'italic' }}
                    colSpan={PARAMETERS_COLS.length - 1}
                  >
                    PARAMETERS
                  </th>,
                ]
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
  toggleSort: PropTypes.func.isRequired,
  selectedAlarms: PropTypes.shape({}).isRequired,
  expandedAlarms: PropTypes.shape({}).isRequired,
  position: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({}),
    type: PropTypes.string,
  })).isRequired,
  sort: PropTypes.shape({
    column: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
  }).isRequired,
  rowHeight: PropTypes.number.isRequired,
  displayedRows: PropTypes.number.isRequired,
  isPlayingTimebar: PropTypes.bool.isRequired,
};
Table.defaultProps = {
  position: 0,
  hoveredParameter: {},
};

const initialState = {
  position: 0,
  hoveredParameter: undefined,
};

class TableView extends React.Component {
  static propTypes = {
    mainMenu: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired
    ).isRequired,
    toggleSelection: PropTypes.func.isRequired,
    toggleSort: PropTypes.func.isRequired,
    selectedAlarms: PropTypes.shape({}).isRequired,
    expandedAlarms: PropTypes.shape({}).isRequired,
    sort: PropTypes.shape({
      column: PropTypes.string.isRequired,
      mode: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
    }).isRequired,
    mode: PropTypes.number.isRequired,
    domain: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
    indexedRows: PropTypes.shape({}).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({
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
      this.unhoverParameter();
      this.setState(_.update('position', _.add(-1)));
    }
  }

  onScrollDown = () => {
    if (this.state.position < this.getLastPosition()) {
      this.unhoverParameter();
      this.setState(_.update('position', _.add(1)));
    }
  }

  onAlarmContextMenu = (e) => {
    e.stopPropagation();
    const n = this.getNbSelectedAlarms();
    const getOids = _.keys;
    const { hoveredParameter = {} } = this.state;
    const path = [hoveredParameter.alarmOid, 'parameters', hoveredParameter.parameterIndex, 'name'];
    const parameterName = _.get(path, this.props.indexedRows);
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
          this.props.openAckModal(getOids(this.props.selectedAlarms));
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
    Math.max(0, (this.props.rows.length - this.getNbDisplayedElems(props)) + 1)
  )

  getScrollBarPosition = () => (
    Math.ceil((this.state.position / this.getLastPosition()) * this.getScrollAreaHeight())
  )

  getNbSelectedAlarms = () => _.size(this.props.selectedAlarms)

  hoverParameter = (line) => {
    if (line.type === 'parameter') {
      this.setState(_.set('hoveredParameter', {
        alarmOid: line.alarm.oid,
        parameterIndex: line.parameterIndex,
      }));
    }
  }

  unhoverParameter = () => {
    this.setState(_.unset('hoveredParameter'));
  }

  toggleAlarmSelection = (alarm) => {
    const { oid, ackState } = alarm;
    if (ackState === REQUIRE_ACK && !this.props.isPlayingTimebar) {
      this.props.toggleSelection(oid);
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
          sort={this.props.sort}
          toggleSort={this.props.toggleSort}
          isPlayingTimebar={this.props.isPlayingTimebar}
          onMouseEnter={this.hoverParameter}
          onMouseLeave={this.unhoverParameter}
          hoveredParameter={this.state.hoveredParameter}
          onCollapse={this.props.collapse}
          onUncollapse={this.props.uncollapse}
          onClickAlarm={this.toggleAlarmSelection}
          selectedAlarms={this.props.selectedAlarms}
          expandedAlarms={this.props.expandedAlarms}
          rowHeight={this.props.rowHeight}
          position={this.state.position}
          displayedRows={this.getNbDisplayedElems()}
          rows={this.props.rows}
        />
      </div>
    );
  }
}

export default _.compose(
  withBatchedSetState({ delay: 60 }), // throttled every 60ms
  withMouseWheelEvents()
)(TableView);
