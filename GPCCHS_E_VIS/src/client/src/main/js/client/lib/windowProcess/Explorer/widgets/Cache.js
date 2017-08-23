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
