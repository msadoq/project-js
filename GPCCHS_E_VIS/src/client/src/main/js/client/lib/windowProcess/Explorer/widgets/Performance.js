import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import _reduce from 'lodash/reduce';
import _isObject from 'lodash/isObject';
import classnames from 'classnames';
import {
  Panel,
} from 'react-bootstrap';
import getLogger from 'common/log';
import {
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_WARNING,
  HEALTH_STATUS_CRITICAL,
} from 'common/constants';
import styles from './Performance.css';
import * as constants from '../../../viewManager/constants';

const logger = getLogger('Performance');

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

export default class Performance extends Component {
  static propTypes = {
    lastPubSubTimestamp: PropTypes.number,
    dc: PropTypes.string,
    hss: PropTypes.string,
    main: PropTypes.string,
    window: PropTypes.string,
    viewInfo: PropTypes.shape({
      [constants.VM_VIEW_DYNAMIC]: PropTypes.object,
      [constants.VM_VIEW_TEXT]: PropTypes.object,
      [constants.VM_VIEW_PLOT]: PropTypes.object,
    }),
  };

  static defaultProps = {
    lastPubSubTimestamp: null,
    dc: HEALTH_STATUS_HEALTHY,
    hss: HEALTH_STATUS_HEALTHY,
    main: HEALTH_STATUS_HEALTHY,
    window: HEALTH_STATUS_HEALTHY,
    viewInfo: {
      [constants.VM_VIEW_DYNAMIC]: {},
      [constants.VM_VIEW_TEXT]: {},
      [constants.VM_VIEW_PLOT]: {},
    },
  };

  render() {
    logger.debug('render');
    const {
      hss,
      dc,
      main,
      window,
      lastPubSubTimestamp,
      viewInfo,
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
    const plotPts = _reduce(viewInfo[constants.VM_VIEW_PLOT], (acc, v) => {
      if (_isObject(v)) {
        acc.push((<li>{v.title}: {v.nbPt}</li>));
      }
      return acc;
    }, []);
    const textPts = _reduce(viewInfo[constants.VM_VIEW_TEXT], (acc, v) => {
      if (_isObject(v)) {
        acc.push((<li>{v.title}: {v.nbPt}</li>));
      }
      return acc;
    }, []);

    return (
      <div>
        <Panel header={<h3>Health</h3>}>
          <div title="Data Consumer daemon health status">
            <span className={dcStyle}>•</span> DC
          </div>
          <div title="Cache daemon health status">
            <span className={hssStyle}>•</span> HSS
          </div>
          <div title="Main application thread health status">
            <span className={mainStyle}>•</span> MAIN
          </div>
          <div title="Current window health status">
            <span className={windowStyle}>•</span> WINDOW
          </div>
        </Panel>
        <Panel header={<h3>Pub/sub incoming data</h3>}>
          <div title="Pub/sub receiving state">
            {last}
          </div>
          <span className={pubSubStyle}>•</span> PUB/SUB
        </Panel>
        <Panel header={<h3>Numbers</h3>}>
          <div>Number of views:
          <ul>
            <li>Plot Views: {Object.keys(viewInfo[constants.VM_VIEW_PLOT]).length - 1}</li>
            <li>Text Views: {Object.keys(viewInfo[constants.VM_VIEW_TEXT]).length - 1}</li>
            <li>Dynamic View: {viewInfo[constants.VM_VIEW_DYNAMIC].all}</li>
          </ul>
          </div>
          <div>Number of points:
            <ul> Plot Views:
              <ul>{plotPts}</ul>
            </ul>
            <ul> Text Views:
              <ul>{textPts}</ul>
            </ul>
          </div>
        </Panel>
      </div>
    );
  }
}
