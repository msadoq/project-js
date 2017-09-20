import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _ from 'lodash/fp';
import withMouseWheelEvents from '../../../../windowProcess/common/hoc/withMouseWheelEvents';
import withDimensions from '../../../../windowProcess/common/hoc/withDimensions';
import withBatchedSetState from '../../../../windowProcess/common/hoc/withBatchedSetState';

import styles from './HistoryView.css';

const THEAD_DEFAULT_HEIGHT = 33; // in pixel

const Table = ({ lines, cols, position, rowHeight, current }) => (
  <table>
    <thead>
      <tr
        className={classnames({ [styles.prevCurrent]: current === position })}
      >
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
        _.drop(position)(lines).map((line, i) => {
          const lineId = position + i;
          const isCurrent = current === lineId;
          const isPrevCurrent = current - 1 === lineId;
          return (
            <tr
              className={classnames({
                [styles.current]: isCurrent,
                [styles.prevCurrent]: isPrevCurrent,
              })}
              key={line.name}
            >
              {
                cols.map(col => (
                  <td
                    style={{ height: `${rowHeight}px` }}
                    key={col}
                  >
                    {line[col]}
                  </td>
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
  current: PropTypes.number.isRequired,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  lines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rowHeight: PropTypes.number.isRequired,
};
Table.defaultProps = {
  position: 0,
};

class HistoryView extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      current: PropTypes.number.isRequired,
      cols: PropTypes.arrayOf(PropTypes.string).isRequired,
      lines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    rowHeight: PropTypes.number,
  }

  static defaultProps = {
    rowHeight: THEAD_DEFAULT_HEIGHT, // in pixel
  }

  state = { position: 0 }

  onScrollUp = () => {
    if (this.batchedState.position > 0) {
      this.setBatchedState(_.update('position', _.add(-1)));
    }
  }

  onScrollDown = () => {
    if (this.batchedState.position <= this.getLastPosition()) {
      this.setBatchedState(_.update('position', _.add(1)));
    }
  }

  getLastPosition = () => (
    this.props.data.lines.length - Math.floor(this.props.containerHeight / this.props.rowHeight)
  )

  render() {
    const style = {
      height: this.props.containerHeight,
      width: this.props.containerWidth,
    };
    return (
      <div
        ref={(ref) => { this.historyViewRef = ref; }}
        className={styles.container}
        style={style}
      >
        <Table
          rowHeight={this.props.rowHeight}
          position={this.state.position}
          {...this.props.data}
        />
      </div>
    );
  }
}

export default _.compose(
  withDimensions({ elementResize: true }),
  withBatchedSetState({ delay: 100 }),
  withMouseWheelEvents()
)(HistoryView);
