import React, { PropTypes } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';

import styles from '../Explorer.css';


export function DomainAndSessionLabels() {
  return (
    <ul>
      <li key="{14}" className={styles.listLeft}><b>Domain: </b></li>
      <li key="{15}" className={styles.listLeft}><b>Session: </b></li>
    </ul>
  );
}

DomainAndSession.propTypes = {
  dataId: PropTypes.shape({
    sessionId: PropTypes.number,
    domainId: PropTypes.number,
  }),
  sessions: PropTypes.arrayOf(PropTypes.object),
  domains: PropTypes.arrayOf(PropTypes.object),
};

export function DomainAndSession(props) {
  const sessionName = _get(_find(props.sessions, ['id', props.dataId.sessionId]), ['name']);
  const domainName = _get(_find(props.domains, ['domainId', props.dataId.domainId]), ['name']);

  return (
    <ul>
      <li key="{24}" className={styles.listRight}>{props.dataId.domainId} - {domainName}</li>
      <li key="{25}" className={styles.listRight}>{props.dataId.sessionId} - {sessionName}</li>
    </ul>
  );
}
