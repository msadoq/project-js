import React, { PropTypes } from 'react';
import Dimensions from '../../../../windowProcess/common/Dimensions';

import styles from './HistoryView.css';

console.warn(styles);

const Table = ({ lines, cols, labels }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {
            cols.map(col => (
              <th key={col} className={styles.th}>
                {labels[col] || col}
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

const HistoryView = (props) => {
  console.warn(props);
  const style = {
    height: props.containerHeight,
    width: props.containerWidth,
  };
  return (
    <div className={styles.container} style={style}>
      <Table {...props.data} />
    </div>
  );
};

HistoryView.propTypes = {
  data: PropTypes.shape({}).isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
};

export default Dimensions({ elementResize: true })(HistoryView);
