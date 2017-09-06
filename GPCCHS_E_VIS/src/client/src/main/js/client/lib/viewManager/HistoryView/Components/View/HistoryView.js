import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _ from 'lodash/fp';
import Dimensions from '../../../../windowProcess/common/Dimensions';

import styles from './HistoryView.css';

const THEAD_DEFAULT_HEIGHT = 33; // in pixel
const WHEEL_DEFAULT_DELTA_Y = 120;

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

  componentDidMount() {
    if (this.historyViewRef) {
      this.historyViewRef.addEventListener('mousewheel', this.onWheel, false);
    }
  }

  componentWillUnmount() {
    this.historyViewRef.removeEventListener('mousewheel', this.onWheel, false);
  }

  onWheel = (e) => {
    e.preventDefault();
    if (e.wheelDeltaY > 0) {
      _.times(() => this.onScrollUp(), Math.abs(e.wheelDeltaY / WHEEL_DEFAULT_DELTA_Y));
    } else if (e.wheelDeltaY < 0) {
      _.times(() => this.onScrollDown(), Math.abs(e.wheelDeltaY / WHEEL_DEFAULT_DELTA_Y));
    }
  }

  onScrollUp = () => {
    if (this.state.position > 0) {
      this.setState({ position: this.state.position - 1 });
    }
  }

  onScrollDown = () => {
    if (this.state.position <= this.getLastPosition()) {
      this.setState({ position: this.state.position + 1 });
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
  Dimensions({ elementResize: true })
)(HistoryView);
