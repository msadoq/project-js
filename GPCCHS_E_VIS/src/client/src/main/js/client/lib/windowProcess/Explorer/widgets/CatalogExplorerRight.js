import React, { PureComponent, PropTypes } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Panel,
  Button,
  Glyphicon,
} from 'react-bootstrap';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _nth from 'lodash/nth';
import _indexOf from 'lodash/indexOf';
import getLogger from 'common/log';
import Tree from './Tree';
import styles from './CatalogExplorer.css';
import { main } from '../../ipc';

const logger = getLogger('CatalogExplorerRight');

const makeTabTitle = ({ name }) =>
  `${name}`;

export default class CatalogExplorerRight extends PureComponent {
  static propTypes = {
    // DATA
    focusedItem: PropTypes.shape({}),
    openedItems: PropTypes.shape({}),
    // ACTIONS
    setFocusedItem: PropTypes.func.isRequired,
    closeItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    focusedItem: {
      key: null,
    },
    openedItems: {},
  };

  state = {
    focusedItem: null,
  }

  onClickTabItem = (focusedKey) => {
    console.log('CLICK');
    const { focusedItem, openedItems, setFocusedItem } = this.props;
    const itemAttributes = _get(openedItems, [focusedKey, 'attributes']);
    const { session, domain, catalog, version, namespace, name } = itemAttributes;
    if (session !== focusedItem.session) {
      console.log('CHANGE SESSION');
      main.getRteDomains(session, (...attr) => {
        console.log('ATTR', attr);
      });
    }
    console.log('SET FOCUS');
    setFocusedItem(focusedKey, session, domain, catalog, version, namespace, name);
    if (domain !== focusedItem.domain) {
      main.getRteCatalogs(session, domain, (...attr) => {
        console.log('ATTR', attr);
      });
    }
    if (catalog !== focusedItem.catalog || version !== focusedItem.version) {
      main.getRteItemNames(catalog, version, (...attr) => {
        console.log('ATTR', attr);
      });
    }
  }

  onCloseItem = (event, key) => {
    event.stopPropagation();
    const {
      openedItems,
      closeItem,
      setFocusedItem,
    } = this.props;
    const itemKeys = Object.keys(openedItems);
    const index = _indexOf(itemKeys, key);
    const nextItemKey = _nth(itemKeys, index + 1) || _nth(itemKeys, index - 1);
    const itemAttributes = _get(openedItems, [nextItemKey, 'attributes']);
    console.log(key, index, nextItemKey, itemAttributes);
    const { session, domain, catalog, version, namespace, name } = itemAttributes;
    setFocusedItem(nextItemKey, session, domain, catalog, version, namespace, name);
    closeItem(key);
  }

  render() {
    logger.debug('render');
    console.log('right render');
    const {
      focusedItem,
      openedItems,
    } = this.props;

    const focusedKey = focusedItem.key;

    const item = _get(openedItems, [focusedKey, 'item']);

    console.log(focusedKey, item);

    const itemTabs = _map(openedItems, (openedItem, key) => (
      <NavItem
        eventKey={key}
        className={styles.tab}
      >
        <div>
          {makeTabTitle(openedItem.attributes)}
          <Button
            bsStyle="link"
            onClick={event => this.onCloseItem(event, key)}
            className={styles.button}
          >
            <Glyphicon
              glyph="remove-circle"
              className="text-danger"
            />
          </Button>
        </div>
      </NavItem>
    ));

    return (
      <div className={styles.root}>
        <Navbar
          fluid
          className={styles.navbar}
        >
          <Nav
            bsStyle="tabs"
            className={styles.nav}
            activeKey={focusedKey}
            onSelect={this.onClickTabItem}
          >
            {itemTabs}
          </Nav>
        </Navbar>
        <Panel
          className={styles.rightPanel}
        >
          <Panel className={styles.rightInnerPanel}>
            { item &&
              <Tree
                data={item.children}
              />
            }
          </Panel>
        </Panel>
      </div>
    );
  }
}
