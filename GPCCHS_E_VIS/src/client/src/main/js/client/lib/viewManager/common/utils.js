import _ from 'lodash/fp';
import { buildFormulaForAutocomplete } from './index';

/**
 * @param data
 * @param id
 * @param defaultTimelineId
 * @returns {{name: *, connectedData: {formula: string, fieldX: string, timeline: *}}}
 * @pure
 */
export const parseDragData = (data, id, defaultTimelineId) => {
  const getComObject = _.propOr('UNKNOWN_COM_OBJECT', 0);
  const formula =
    buildFormulaForAutocomplete(
      data.catalogName,
      data.item,
      getComObject(data.comObjects),
      data.comObjectFields
    );
  return {
    name: data.item,
    connectedData: {
      formula,
      catalog: data.catalogName,
      catalogItem: data.item,
      comObject: getComObject(data.comObjects),
      comObjectField: data.comObjectFields || 'convertedValue',
      fieldX: 'onboardDate',
      unit: 'V',
      domain: data.domain || '*',
      timeline: defaultTimelineId,
    },
  };
};

export const dummy = (x, y) => x + y;
