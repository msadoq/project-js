// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : update catalog explorer display styles
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import getLogger from 'common/logManager';
import CatalogExplorerRight from './CatalogExplorerRight';
import CatalogExplorerLeft from './CatalogExplorerLeft';
import styles from './CatalogExplorer.css';

const logger = getLogger('CatalogExplorer');

export default class CatalogExplorer extends PureComponent {
  static propTypes = {
    // DATA
    focusedItem: PropTypes.string,
    focusedInfo: PropTypes.shape({}),
    openedItems: PropTypes.shape({}),
    // ACTIONS
    closeItem: PropTypes.func.isRequired,
    setFocusedItem: PropTypes.func.isRequired,
    toggleItemNode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    focusedItem: '',
    focusedInfo: {},
    openedItems: {},
  };

  render() {
    logger.debug('render');
    const {
      focusedInfo,
      focusedItem,
      openedItems,
      closeItem,
      setFocusedItem,
      toggleItemNode,
    } = this.props;

    const noOpenedItems = Object.keys(openedItems).length === 0;

    return (
      <div className={styles.catalogExplorer}>
        <div className={styles.catalogExplorerLeft}>
          <CatalogExplorerLeft
            {...this.props}
          />
        </div>
        { !noOpenedItems &&
          <div className={styles.catalogExplorerRight}>
            <CatalogExplorerRight
              focusedInfo={focusedInfo}
              focusedItem={focusedItem}
              openedItems={openedItems}
              setFocusedItem={setFocusedItem}
              toggleItemNode={toggleItemNode}
              closeItem={closeItem}
            />
          </div>
        }
      </div>
    );
  }
}
