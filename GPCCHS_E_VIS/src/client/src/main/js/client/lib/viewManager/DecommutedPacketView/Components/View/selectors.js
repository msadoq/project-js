// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : move selector from containers to reducers / spectify
//  selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Export const selector in DynamicViewContainer
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : USe new configuration in DynamicView
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { getConfigurationByViewId } from 'viewManager';
import _memoize from 'lodash/memoize';
import { NODE_TYPE_KEY, NODE_TYPE_OBJECT } from 'constants';


export const getFormula = (state, ownProps) => {
  const configuration = getConfigurationByViewId(state, ownProps);
  return _.get('entryPoints[0].connectedData.formula', configuration);
};

export const getStructuredData = (structure, data) => (
  _memoize(() => innerGetStructuredData(structure, data))()
);

/**
 * a packet is defined as follows:
 * {
 *  convertedValue: { type: 'ulong', value: 0, ... },
 *  extractedValue: { type: 'double', value: '73.45824635' },
 * }
 *
 * Unboxing this packet will push up the value to the parent level:
 * {
 *  convertedValue: 0,
 *  extractedValue: '73.45824635',
 * }
 */
export const unboxPacketAttributes = packet => Object.entries(packet)
  .map(([key, valueObject]) => ({ [key]: valueObject.value }))
  .reduce((agg, attr) => Object.assign(agg, attr), {});

export const innerGetStructuredData = ({ children, itemName, ...attributes }, data = []) => {
  const values = children
    ? undefined
    : data
      .filter(d => d.name.value === itemName)
      .map(({ name, ...rest }) => rest)
      .map(unboxPacketAttributes)
  ;
  // values && values.length && console.log(values);

  return {
    name: itemName,
    ...attributes,
    values: values && values.length ? values : undefined,
    children: children && children.map(c => innerGetStructuredData(c, data)),
    type: children ? NODE_TYPE_OBJECT : NODE_TYPE_KEY,
    // toggled: true,
  };
};
