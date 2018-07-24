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
  getInspectorStaticDataChildren,
  getInspectorStaticDataLoading,
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

const mapStateToProps = (state) => {
  const viewId = getInspectorViewId(state);
  const viewType = getInspectorViewType(state);
  const epName = getInspectorEpName(state);
  const field = getInspectorField(state);
  const dataId = getInspectorDataId(state);
  const isDisplayingTM = getInspectorDisplayingTM(state);
  const staticData = getInspectorStaticDataChildren(state);
  const staticDataLoading = getInspectorStaticDataLoading(state);
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

  // TODO: pass metadata instead of static data and
  // also fetch the list of related TM packets

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
