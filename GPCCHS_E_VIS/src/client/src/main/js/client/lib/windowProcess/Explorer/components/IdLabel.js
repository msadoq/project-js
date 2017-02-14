import React, { PropTypes } from 'react';
import { Label } from 'react-bootstrap';

import styles from '../Explorer.css';


IdLabel.propTypes = {
  idLabel: PropTypes.string.isRequired,
  iKey: PropTypes.string.isRequired,
};

export default function IdLabel(props) {
  return <Label className={styles.label} key={props.iKey}>{props.idLabel}</Label>;
}
