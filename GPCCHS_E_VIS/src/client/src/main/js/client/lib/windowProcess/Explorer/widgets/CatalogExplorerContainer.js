import { connect } from 'react-redux';
import CatalogExplorer from './CatalogExplorer';
import {
  getRteSessions,
  getRteDomains,
  getRteCatalogs,
  getRteItemNames,
  getRteOpenedItems,
  getRteFocusedItem,
} from '../../../store/reducers/rte';
import {
  isRteCatalogNodeToggled as toggleCatalogNode,
  isRteItemNameNodeToggled as toggleItemNameNode,
  isRteCatalogNodeActive as activeCatalogNode,
  isRteItemNameNodeActive as activeItemNameNode,
  deleteRteItemNames as deleteItemNames,
  closeRteItem as closeItem,
  setRteFocusedItem as setFocusedItem,
} from '../../../store/actions/rte';

const mapStateToProps = (state) => {
  console.log('hasChanged');
  const sessions = getRteSessions(state);
  const domains = getRteDomains(state);
  const catalogs = getRteCatalogs(state);
  const itemNames = getRteItemNames(state);
  const openedItems = getRteOpenedItems(state);
  const focusedItem = getRteFocusedItem(state);
  return {
    sessions,
    domains,
    catalogs: catalogs.children,
    itemNames: itemNames.children,
    openedItems,
    focusedItem,
  };
};

const mapDispatchToProps = {
  toggleCatalogNode,
  toggleItemNameNode,
  activeCatalogNode,
  activeItemNameNode,
  deleteItemNames,
  closeItem,
  setFocusedItem,
};

const CatalogExplorerContainer = connect(mapStateToProps, mapDispatchToProps)(CatalogExplorer);

export default CatalogExplorerContainer;
