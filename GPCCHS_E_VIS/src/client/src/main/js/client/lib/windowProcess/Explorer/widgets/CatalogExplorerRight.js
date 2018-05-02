// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : update catalog explorer display styles
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console
//  and spaced-comment.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import { main } from 'windowProcess/ipc';
import { NODE_TYPE_LINK as LINK/* , NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK */ } from 'constants';
import getLogger from 'common/logManager';
import styles from './CatalogExplorer.css';
import Tree from './Tree';

const logger = getLogger('CatalogExplorerRight');

const makeTabTitle = ({ name }) =>
  `${name}`;

export default class CatalogExplorerRight extends PureComponent {
  static propTypes = {
    // DATA
    focusedItem: PropTypes.string,
    focusedInfo: PropTypes.shape({
      session: PropTypes.string,
      domain: PropTypes.string,
      catalog: PropTypes.string,
      version: PropTypes.string,
    }).isRequired,
    openedItems: PropTypes.shape({}),
    // ACTIONS
    closeItem: PropTypes.func.isRequired,
    toggleItemNode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    focusedItem: null,
    focusedInfo: {
      session: '',
      domain: '',
      catalog: '',
      version: '',
    },
    openedItems: {},
  };

  state = {
    focusedItem: null,
  }

  onClickTabItem = (focusedKey) => {
    const { openedItems } = this.props;
    const itemAttributes = _get(openedItems, [focusedKey, 'attributes']);
    const { session, domain, catalog, version, namespace, name } = itemAttributes;
    main.focusRteItem(session, domain, catalog, version, namespace, name, focusedKey);
  }

  onCloseItem = (event, key) => {
    event.stopPropagation();
    const {
      openedItems,
      closeItem,
    } = this.props;
    const itemKeys = Object.keys(openedItems);
    const index = _indexOf(itemKeys, key);
    const nextItemKey = _nth(itemKeys, index + 1) || _nth(itemKeys, index - 1);
    const itemAttributes = _get(openedItems, [nextItemKey, 'attributes']);
    const { session, domain, catalog, version, namespace, name } = itemAttributes;
    main.focusRteItem(session, domain, catalog, version, namespace, name, nextItemKey);
    closeItem(key);
  }

  onMouseDown = (event, node) => {
    const { focusedItem, focusedInfo } = this.props;
    const { session, domain } = focusedInfo;
    // const { session, domain } = focusedInfo;
    if (event.buttons === 1) {
      if (node.type !== LINK) {
        this.props.toggleItemNode(focusedItem, node.path, !node.toggled);
        return;
      }
      logger.info('Linking to', node.value);
      /* this.props.loadingNode(node.path, true);
      main.resolveLink({
        link: node.value,
        path: node.path,
        sessionId,
        domainId,
      });
      return; */
    }
    if (event.buttons === 2) {
      if (node.type === LINK /* || node.type === RESOLVED_LINK */) {
        const workspace = {
          label: 'Open link in Catalog Explorer',
          click: () => main.resolveRteLink({
            link: node.value,
            // path: node.path,
            sessionId: session,
            domainId: domain,
          }),
        };
        handleContextMenu(workspace);
      }
    }
  }

  render() {
    logger.debug('render');
    const {
      focusedItem,
      openedItems,
    } = this.props;

    const item = _get(openedItems, [focusedItem, 'item']);

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
            activeKey={focusedItem}
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
                onMouseDown={this.onMouseDown}
              />
            }
          </Panel>
        </Panel>
      </div>
    );
  }
}
