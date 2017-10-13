import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _ from 'lodash/fp';
import withMouseWheelEvents from '../../../../../windowProcess/common/hoc/withMouseWheelEvents';
import withDimensions from '../../../../../windowProcess/common/hoc/withDimensions';
import withBatchedSetState from '../../../../../windowProcess/common/hoc/withBatchedSetState';

import styles from './GroundAlarmTable.css';

const THEAD_DEFAULT_HEIGHT = 33; // in pixel

const Table = ({
  lines, cols, transitionsCols, position, displayedRows, rowHeight,
}) => (
  <table>
    <thead>
      <tr>
        {
          cols.map(col => (
            <th style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }} key={col}>
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
          const columns = line.type === 'alarm' ? cols : transitionsCols;
          if (line.type === 'alarm' || line.type === 'transition') {
            return (
              <tr
                key={key}
                className={line.type === 'transition' ? 'transition' : 'alarm'}
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
            <tr style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }} className="transition" key={key}>
              {
                transitionsCols.map(col => (
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
  position: PropTypes.number,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  lines: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
  })).isRequired,
  transitionsCols: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowHeight: PropTypes.number.isRequired,
  displayedRows: PropTypes.number.isRequired,
};
Table.defaultProps = {
  position: 0,
};

class TableView extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      data: PropTypes.shape({}).isRequired,
      cols: PropTypes.arrayOf(PropTypes.string).isRequired,
      transitionsCols: PropTypes.arrayOf(PropTypes.string).isRequired,
      lines: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    rowHeight: PropTypes.number,
  }

  static defaultProps = {
    rowHeight: THEAD_DEFAULT_HEIGHT, // in pixel
  }

  state = { position: 0 }

  componentWillReceiveProps(nextProps) {
    if (this.state.position >= this.getLastPosition(nextProps)) {
      this.setState(_.set('position', this.getLastPosition(nextProps)));
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

  getLastPosition = (props = this.props) => (
    Math.max(0, (this.props.data.lines.length - this.getNbDisplayedElems(props)) + 1)
  )

  getNbDisplayedElems = (props = this.props) => (
    Math.floor(props.containerHeight / props.rowHeight) - 1
  )

  getScrollAreaHeight = () => this.props.containerHeight - (this.props.rowHeight * 2)

  getScrollBarPosition = () => (
    Math.ceil((this.state.position / this.getLastPosition()) * this.getScrollAreaHeight())
  )

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
          transitionsCols={this.props.data.transitionsCols}
          scrollBarPosition={this.getScrollBarPosition()}
          rowHeight={this.props.rowHeight}
          position={this.state.position}
          displayedRows={this.getNbDisplayedElems()}
          {...this.props.data}
        />
      </div>
    );
  }
}

export default _.compose(
  withDimensions({ elementResize: true }),
  withBatchedSetState({ delay: 60 }), // throttled every 60ms
  withMouseWheelEvents()
)(TableView);
