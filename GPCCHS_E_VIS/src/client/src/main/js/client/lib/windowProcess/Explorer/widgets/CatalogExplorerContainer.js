// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import {
  getRteSessions,
  getRteDomains,
  getRteCatalogs,
  getRteItemNames,
  getRteOpenedItems,
  getRteFocusedItem,
  getRteFocusedInfo,
} from 'store/reducers/rte';
import {
  isRteCatalogNodeToggled as toggleCatalogNode,
  isRteItemNameNodeToggled as toggleItemNameNode,
  isRteCatalogNodeActive as activeCatalogNode,
  isRteItemNameNodeActive as activeItemNameNode,
  isRteItemNodeToggled as toggleItemNode,
  deleteRteItemNames as deleteItemNames,
  closeRteItem as closeItem,
  setRteFocusedItem as setFocusedItem,
} from 'store/actions/rte';
import CatalogExplorer from './CatalogExplorer';

const mapStateToProps = (state) => {
  const sessions = getRteSessions(state);
  const domains = getRteDomains(state);
  const catalogs = getRteCatalogs(state);
  const itemNames = getRteItemNames(state);
  const openedItems = getRteOpenedItems(state);
  const focusedItem = getRteFocusedItem(state);
  const focusedInfo = getRteFocusedInfo(state);

  return {
    sessions,
    domains,
    catalogs: catalogs.children,
    itemNames: itemNames.children,
    openedItems,
    focusedItem,
    focusedInfo,
  };
};

const mapDispatchToProps = {
  toggleCatalogNode,
  toggleItemNameNode,
  toggleItemNode,
  activeCatalogNode,
  activeItemNameNode,
  deleteItemNames,
  closeItem,
  setFocusedItem,
};

const CatalogExplorerContainer = connect(mapStateToProps, mapDispatchToProps)(CatalogExplorer);

export default CatalogExplorerContainer;
