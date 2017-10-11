import React from 'react';

const identity = x => x;

// tool for developments
export default (transformer = identity) => WrappedComponent => (
  props => (
    <WrappedComponent
      {...transformer(props)}
    />
  )
);
