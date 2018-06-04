/* eslint-disable no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import shortid from 'shortid';

import styles from './TableColumnInput.css';

class TableColumnInput extends React.Component {
  static propTypes = {
    item: PropTypes.shape().isRequired,
    toggle: PropTypes.func.isRequired,
  };

  render() {
    const { item, toggle } = this.props;
    const { index, title, displayed } = item;
    const checkboxId = `checkbox-${shortid.generate()}`;

    return (
      <Draggable
        draggableId={index}
        index={index}
      >
        {provided => (
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
  }
}

export default TableColumnInput;
