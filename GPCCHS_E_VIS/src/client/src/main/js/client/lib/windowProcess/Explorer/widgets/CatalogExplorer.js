import React, { PureComponent, PropTypes } from 'react';
import getLogger from 'common/log';
import CatalogExplorerRight from './CatalogExplorerRight';
import CatalogExplorerLeft from './CatalogExplorerLeft';

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

    const catalogExplorerStyle = { height: '100%' };
    const style = noOpenedItems ?
    {
      float: 'left',
      height: '100%',
      width: 'calc(100% - 4px)',
      padding: '2px',
    } :
    {
      float: 'left',
      height: '100%',
      width: 'calc(50% - 4px)',
      padding: '2px',
    };

    return (
      <div style={catalogExplorerStyle}>
        <div style={style}>
          <CatalogExplorerLeft
            {...this.props}
          />
        </div>
        { !noOpenedItems &&
          <div style={style}>
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
