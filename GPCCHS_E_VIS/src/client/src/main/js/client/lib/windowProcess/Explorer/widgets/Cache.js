// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Add cache and server info in explorer
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Complete performance tab in explorer
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Add cache tab in explorers
// VERSION : 1.1.2 : DM : #6700 : 20/07/2017 : Remove obsolete onServerDebug interface, ipcs and model
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Remove serverDebug ipc . .
// VERSION : 1.1.2 : DM : #6700 : 23/08/2017 : Update cache clean mechanism in dev tools
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import { FormGroup, ControlLabel, Col, Panel, Button } from 'react-bootstrap';

import moment from 'moment';
import styles from '../Explorer.css';

export default class Cache extends PureComponent {
  static propTypes = {
    updateCacheInvalidation: PropTypes.func.isRequired,
    lastCacheCleanUp: PropTypes.number,
  };

  static defaultProps = {
    lastCacheCleanUp: 0,
  };

  cleanCache = () => {
    this.props.updateCacheInvalidation(Date.now());
  };

  render() {
    const { lastCacheCleanUp } = this.props;
    return (
      <div>
        <FormGroup controlId="formHorizontal">
          <Col componentClass={ControlLabel} sm={5}>
            <strong>Last cache cleanup time</strong>
          </Col>
          <Col sm={7}>
            <Panel className={styles.panel}>{moment(lastCacheCleanUp).utc().toISOString()}</Panel>
          </Col>
        </FormGroup>
        <Button
          bsStyle="primary"
          block
          onClick={this.cleanCache}
          type="button"
        >
        Clean Cache
        </Button>
      </div>
    );
  }
}
