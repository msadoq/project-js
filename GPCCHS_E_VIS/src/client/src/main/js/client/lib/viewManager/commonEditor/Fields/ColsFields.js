import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const { func, shape } = PropTypes;

const ColsFields = (props) => {
  const { fields } = props;
  const cols = fields.getAll();

  return (
    <ol>
      {(cols && cols.length && cols.map((column, ikey) => (
        <li className="draggable" key={'div'.concat(ikey)}>
          <span
            className="handle glyphicon glyphicon-move"
          />
          <Field
            name={`cols[${ikey}].displayed`}
            id={`cols[${ikey}].displayed`}
            component="input"
            type="checkbox"
          />
          {column.title}
        </li>
      )))}
    </ol>
  );
};

ColsFields.propTypes = {
  fields: shape({
    push: func,
    remove: func,
    insert: func,
    getAll: func,
  }).isRequired,
};

export default ColsFields;
