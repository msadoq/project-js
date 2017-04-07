import React, { PureComponent, PropTypes } from 'react';
import { FormGroup, ControlLabel, Col, Panel, Button } from 'react-bootstrap';
import Inspector from 'react-json-inspector';
// import Perf from 'react-dom/lib/ReactPerf';
import moment from 'moment';
import { main } from '../../ipc';
import styles from '../Explorer.css';

export default class Cache extends PureComponent {
  static propTypes = {
    updateCacheInvalidation: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    lastCacheCleanUp: PropTypes.number,
  };

  static defaultProps = {
    lastCacheCleanUp: 0,
  };

  state = {
    serverInfo: {},
  };

  cleanCache = () => {
    this.props.updateCacheInvalidation(Date.now() - 1e10);
    // this.props.dummy();
  };

  serverDebug = () => {
    main.serverDebug(debug => this.setState({ serverInfo: debug }));
      // <Inspector data={debug} />); // eslint-disable-line no-console
  };

  // printReactWastedRenders = () => {
  //   this.props.play(this.props.focusedPage.timebarUuid);
  //   Perf.start();
  //   setTimeout(() => {
  //     Perf.stop();
  //     // eslint-disable-next-line no-console
  //     console.log('WASTED');
  //     Perf.printWasted();
  //     // eslint-disable-next-line no-console
  //     console.log('INCLUSIVE');
  //     Perf.printInclusive();
  //     // eslint-disable-next-line no-console
  //     console.log('EXCLUSIVE');
  //     Perf.printExclusive();
  //     this.props.pause(this.props.focusedPage.timebarUuid);
  //   }, get('ORCHESTRATION_FREQUENCY'));
  // }

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
        <Button
          bsStyle="primary"
          block
          onClick={this.serverDebug}
          type="button"
        >
        Server Info
        </Button>
        <Inspector data={this.state.serverInfo} search={false} />;
      </div>
    );
  }
}
