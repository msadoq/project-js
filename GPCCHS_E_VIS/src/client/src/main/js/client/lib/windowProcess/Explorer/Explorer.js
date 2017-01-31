import React, { PureComponent, PropTypes } from 'react';
import { Table, Tabs, Tab } from 'react-bootstrap';
import _map from 'lodash/map';

import styles from './Explorer.css';
// import Navbar from '../Editor/Components/Navbar/Navbar';


export default class Explorer extends PureComponent {
  static propTypes = {
    dcStatus: PropTypes.number.isRequired,
    hssStatus: PropTypes.boolean,
    lastPubSubTime: PropTypes.number,
    perRemoteId: PropTypes.object,
    perView: PropTypes.object,
    viewData: PropTypes.object,
    windowId: PropTypes.string.isRequired,
  }

  state = { currentDisplay: 0 };

  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  perRemoteIdHeader = () => (
    <thead>
      <tr key="header">
        <th className="text-center">Parameter Name</th>
        <th className="text-center">Field</th>
        <th className="text-center">COM Object</th>
        <th className="text-center">Session ID</th>
        <th className="text-center">Domain ID</th>
        <th className="text-center">Timebar</th>
        <th className="text-center">Filters</th>
        <th className="text-center">Views</th>
      </tr>
    </thead>
  );

  perRemoteIdLine() {
    const { perRemoteId } = this.props;

    return _map(perRemoteId, (value, key) =>
      (<tr key={key}>
        <td key={key}>{value.dataId.parameterName}</td>
        <td>
          {_map(value.localIds, (localId, localKey) => {
            if (localId.field) {
              return (<tr key={localKey}>{localId.field}</tr>);
            }
            return (<tr key={localKey}>-</tr>);
          })
        }
        </td>
        <td>{value.dataId.comObject}</td>
        <td className="text-center">{value.dataId.sessionId}</td>
        <td className="text-center">{value.dataId.domainId}</td>
        <td>timebar</td>
        <td>{value.filter}</td>
        {/* <td>value.views</td>*/}
      </tr>));
  }

  render() {
    console.log('************* render');
    return (
      <Tabs defaultActiveKey={0} id="tabsInfo" className={styles.tabs}>
        <Tab eventKey={0} title="Data Map" className="tab-pane">
          <div className={styles.content}>
            <Table striped bordered condensed hover className={styles.table}>
              {this.perRemoteIdHeader()}
              <tbody>
                {this.perRemoteIdLine()}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey={1} title="View Map" className={styles.tabs}>
          <div className={styles.content}>
            <div>tab2</div>
          </div>
        </Tab>
        <Tab eventKey={2} title="Health" className={styles.tabs}>
          <div className={styles.content}>
            <div>tab2</div>
          </div>
        </Tab>
        <Tab eventKey={3} title="Server" className={styles.tabs}>
          <div className={styles.content}>
            <div>tab2</div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}
