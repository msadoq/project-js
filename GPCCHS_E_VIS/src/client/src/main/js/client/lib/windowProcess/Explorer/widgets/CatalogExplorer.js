import React, { PureComponent, PropTypes } from 'react';
import getLogger from 'common/log';
import CatalogExplorerRight from './CatalogExplorerRight';
import CatalogExplorerLeft from './CatalogExplorerLeft';
import styles from './CatalogExplorer.css';

const logger = getLogger('CatalogExplorer');

export default class CatalogExplorer extends PureComponent {
  static propTypes = {
    // DATA
    focusedItem: PropTypes.shape({}),
    openedItems: PropTypes.shape({}),
    // ACTIONS
    closeItem: PropTypes.func.isRequired,
    setFocusedItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    focusedItem: {
      key: null,
    },
    openedItems: {},
  };

  render() {
    logger.debug('render');
    console.log('render');
    const {
      focusedItem,
      openedItems,
      closeItem,
      setFocusedItem,
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
              focusedItem={focusedItem}
              openedItems={openedItems}
              setFocusedItem={setFocusedItem}
              closeItem={closeItem}
            />
          </div>
        }
      </div>
    );
  }
}
