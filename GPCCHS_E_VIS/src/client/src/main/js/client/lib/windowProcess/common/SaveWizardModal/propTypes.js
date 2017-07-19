import { PropTypes } from 'react';

export const pagePropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  isModified: PropTypes.bool,
  views: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    isModified: PropTypes.bool,
  })).isRequired,
});

export const buttonPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
});
