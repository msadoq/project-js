import simple from '../simpleActionCreator';
import * as types from '../types';

export const setRteSessions = simple(types.HSC_SET_RTE_SESSIONS, 'sessions');
export const setRteDomains = simple(types.HSC_SET_RTE_DOMAINS, 'session', 'domains');
export const setRteCatalogs = simple(types.HSC_SET_RTE_CATALOGS, 'session', 'domain', 'catalogs');
export const setRteItemNames = simple(types.HSC_SET_RTE_ITEM_NAMES, 'catalog', 'version', 'itemNames');

export const openRteItem = simple(types.HSC_OPEN_RTE_ITEM, 'key', 'session', 'domain', 'catalog', 'version', 'namespace', 'name', 'item');
export const closeRteItem = simple(types.HSC_CLOSE_RTE_ITEM, 'key');

export const setRteFocusedItem = simple(types.HSC_SET_RTE_FOCUSED_ITEM, 'key', 'session', 'domain', 'catalog', 'version', 'namespace', 'name');

export const isRteCatalogNodeToggled = simple(types.HSC_IS_RTE_CATALOG_NODE_TOGGLED, 'path', 'toggled');
export const isRteItemNameNodeToggled = simple(types.HSC_IS_RTE_ITEM_NAME_NODE_TOGGLED, 'path', 'toggled');
export const isRteCatalogNodeActive = simple(types.HSC_IS_RTE_CATALOG_NODE_ACTIVE, 'path', 'active');
export const isRteItemNameNodeActive = simple(types.HSC_IS_RTE_ITEM_NAME_NODE_ACTIVE, 'path', 'active');
