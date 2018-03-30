
import React from 'react';
import PropTypes from 'prop-types';

import { Glyphicon, Label } from 'react-bootstrap';

import './Arrow.scss';

const iconMap = {
  ASC: 'chevron-up',
  DESC: 'chevron-down',
};

const Arrow = ({ mode }) => (
  <Label className={'Arrow'}>
    <Glyphicon glyph={iconMap[mode]} />
  </Label>
);

Arrow.propTypes = {
  mode: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
};

export default Arrow;
