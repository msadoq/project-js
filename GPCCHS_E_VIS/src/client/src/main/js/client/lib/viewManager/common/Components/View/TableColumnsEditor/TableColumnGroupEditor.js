import React from 'react';
import { PropTypes } from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import TableColumnInput from './TableColumnInput';

import styles from './TableColumnGroupEditor.css';

class TableColumnGroupEditor extends React.Component {
  static propTypes = {
    groupKey: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    toggle: PropTypes.func.isRequired,
    reorder: PropTypes.func.isRequired,
  };

  onDragEnd = (result) => {
    const { columns } = this.props;

    if (!result.destination) {
      return;
    }

    const indexOffset = columns[0].index;

    this.props.reorder(result.source.index, result.destination.index + indexOffset);
  };

  render() {
    const { groupKey, columns, toggle } = this.props;

    return (
      <ErrorBoundary>
        <div className={styles.TableColumnGroupEditor}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div>
              <h4>{groupKey}</h4>
              <Droppable droppableId="droppable">
                {provided => (
                  <div
                    ref={provided.innerRef}
                  >
                    {
                      columns.map(item => (
                        <TableColumnInput
                          key={`${groupKey}-${item.title}`}
                          item={item}
                          toggle={toggle}
                        />
                      ))
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </ErrorBoundary>
    );
  }
}

export default TableColumnGroupEditor;
