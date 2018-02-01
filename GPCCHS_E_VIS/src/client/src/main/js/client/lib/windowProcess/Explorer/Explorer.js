// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 09/02/2017 : Cleaning of explorer window process
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add dataMap and store explorer widgets
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add partial performance widget in explorer
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Add information widget in explorer with masterSession and configuration
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add information widget in explorer with masterSession and configuration
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Add cache and server info in explorer
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Handle panel collapse/expand buttons with css instead of JE and react refs.
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Collapse/minimize Editor/Explorer : buttons are in Window.js
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Panels are now sticky on left and right.
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import {
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import DataMapContainer from './widgets/DataMapContainer';
import StoreContainer from './widgets/StoreContainer';
import styles from './Explorer.css';
import InspectorContainer from './widgets/InspectorContainer';
import InformationContainer from './widgets/InformationContainer';
import CacheContainer from './widgets/CacheContainer';
import CatalogExplorerContainer from './widgets/CatalogExplorerContainer';

import PerformanceContainer from './widgets/PerformanceContainer';

const NotAlreadyImplemented = () => <div>Not already implemented</div>;

const widgets = {
  dsex: { title: 'DataStore explorer', component: NotAlreadyImplemented },
  rte: { title: 'Catalog explorer', component: CatalogExplorerContainer },
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
    minimizeExplorer: PropTypes.func.isRequired,
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

  willExpandExplorer = (e) => {
    e.preventDefault();
    const {
      minimizeExplorer,
      pageId,
    } = this.props;
    minimizeExplorer(pageId, true);
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
      <div className={styles.explorer}>
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
