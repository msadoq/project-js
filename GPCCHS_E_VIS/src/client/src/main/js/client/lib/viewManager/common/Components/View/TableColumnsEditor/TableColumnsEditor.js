import React from 'react';
import { PropTypes } from 'prop-types';

import TableColumnGroupEditor from './TableColumnGroupEditor';

import styles from './TableColumnsEditor.css';

const TableColumnsEditor =
  ({ groupedColumns, toggle, reorder }) => (
    <div className={styles.TableColumnEditor}>
      {
        Object.keys(groupedColumns).map((groupKey) => {
          const columns = groupedColumns[groupKey];

          return (
            <TableColumnGroupEditor
              key={groupKey}
              groupKey={groupKey}
              columns={columns}
              toggle={toggle}
              reorder={reorder}
            />
          );
        })
      }
    </div>
  );

TableColumnsEditor.propTypes = {
  groupedColumns: PropTypes.shape().isRequired,
  toggle: PropTypes.func.isRequired,
  reorder: PropTypes.func.isRequired,
};

export default TableColumnsEditor;
