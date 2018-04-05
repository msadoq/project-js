import React from 'react';
import { FieldArray } from 'redux-form';
import ColsFields from './Fields/ColsFields';

const TableViewColumns = props => (
  <FieldArray
    name={'cols'}
    component={ColsFields}
    {...props}
  />
);

export default TableViewColumns;
