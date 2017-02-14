import React, { PropTypes } from 'react';
import styles from '../Explorer.css';

DataIdLabels.propTypes = {
  iKey: PropTypes.string.isRequired,
};

export function DataIdLabels(props) {
  return (
    <ul key={props.iKey}>
      <li key="{11}" className={styles.listLeft}><b>Parameter: </b></li>
      <li key="{12}" className={styles.listLeft}><b>Catalog: </b></li>
      <li key="{13}" className={styles.listLeft}><b>COM object: </b></li>
    </ul>
  );
}

DataId.propTypes = {
  dataId: PropTypes.shape({
    parameterName: PropTypes.string,
    catalog: PropTypes.string,
    comObject: PropTypes.string,
  }).isRequired,
  iKey: PropTypes.string.isRequired,
};

export function DataId(props) {
  return (
    <ul key={props.iKey}>
      <li key="{21}" className={styles.listRight}>{props.dataId.parameterName}</li>
      <li key="{22}" className={styles.listRight}>{props.dataId.catalog}</li>
      <li key="{23}" className={styles.listRight}>{props.dataId.comObject}</li>
    </ul>
  );
}
