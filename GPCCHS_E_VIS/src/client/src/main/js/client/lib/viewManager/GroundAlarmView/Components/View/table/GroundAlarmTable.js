import React, { PropTypes } from 'react';
import _ from 'lodash/fp';
import classnames from 'classnames';
import { ALARM_ACKSTATE_REQUIREACK as REQUIRE_ACK } from 'constants';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import TableView from 'windowProcess/common/TableView';

import styles from './GroundAlarmTable.css';

const THEAD_DEFAULT_HEIGHT = 22; // in pixel
const COLS = ['timestamp', 'parameterName', 'parameterType', 'firstOccurence', 'lastOccurence', 'duration', 'rawValue', 'physicalValue', 'satellite', 'ackState'];
const TRANSITION_COLS = ['onboardDate', 'groundDate', 'convertedValue', 'extractedValue', 'rawValue', 'monitoringState'];

const initialState = {
  hoveredAlarm: undefined,
  enableSearch: true,
};

class GroundAlarmTable extends React.Component {
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
    rows: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.any,
      type: PropTypes.string,
    })).isRequired,
    indexedRows: PropTypes.shape({}).isRequired,
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
    if (
      this.props.domain !== nextProps.domain
      || this.props.timeline !== nextProps.timeline
      || this.props.mode !== nextProps.mode
    ) {
      this.cunhoverAlarm();
    }
  }

  onAlarmContextMenu = (e) => {
    e.stopPropagation();
    const n = this.getNbSelectedAlarms();
    const getOids = _.keys;
    const parameterName = _.get([this.state.hoveredAlarm, 'parameterName'], this.props.indexedRows);
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

  getNbSelectedAlarms = () => _.size(this.props.selectedAlarms)

  toggleAlarmSelection = (row) => {
    const alarm = row.mainRow.data;
    const { oid, ackState } = alarm;
    if (ackState === REQUIRE_ACK && !this.props.isPlayingTimebar) {
      this.props.toggleSelection(oid);
    }
  }

  toggleSearch = () => {
    this.setState(_.update('enableSearch', _.negate(_.identity)));
  }

  hoverAlarm = (row) => {
    const { oid } = row.mainRow.data;
    this.setState(_.set('hoveredAlarm', oid));
  }

  unhoverAlarm = () => {
    this.setState(_.set('hoveredAlarm', undefined));
  }

  render() {
    const { selectedAlarms, expandedAlarms } = this.props;
    const style = {
      height: this.props.containerHeight,
      width: this.props.containerWidth,
    };
    return (
      <div
        className={classnames(styles.container)}
        onContextMenu={this.onAlarmContextMenu}
        style={style}
      >
        <TableView
          enableSearch={this.state.enableSearch}
          onClickSearchIcon={this.toggleSearch}
          cols={COLS}
          subCols={TRANSITION_COLS}
          sort={this.props.sort}
          toggleSort={this.props.toggleSort}
          disableSelection={this.props.isPlayingTimebar}
          onMouseEnter={this.hoverAlarm}
          onMouseLeave={this.unhoverAlarm}
          onCollapse={row => this.props.collapse(row.mainRow.data.oid)}
          onUncollapse={row => this.props.uncollapse(row.mainRow.data.oid)}
          onClickRow={this.toggleAlarmSelection}
          getIsSelectable={row => row.mainRow.data.ackState === REQUIRE_ACK}
          getIsSelected={row => Boolean(selectedAlarms[row.mainRow.data.oid])}
          getIsHovered={row => row.mainRow.data.oid === this.state.hoveredAlarm}
          getIsExpanded={row => Boolean(expandedAlarms[row.mainRow.data.oid])}
          rowHeight={this.props.rowHeight}
          onScrollUp={() => this.unhoverAlarm()}
          onScrollDown={() => this.unhoverAlarm()}
          containerHeight={this.props.containerHeight}
          nbDisplayedRows={this.getNbDisplayedElems()}
          rows={this.props.rows}
        />
      </div>
    );
  }
}

export default GroundAlarmTable;
