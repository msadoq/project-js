import moment from 'moment';
import React, { Component, PropTypes } from 'react';
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
    // const { pages, focusedPageId } = this.props;

    let timestamp;

    const dcStyle = {
      color: 'green',
    };
    const hssStyle = {
      color: 'green',
    };
    const pubSubStyle = {
      color: 'grey',
    };

    if (!this.props.hssStatus) {
      hssStyle.color = 'red';
    }
    if (this.props.dcStatus !== globalConstants.DC_STATUS_HEALTHY) {
      dcStyle.color = 'red';
    }
    if (this.props.lastPubSubTimestamp) {
      pubSubStyle.color = 'green';
      timestamp = moment(this.props.lastPubSubTimestamp).format('D MMMM YYYY HH[:]mm[:]ss[.]SSS');
    }


    return (
      <div className={styles.content}>
        <Label
          bsSize="sm"
          bsStyle="default"
          className={styles.parentLabel}
        >
          STATUS
          &nbsp;
          <Label
            bsSize="sm"
            bsStyle="default"
            className={styles.label}
          >
            DC:
            <span
              className={styles.bull}
              style={dcStyle}
            >
              &bull;
            </span>
          </Label>
          &nbsp;
          <Label
            bsSize="sm"
            bsStyle="default"
            className={styles.label}
          >
            HSS:
            <span
              className={styles.bull}
              style={hssStyle}
            >
              &bull;
            </span>
          </Label>
        </Label>
        &nbsp;
        <Label
          bsSize="sm"
          bsStyle="default"
          className={styles.parentLabel}
        >
          <Label
            bsSize="sm"
            bsStyle="default"
            className={styles.label}
          >
            PUB/SUB:
            <span
              className={styles.bull}
              style={pubSubStyle}
            >
              &bull;
            </span>
          </Label>
          &nbsp;
          <Label
            bsSize="sm"
            bsStyle="default"
            className={styles.dateLabel}
          >
            {timestamp}
          </Label>
        </Label>
      </div>
    );
  }
}
