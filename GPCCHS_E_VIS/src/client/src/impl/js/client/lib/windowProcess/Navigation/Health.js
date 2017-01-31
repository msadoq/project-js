import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import getLogger from 'common/log';
import globalConstants from 'common/constants';
import styles from './Health.css';

const logger = getLogger('Health');

export default class Health extends Component {
  static propTypes = {
    lastPubSubTimestamp: PropTypes.number,
    dcStatus: PropTypes.number,
    hssStatus: PropTypes.number,
  };

  render() {
    logger.debug('render');
    const { hssStatus, dcStatus, lastPubSubTimestamp } = this.props;

    const dcStyle = dcStatus !== globalConstants.DC_STATUS_HEALTHY
      ? classnames(styles.bull, styles.alert)
      : classnames(styles.bull, styles.healthy);

    let hssStyle;
    switch (hssStatus) {
      case globalConstants.HSS_STATUS_HEALTHY:
        hssStyle = classnames(styles.bull, styles.healthy);
        break;
      case globalConstants.HSS_STATUS_WARNING:
        hssStyle = classnames(styles.bull, styles.warning);
        break;
      case globalConstants.HSS_STATUS_ERROR:
      default:
        hssStyle = classnames(styles.bull, styles.alert);
        break;
    }

    const pubSubStyle = lastPubSubTimestamp
      ? classnames(styles.bull, styles.healthy)
      : classnames(styles.bull, styles.idle);

    let last = '';
    if (lastPubSubTimestamp) {
      last = (
        <span>
          {' '}
          <span>{moment(lastPubSubTimestamp).format('D MMMM YYYY HH[:]mm')}</span>
          <span className={styles.seconds}>{moment(lastPubSubTimestamp).format('[:]ss[.]SSS')}</span>
        </span>
      );
    }

    return (
      <ButtonGroup>
        <Button bsSize="small">
          <span className={dcStyle}>•</span> DC
        </Button>
        <Button bsSize="small">
          <span className={hssStyle}>•</span> HSS
        </Button>
        <Button bsSize="small">
          <span className={pubSubStyle}>•</span> PUB/SUB
          {last}
        </Button>
      </ButtonGroup>
    );
  }
}
