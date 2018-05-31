import React from 'react';
import { PropTypes } from 'prop-types';

import TableColumnGroupEditor from './TableColumnGroupEditor';

import styles from './TableColumnsEditor.css';

class TableColumnsEditor extends React.Component {
  static propTypes = {
    groupedColumns: PropTypes.shape().isRequired,
    toggle: PropTypes.func.isRequired,
    reorder: PropTypes.func.isRequired,
  };

  static defaultProps = {
    withGroups: false,
  };

  render() {
    const { groupedColumns, toggle, reorder } = this.props;

    return (
      <div className={styles.TableColumnEditor}>
        {
          Object.keys(groupedColumns).map((groupKey) => {
            const columns = groupedColumns[groupKey];

            return (
              <TableColumnGroupEditor
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
  }
}

export default TableColumnsEditor;
