import React from 'react';

export default ({msg, level, meta}) => {
  return <li>{level}: {msg} {JSON.stringify(meta)}</li>;
};
