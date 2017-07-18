import React, { PureComponent, PropTypes } from 'react';
import {
  Panel,
  // FormGroup,
  // ControlLabel,
  FormControl,
} from 'react-bootstrap';
import _map from 'lodash/map';
import getLogger from '../../../common/logManager';
import createItemKey from '../../../rtdManager/createItemKey';
import Tree from './Tree';
import { main } from '../../ipc';
import styles from './CatalogExplorer.css';
// import handleContextMenu from '../../common/handleContextMenu';

const logger = getLogger('CatalogExplorerLeft');

// const catalogsHeader = (
//   <h2>Catalogs / Versions</h2>
// );
// const itemNamesHeader = (
//   <h2>Namespaces / Names</h2>
// );

export default class CatalogExplorerLeft extends PureComponent {
  static propTypes = {
    // DATA
    sessions: PropTypes.arrayOf(PropTypes.string),
    domains: PropTypes.arrayOf(PropTypes.string),
    catalogs: PropTypes.arrayOf(PropTypes.object),
    itemNames: PropTypes.arrayOf(PropTypes.object),
    focusedInfo: PropTypes.shape({
      session: PropTypes.string,
      domain: PropTypes.string,
    }),
    openedItems: PropTypes.shape({}),
    // ACTIONS
    toggleCatalogNode: PropTypes.func.isRequired,
    activeCatalogNode: PropTypes.func.isRequired,
    toggleItemNameNode: PropTypes.func.isRequired,
    activeItemNameNode: PropTypes.func.isRequired,
    deleteItemNames: PropTypes.func.isRequired,
    setFocusedItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sessions: [],
    domains: [],
    catalogs: [],
    itemNames: [],
    focusedItem: null,
    focusedInfo: {
      session: '',
      domain: '',
    },
    openedItems: {},
  };

  onSessionChange = (event) => {
    const session = event.target.value;
    main.getRteDomains(session);
  }

  onDomainChange = (event) => {
    const { focusedInfo } = this.props;
    const { session } = focusedInfo;
    const domain = event.target.value;
    main.getRteCatalogs(session, domain);
  }

  onMouseDown = (key, event, node) => {
    if (event.buttons === 1) {
      const { deleteItemNames, focusedInfo, openedItems } = this.props;
      switch (key) {
        case 'catalogs':
          this.props.toggleCatalogNode(node.path, !node.toggled);
          this.props.activeCatalogNode(node.path, !node.active);
          if (!node.active) {
            const catalog = node.name;
            const version = node.value;
            main.getRteItemNames(catalog, version);
          } else {
            deleteItemNames();
          }
          break;
        case 'itemNames':
          this.props.toggleItemNameNode(node.path, !node.toggled);
          this.props.activeItemNameNode(node.path, !node.active);
          if (!node.active && node.children.length === 0) {
            const { session, domain, catalog, version } = focusedInfo;
            const namespace = node.parentName;
            const name = node.value;
            const itemKey = createItemKey(session, domain, catalog, namespace, name);
            if (Object.keys(openedItems).includes(itemKey)) {
              this.props.setFocusedItem(
                itemKey, session, domain, catalog, version, namespace, name);
            } else {
              main.openRteItem(session, domain, catalog, version, namespace, name, itemKey);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  render() {
    logger.debug('render');
    const {
      sessions,
      domains,
      catalogs,
      itemNames,
      focusedInfo,
    } = this.props;

    const sessionChoices = _map(['', ...sessions], session => (
      <option
        key={session}
        value={session}
      >
        {session}
      </option>
    ));
    const domainChoices = _map(['', ...domains], domain => (
      <option
        key={domain}
        value={domain}
      >
        {domain}
      </option>
    ));

    return (
      <div className={styles.root}>
        <Panel className={styles.session}>
          <div className={styles.stacked}>
            <span className={styles.label}>SessionId</span>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={focusedInfo.session}
              onChange={this.onSessionChange}
            >
              {sessionChoices}
            </FormControl>
          </div>
          <div className={styles.stacked}>
            <span className={styles.label}>DomainId</span>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={focusedInfo.domain}
              onChange={this.onDomainChange}
            >
              {domainChoices}
            </FormControl>
          </div>
        </Panel>
        <Panel className={styles.leftPanel}>
          <div className={styles.label}>Catalogs / Versions</div>
          <Panel className={styles.leftInnerPanel}>
            <Tree
              data={catalogs}
              onMouseDown={(...args) => this.onMouseDown('catalogs', ...args)}
            />
          </Panel>
        </Panel>
        <Panel className={styles.leftPanel}>
          <div className={styles.label}>Namespaces / Names</div>
          <Panel className={styles.leftInnerPanel}>
            <Tree
              data={itemNames}
              onMouseDown={(...args) => this.onMouseDown('itemNames', ...args)}
            />
          </Panel>
        </Panel>
      </div>
    );
  }
}
