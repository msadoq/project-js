import React from 'react';
import { FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import ColsFields from './Fields/ColsFields';

const TableViewColumns = props => (
  <FieldArray
    name={'cols'}
    component={ColsFields}
    onOrderChange={props.onOrderChange}
  />
);

TableViewColumns.propTypes = {
  onOrderChange: PropTypes.func.isRequired,
};

export default TableViewColumns;
