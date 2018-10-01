import _ from 'lodash/fp';
import _getOr from 'lodash/fp/getOr';
import _flow from 'lodash/fp/flow';
import _find from 'lodash/fp/find';
import { getTupleId } from '../reducers/catalogs';

export const STATUS_LOADING = 'loading';
export const STATUS_LOADED = 'loaded';

export const getCatalogsState = state => _.getOr({}, 'catalogs', state);

const _getCatalogs =
  (state, { domainId, sessionId }) =>
    _.getOr(
      {},
      getTupleId(domainId, sessionId),
      getCatalogsState(state)
    );

export const getCatalogs =
  (state, props) => {
    const catalogs = _getCatalogs(state, props) || {};

    return Object.keys(catalogs)
      .filter(key => key !== 'null')
      .map(
        catalog => ({
          name: catalog,
        })
      );
  };

const _getCatalogByName =
  (state, { domainId, sessionId, catalogName }) =>
    _.getOr({}, catalogName, _getCatalogs(state, { domainId, sessionId }));

export const getCatalogItemByName =
  (state, props) => _.getOr({}, props.catalogItemName, _getCatalogByName(state, props));

export const getCatalogItems =
  (state, props) => {
    const items = Object.keys(_getCatalogByName(state, props));

    return items.map(
      item => ({
        name: item,
      })
    );
  };

export const createCatalogItemFieldGetter =
  field =>
    (state, props) =>
      _.get(field, getCatalogItemByName(state, props));

export const getCatalogItemComObjects = createCatalogItemFieldGetter('comObjects');

export const getCatalogItemComObjectStructure = createCatalogItemFieldGetter('structure');

export const getCatalogItemMetadata = createCatalogItemFieldGetter('metadata');

export const getCatalogItemReportingItemPackets = createCatalogItemFieldGetter('reportingItemPackets');

export const getCatalogItemAlgorithmMetadata = (state, props) => {
  const metadata = getCatalogItemMetadata(state, props);

  return ({
    inputParameters: _getOr([], ['algorithm', 'inputParameters'], metadata),
    algorithm: _flow(
      _getOr([], ['algorithm', 'algorithms']),
      _find(a => a.language.toLocaleLowerCase() === 'python'),
      _getOr(undefined, 'text')
    )(metadata),
  });
};

export const getCatalogItemUnitMetadata =
  (state, props) => {
    const metadata = getCatalogItemMetadata(state, props);

    return _.get('unit', metadata);
  };


// LOADING STATUSES

export const getCatalogsStatus = (state, { domainId, sessionId }) =>
  _.get(['catalogs', '_status', getTupleId(domainId, sessionId), '_status'], state);

export const areCatalogsLoading =
  (state, props) => getCatalogsStatus(state, props) === STATUS_LOADING;

export const areCatalogsLoaded =
  (state, props) => getCatalogsStatus(state, props) === STATUS_LOADED;

const getCatalogItemsStatus =
  (state, { domainId, sessionId, catalogName }) =>
    _.get(
      [
        'catalogs',
        '_status',
        getTupleId(domainId, sessionId),
        catalogName,
        '_status',
      ],
      state
    );

export const areCatalogItemsLoading =
  (state, props) => getCatalogItemsStatus(state, props) === STATUS_LOADING;

export const areCatalogItemsLoaded =
  (state, props) => getCatalogItemsStatus(state, props) === STATUS_LOADED;

export const getCatalogItemFieldStatus =
  (state, { domainId, sessionId, catalogName, catalogItemName, fieldName }) =>
    _.get(
      [
        'catalogs',
        '_status',
        getTupleId(domainId, sessionId),
        catalogName,
        'items',
        catalogItemName,
        fieldName,
        '_status',
      ],
      state
    );

export const isCatalogItemFieldLoading =
  (state, props) => getCatalogItemFieldStatus(state, props) === STATUS_LOADING;

export const isCatalogItemFieldLoaded =
  (state, props) => getCatalogItemFieldStatus(state, props) === STATUS_LOADED;

export const isCatalogItemMetadataLoaded =
  (state, props) =>
    isCatalogItemFieldLoading(state, { ...props, fieldName: 'metadata' });

export const isCatalogItemMetadataLoading =
  (state, props) =>
    isCatalogItemFieldLoaded(state, { ...props, fieldName: 'metadata' });

export const areReportingItemPacketsLoading =
  (state, props) =>
    isCatalogItemFieldLoading(state, { ...props, fieldName: 'reportingItemPackets' });

export const areReportingItemPacketsLoaded =
  (state, props) =>
    isCatalogItemFieldLoaded(state, { ...props, fieldName: 'reportingItemPackets' });

export const areCatalogItemComObjectsLoading =
  (state, props) =>
    isCatalogItemFieldLoading(state, { ...props, fieldName: 'comObjects' });

export const areCatalogItemComObjectsLoaded =
  (state, props) =>
    isCatalogItemFieldLoaded(state, { ...props, fieldName: 'comObjects' });

export const isCatalogItemStructureLoading =
  (state, props) =>
    isCatalogItemFieldLoading(state, { ...props, fieldName: 'structure' });

export const isCatalogItemStructureLoaded =
  (state, props) =>
    isCatalogItemFieldLoaded(state, { ...props, fieldName: 'structure' });

// PARAM VALIDATORS

export const areCatalogsPropsValid =
  ({ domainId, sessionId }) =>
    typeof domainId === 'number' &&
    typeof sessionId === 'number';

export const areCatalogItemsPropsValid =
  ({ domainId, sessionId, catalogName }) =>
    areCatalogsPropsValid({ domainId, sessionId }) &&
    typeof catalogName === 'string' &&
    catalogName.length > 0;

export const areCatalogItemFieldPropsValid =
  ({ domainId, sessionId, catalogName, catalogItemName }) =>
    areCatalogItemsPropsValid({ domainId, sessionId, catalogName }) &&
    typeof catalogItemName === 'string' &&
    catalogItemName.length > 0;

