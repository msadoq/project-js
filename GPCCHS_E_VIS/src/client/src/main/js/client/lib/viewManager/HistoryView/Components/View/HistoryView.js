import React, { PropTypes } from 'react';
import Dimensions from '../../../../windowProcess/common/Dimensions';

import styles from './HistoryView.css';

const Table = ({ lines, cols }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {
            cols.map(col => (
              <th key={col} className={styles.th}>
                {col}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {
          lines.map(line => (
            <tr key={line.name} className={styles.tr}>
              {
                cols.map(col => (
                  <td key={col} className={styles.td}>
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
  }

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
    console.warn('up');
  }

  onScrollDown = () => {
    console.warn('down');
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
        <Table {...this.props.data} />
      </div>
    );
  }
}

export default Dimensions({ elementResize: true })(HistoryView);
