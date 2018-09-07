import React from 'react';
import PropTypes from 'prop-types';
import styles from './VirtualizedTableView.css';

const TableHeader =
  ({
     tableHeader,
     tableName,
     rowCount,
     totalRowCount,
   }) => {
    const _getCountStr = () => {
      if (rowCount !== null && totalRowCount !== null) {
        if (!rowCount && !totalRowCount) {
          return 'NO DATA';
        }

        return `${rowCount}/${totalRowCount}`;
      }

      return 'NO DATA';
    };

    return tableHeader ||
      <div className={styles.tableHeader}>{`${tableName} (${_getCountStr()})`}</div>;
  };

TableHeader.propTypes = {
  tableName: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  totalRowCount: PropTypes.number.isRequired,
};

export default TableHeader;
