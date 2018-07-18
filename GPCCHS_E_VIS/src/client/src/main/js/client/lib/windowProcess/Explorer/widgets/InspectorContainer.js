/* eslint-disable quote-props */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific
//  TM data
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : fix openInspector and InspectorContainer imports
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add buttons to collapse and expand inspector static
//  data
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { connect } from 'react-redux';
import {
  getInspectorViewId,
  getInspectorViewType,
  getInspectorDataId,
  getInspectorEpName,
  getInspectorField,
  getInspectorDisplayingTM,
} from 'store/reducers/inspector';
import {
  isInspectorStaticDataNodeToggled as toggleNode,
  isInspectorStaticDataNodeLoading as loadingNode,
  toggleAllInspectorStaticDataNodes as toggleAllNodes,
} from 'store/actions/inspector';
import {
  getDataSelectors,
} from 'viewManager';
import Inspector from './Inspector';
import { getCatalogItemByName, getTupleId } from '../../../store/reducers/catalogs';

const ROOT_PARENT_NAME = 'root';

/**
 * Represents a key-value pair in a format usable by react-treebeard
 *
 * @param key
 * @param value
 * @param parentName
 * @returns {{children: Array, name: *, parentName: string, type: string}}
 */
const buildTerminalNode = (key, value, parentName = ROOT_PARENT_NAME) => ({
  children: [],
  name: key,
  parentName,
  type: 'key',
  value,
});

/**
 * Represents an object in a format usable by react-treebeard
 *
 * @param obj
 * @param parentName
 * @returns
 */
const buildNode = (obj = {}, parentName = ROOT_PARENT_NAME) =>
  Object.keys(obj).map(
    (key) => {
      const value = obj[key];

      if (typeof value === 'string') { // terminal node
        return buildTerminalNode(key, value, parentName);
      }

      let type = null;

      if (typeof key === 'number') {
        type = 'objectItem';
      } else if (Array.isArray(value)) {
        type = 'array';
      } else {
        type = 'object';
      }

      return {
        name: key,
        parentName,
        type,
        children: buildNode(value, key),
        toggled: false,
      };
    });

const mapStateToProps = (state) => {
  const viewId = getInspectorViewId(state);
  const viewType = getInspectorViewType(state);
  const epName = getInspectorEpName(state);
  const field = getInspectorField(state);
  const dataId = getInspectorDataId(state);
  const isDisplayingTM = getInspectorDisplayingTM(state);
  const staticDataLoading = false; // we assume that metadata is loaded when the view opens
  const dynamicData = (viewType && viewId && epName)
    ? getDataSelectors(viewType).getLastValue(state, { epName, viewId })
    : null;

  const { domainId, sessionId, catalog, parameterName } = dataId;

  const tupleId = getTupleId(domainId, sessionId);
  const catalogItem =
    getCatalogItemByName(
      state.catalogs,
      {
        tupleId,
        name: catalog,
        itemName: parameterName,
      }
    );

// eslint-disable-next-line no-unused-vars
  const metadata = _.get('metadata', catalogItem);
  const reportingItemPackets = _.get('reportingItemPackets', catalogItem);
  const formattedReportingItemPackets = reportingItemPackets.map(packet => packet.name);

  let staticData = null;

  if (metadata) {
    staticData = buildNode({
      'Short description': metadata.shortDescription,
      'Long description': metadata.longDescription,
      'Aliases': metadata.aliases,
      'Monitoring laws': metadata.tmMeta.monitoringItems, // TODO?: separate monitoring laws
                                                          // and monitoring conditions
                                                          // into 2 separate elements
      'Significaty condition': metadata.tmMeta.sgy,
      'Interpretation function': metadata.tmMeta.calibrationFunctions,
      'Formulas': metadata.algorithm,
      'Computed triggers': metadata.tmMeta.computedTriggers,
      'TM Packets list': formattedReportingItemPackets,
      'Computing definitions': metadata.tmMeta.computingDefinitions,
    }, ROOT_PARENT_NAME);
  }

  return {
    epName,
    field,
    dataId,
    isDisplayingTM,
    staticData,
    staticDataLoading,
    dynamicData,
  };
};

const InspectorContainer = connect(mapStateToProps, {
  toggleNode,
  toggleAllNodes,
  loadingNode,
})(Inspector);

export default InspectorContainer;
