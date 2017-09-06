import React, { PropTypes } from 'react';
import Dimensions from '../../../../windowProcess/common/Dimensions';

import styles from './HistoryView.css';

const THEAD_DEFAULT_HEIGHT = 33; // in pixel
const WHEEL_DEFAULT_DELTA_Y = 120;

const Table = ({ lines, cols, position, rowHeight }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {
            cols.map(col => (
              <th style={{ height: `${THEAD_DEFAULT_HEIGHT}px` }} key={col} className={styles.th}>
                {col}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {
          _.drop(position)(lines).map(line => (
            <tr key={line.name} className={styles.tr}>
              {
                cols.map(col => (
                  <td style={{ height: `${rowHeight}px` }} key={col} className={styles.td}>
                    {line[col]}
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

class HistoryView extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
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
      this.onScrollUp();
    } else if (e.wheelDeltaY < 0) {
      this.onScrollDown();
    }
  }

  onScrollUp = () => {
    if (this.state.position > 0) {
      this.setState({ position: this.state.position - 1 });
    }
  }

  onScrollDown = () => {
    this.setState({ position: this.state.position + 1 });
  }

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

export default Dimensions({ elementResize: true })(HistoryView);
