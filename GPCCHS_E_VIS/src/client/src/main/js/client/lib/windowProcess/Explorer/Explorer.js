import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import {
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import DataMapContainer from './widgets/DataMapContainer';
import StoreContainer from './widgets/StoreContainer';
import PerformanceContainer from './widgets/PerformanceContainer';
import InspectorContainer from './widgets/InspectorContainer';
import InformationContainer from './widgets/InformationContainer';
import CacheContainer from './widgets/CacheContainer';

import styles from './Explorer.css';

const NotAlreadyImplemented = () => <div>Not already implemented</div>;

const widgets = {
  dsex: { title: 'DataStore explorer', component: NotAlreadyImplemented },
  rte: { title: 'RTE', component: NotAlreadyImplemented },
  inspector: { title: 'Inspector', component: InspectorContainer },
  map: { title: 'Data map (developer)', component: DataMapContainer },
  store: { title: 'Store (developer)', component: StoreContainer },
  cache: { title: 'Cache (developer)', component: CacheContainer },
  performance: { title: 'Performance (developer)', component: PerformanceContainer },
  information: { title: 'Information (developer)', component: InformationContainer },
};

export default class Explorer extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string,
    pageId: PropTypes.string.isRequired,
    tabId: PropTypes.string,
    focusTabInExplorer: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tabId: Object.keys(widgets)[0],
  }

  handleSelect = (event) => {
    const tabId = event.target.value;
    if (tabId) {
      const { pageId, focusTabInExplorer } = this.props;
      focusTabInExplorer(pageId, tabId);
    }
  }

  /**
   * DataStore explorer:
   * [ ] ...
   * RTE:
   * [ ] ...
   * Inspector:
   * [ ] ...
   * ====== separator =======
   * Data map:
   * [x] data map
   * = copy
   * = console
   * Store:
   * [x] redux store
   * = copy
   * = console
   * Cache:
   * [ ] server info
   * [ ] last cache cleanup time
   * = clean cache
   * = refresh
   * Performances:
   * [x] health
   * [x] pubsub time
   * [ ] number of views
   * [ ] number of points in plotview
   * [ ] number of entry point in textView
   * = wasted
   * = profile
   * Informations:
   * [ ] releases
   * [ ] branch
   * [ ] build time
   * [x] master session
   * [x] configuration
   */

  render() {
    const { windowId, tabId } = this.props;

    const Widget = _get(widgets, [tabId, 'component'], NotAlreadyImplemented);

    return (
      <div className={styles.container}>
        <FormGroup controlId="formControlsSelect">
          <FormControl
            componentClass="select"
            onChange={this.handleSelect}
            value={tabId}
          >
            {Object.keys(widgets).map(
              id => <option key={id} value={id}>{_get(widgets, [id, 'title'])}</option>
            )}
          </FormControl>
        </FormGroup>
        <h2>{_get(widgets, [tabId, 'title'])}</h2>
        <div className={styles.widgetContainer}>
          <Widget windowId={windowId} />
        </div>
      </div>
    );
  }
}
