import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import getLogger from 'common/log';
import {
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_WARNING,
  HEALTH_STATUS_CRITICAL,
} from 'common/constants';
import styles from './Health.css';

const logger = getLogger('Health');

const getStyle = (status) => {
  switch (status) {
    case HEALTH_STATUS_CRITICAL:
      return classnames(styles.bull, styles.alert);
    case HEALTH_STATUS_WARNING:
      return classnames(styles.bull, styles.warning);
    default:
      return classnames(styles.bull, styles.healthy);
  }
};

export default class Health extends Component {
  static propTypes = {
    lastPubSubTimestamp: PropTypes.string,
    dc: PropTypes.string,
    hss: PropTypes.string,
    main: PropTypes.string,
    window: PropTypes.string,
  };

  static defaultProps = {
    lastPubSubTimestamp: null,
    dc: HEALTH_STATUS_HEALTHY,
    hss: HEALTH_STATUS_HEALTHY,
    main: HEALTH_STATUS_HEALTHY,
    window: HEALTH_STATUS_HEALTHY,
  };

  render() {
    logger.debug('render');
    const {
      hss,
      dc,
      main,
      window,
      lastPubSubTimestamp,
    } = this.props;

    const dcStyle = getStyle(dc);
    const hssStyle = getStyle(hss);
    const mainStyle = getStyle(main);
    const windowStyle = getStyle(window);

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
        <Button bsSize="small" title="Pub/sub receiving state">
          <span className={pubSubStyle}>•</span> PUB/SUB
          {last}
        </Button>
        <Button bsSize="small" title="Data Consumer daemon health status">
          <span className={dcStyle}>•</span> DC
        </Button>
        <Button bsSize="small" title="Cache daemon health status">
          <span className={hssStyle}>•</span> HSS
        </Button>
        <Button bsSize="small" title="Main application thread health status">
          <span className={mainStyle}>•</span> MAIN
        </Button>
        <Button bsSize="small" title="Current window health status">
          <span className={windowStyle}>•</span> WINDOW
        </Button>
      </ButtonGroup>
    );
  }
}
