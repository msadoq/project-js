/* eslint-disable react/prefer-stateless-function,no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import shortid from 'shortid';

import styles from './TableColumnGroupEditor.css';

/**
 * Represents a sortable column input, which consist of a checkbox
 * (to determine wether the column is displayed)
 */
const TableColumnInput = ({ item, toggle }) => {
  const { index, title, displayed } = item;
  const checkboxId = `checkbox-${shortid.generate()}`;

  return (
    <Draggable
      key={item.index}
      draggableId={index}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            id={checkboxId}
            type={'checkbox'}
            checked={displayed}
            onClick={() => toggle(index)}
            readOnly
          />
          <label
            className={styles.ColumnLabel}
            htmlFor={checkboxId}
          >
            {title}
          </label>
        </div>
      )}
    </Draggable>
  );
};

TableColumnInput.propTypes = {
  item: PropTypes.shape().isRequired,
  toggle: PropTypes.func.isRequired,
};

const TableColumnGroup =
  ({ groupKey, columns, toggle }) => (
    <div>
      <h4>{groupKey}</h4>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
          >
            {
              columns.map((item, index) => (
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
  );

TableColumnGroup.propTypes = {
  groupKey: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  toggle: PropTypes.func.isRequired,
};


const TableColumnGroupEditor = ({ groupKey, columns, toggle, reorder }) => {
  const _onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const indexOffset = columns[0].index;

    reorder(result.source.index, result.destination.index + indexOffset);
  };

  return (
    <div className={styles.TableColumnGroupEditor}>
      <DragDropContext onDragEnd={_onDragEnd}>
        <TableColumnGroup
          groupKey={groupKey}
          columns={columns}
          toggle={toggle}
        />
      </DragDropContext>
    </div>
  );
};

TableColumnGroupEditor.propTypes = {
  groupKey: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  toggle: PropTypes.func.isRequired,
  reorder: PropTypes.func.isRequired,
};

export default TableColumnGroupEditor;
