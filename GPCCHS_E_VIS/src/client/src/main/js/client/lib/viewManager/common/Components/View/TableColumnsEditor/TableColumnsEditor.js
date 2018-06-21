/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import TableColumnGroupEditor from './TableColumnGroupEditor';
import styles from './TableColumnsEditor.css';

class TableColumnsEditor extends React.Component {
  static propTypes = {
    groupedColumns: PropTypes.shape().isRequired,
    toggle: PropTypes.func.isRequired,
    reorder: PropTypes.func.isRequired,
  };

  render() {
    const { groupedColumns, toggle, reorder } = this.props;

    return (
      <ErrorBoundary>
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
      </ErrorBoundary>
    );
  }
}

export default TableColumnsEditor;
