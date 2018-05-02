/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Field } from 'redux-form';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { fieldArrayPropsType } from 'viewManager/common/Components/types';
import styles from './ColsFields.css';

const { func } = PropTypes;

export default class ColsFields extends Component {
  static propTypes = {
    // Own props
    fields: fieldArrayPropsType.isRequired,
    onOrderChange: func.isRequired,
  };

  render() {
    const { fields, onOrderChange } = this.props;
    const cols = fields.getAll();

    return (
      cols && cols.length ?
        <SortableList
          items={cols}
          onSortEnd={({ oldIndex, newIndex }) =>
            onSortEnd(oldIndex, newIndex, fields, onOrderChange)}
        />
      :
        null
    );
  }
}

/**
 * @param oldIndex
 * @param newIndex
 * @param fields
 * @param onOrderChange
 */
export const onSortEnd = (oldIndex, newIndex, fields, onOrderChange) => {
  const cols = fields.getAll();
  const reorderedCols = arrayMove(cols, oldIndex, newIndex).map((column, index) => ({
    ...column,
    position: index,
  }));
  fields.move(oldIndex, newIndex);
  onOrderChange({ cols: reorderedCols });
};

export const SortableItem = SortableElement(({ value }) =>
  <li
    draggable
    className="list-group-item"
  >
    <span
      className="handle glyphicon glyphicon-move"
    />
    <Field
      name={`cols[${value.position}].displayed`}
      id={`cols[${value.position}].displayed`}
      component="input"
      type="checkbox"
    />
    <span className="title">{value.title}</span>
  </li>
);

export const SortableList = SortableContainer(({ items }) =>
  <ol
    className={classnames('list-group', 'ol', styles.ol)}
  >
    {items.map((value, index) => (
      <SortableItem key={`item-${index}`} index={index} value={value} />
    ))}
  </ol>
);

