import { connect } from 'react-redux';
import CatalogExplorer from './CatalogExplorer';
import {
  getRteSessions,
  getRteDomains,
  getRteCatalogs,
  getRteItemNames,
  getRteOpenedItems,
  getRteFocusedItem,
  getRteFocusedInfo,
} from '../../../store/reducers/rte';
import {
  isRteCatalogNodeToggled as toggleCatalogNode,
  isRteItemNameNodeToggled as toggleItemNameNode,
  isRteCatalogNodeActive as activeCatalogNode,
  isRteItemNameNodeActive as activeItemNameNode,
  isRteItemNodeToggled as toggleItemNode,
  deleteRteItemNames as deleteItemNames,
  closeRteItem as closeItem,
  setRteFocusedItem as setFocusedItem,
} from '../../../store/actions/rte';

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
