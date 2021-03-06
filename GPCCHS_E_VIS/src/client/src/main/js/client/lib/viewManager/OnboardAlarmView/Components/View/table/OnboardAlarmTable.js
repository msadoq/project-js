/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash/fp';
import { ALARM_ACKSTATE_REQUIREACK as REQUIRE_ACK } from 'constants';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import TableView from 'windowProcess/common/TableView';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from './OnboardAlarmTable.css';

const THEAD_DEFAULT_HEIGHT = 22; // in pixel
const COLS = [
  {
    name: 'alarmDate',
    key: 'timestamp',
  },
  {
    name: 'alarmType',
    key: 'alarmType',
  },
  {
    name: 'satellite',
    key: 'satellite',
  },
  {
    name: 'telemetryType',
    key: 'telemetryType',
  },
  {
    name: 'RIDId',
    key: 'RIDId',
  },
  {
    name: 'RIDName',
    key: 'RIDName',
  },
  {
    name: 'reportType',
    key: 'reportType',
  },
  {
    name: 'ackState',
    key: 'ackState',
  }];
const PARAMETERS_COLS = [
  {
    name: 'name',
    key: 'name',
  },
  {
    name: 'value',
    key: 'value',
  }];

const initialState = {
  hoveredParameter: {},
};

class OnboardAlarmTable extends React.Component {
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
      data: PropTypes.any,
      type: PropTypes.string,
    })).isRequired,
    enableSearch: PropTypes.bool.isRequired,
    inputToggle: PropTypes.func.isRequired,
    search: PropTypes.shape({}).isRequired,
    inputSearch: PropTypes.func.isRequired,
    inputResetAll: PropTypes.func.isRequired,
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
      this.resetState();
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
      {
        label: 'Reset search filters',
        click: this.props.inputResetAll,
        enabled: !_.isEmpty(this.props.search) && this.props.enableSearch,
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

  hoverParameter = (row) => {
    if (row.type === 'subrow') {
      this.setState(_.set('hoveredParameter', {
        alarmOid: row.mainRow.data.oid,
        parameterIndex: row.subRowIndex,
      }));
    }
  }

  unhoverParameter = () => {
    this.setState(_.set('hoveredParameter', {}));
  }

  toggleAlarmSelection = (row) => {
    const { oid, ackState } = row.mainRow.data;
    if (ackState === REQUIRE_ACK && !this.props.isPlayingTimebar) {
      this.props.toggleSelection(oid);
    }
  }

  resetState = () => {
    this.setState(_.always(initialState));
  }

  render() {
    const { selectedAlarms, expandedAlarms } = this.props;
    const style = {
      height: this.props.containerHeight,
      width: this.props.containerWidth,
    };
    return (
      <ErrorBoundary>
        <div
          className={classnames('TableView', styles.container)}
          onContextMenu={this.onAlarmContextMenu}
          style={style}
        >
          <TableView
            search={this.props.search}
            onSearch={this.props.inputSearch}
            enableSearch={this.props.enableSearch}
            onClickSearchIcon={this.props.inputToggle}
            cols={COLS}
            subCols={PARAMETERS_COLS}
            sort={this.props.sort}
            toggleSort={this.props.toggleSort}
            disableSelection={this.props.isPlayingTimebar}
            onMouseEnter={this.hoverParameter}
            onMouseLeave={this.unhoverParameter}
            onCollapse={row => this.props.collapse(row.mainRow.data.oid)}
            onUncollapse={row => this.props.uncollapse(row.mainRow.data.oid)}
            onClickRow={this.toggleAlarmSelection}
            getIsSelectable={row => row.mainRow.data.ackState === REQUIRE_ACK}
            getIsSelected={row => Boolean(selectedAlarms[row.mainRow.data.oid])}
            getIsHovered={row => (
              this.state.hoveredParameter.alarmOid === row.mainRow.data.oid
              && this.state.hoveredParameter.parameterIndex === row.subRowIndex
            )}
            getIsExpanded={row => Boolean(expandedAlarms[row.mainRow.data.oid])}
            rowHeight={this.props.rowHeight}
            onScrollUp={() => this.unhoverParameter()}
            onScrollDown={() => this.unhoverParameter()}
            containerHeight={this.props.containerHeight}
            nbDisplayedRows={this.getNbDisplayedElems()}
            rows={this.props.rows}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export default OnboardAlarmTable;
