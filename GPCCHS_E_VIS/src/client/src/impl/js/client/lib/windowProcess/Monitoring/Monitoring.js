import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Label } from 'react-bootstrap';
import getLogger from 'common/log';
import globalConstants from 'common/constants';
import styles from './Monitoring.css';

const logger = getLogger('Monitoring');

export default class Monitoring extends Component {
  static propTypes = {
    lastPubSubTimestamp: PropTypes.number,
    dcStatus: PropTypes.number,
    hssStatus: PropTypes.bool,
  };

  render() {
    logger.debug('render');
    const { hssStatus, dcStatus, lastPubSubTimestamp } = this.props;

    let timestamp;

    const dcStyle = dcStatus !== globalConstants.DC_STATUS_HEALTHY
      ? classnames(styles.bull, styles.alert)
      : classnames(styles.bull, styles.healthy);

    const hssStyle = hssStatus === false
      ? classnames(styles.bull, styles.alert)
      : classnames(styles.bull, styles.healthy);

    const pubSubStyle = lastPubSubTimestamp
      ? classnames(styles.bull, styles.healthy)
      : classnames(styles.bull, styles.idle);

    if (lastPubSubTimestamp) {
      timestamp = moment(lastPubSubTimestamp).format('D MMMM YYYY HH[:]mm');
    }

    return (
      <div className={styles.content}>
        <Label className={styles.parentLabel}>
          STATUS
          {' '}
          <Label className={styles.label}>
            DC: <span className={dcStyle}>•</span>
          </Label>
          {' '}
          <Label className={styles.label}>
            HSS: <span className={hssStyle}>•</span>
          </Label>
        </Label>
        {'   '}
        <Label className={styles.parentLabel}>
          <Label className={styles.label}>
            PUB/SUB: <span className={pubSubStyle}>•</span>
          </Label>
          {' '}
          <Label className={styles.dateLabel}>
            {timestamp}
          </Label>
        </Label>
      </div>
    );
  }
}
