import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Glyphicon } from 'react-bootstrap';

import styles from './SortArrow.css';


const SortArrow = ({ colKey, mode, active, onClick }) => (
  <button
    role={'presentation'}
    onClick={() => onClick(colKey, mode)}
    className={cn(styles.SortArrow, { [styles.active]: active })}
  >
    <Glyphicon
      glyph={mode === 'DESC' ? 'chevron-down' : 'chevron-up'}
    />
  </button>
);

SortArrow.propTypes = {
  colKey: PropTypes.string.isRequired,
  mode: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

SortArrow.defaultProps = {
  mode: 'DESC',
  active: false,
  onClick: () => {
  },
};

export default SortArrow;
