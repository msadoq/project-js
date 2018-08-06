import { addTooltipWithContent } from './tooltip';
import parameters from '../../../common/configurationManager';


export const tableOverrideStyle = statusKeyList =>
  ({ content }) => {
    const statusColors = parameters.get('PUS_CONSTANTS').STATUS_COLOR;
    const { value, colKey } = content;
    // console.log(JSON.stringify(statusColors, null, 2));

    // empty field style within StatusKeyList should not be overrided
    if (typeof value === 'string' && value.length === 0) {
      return {};
    }
    if (statusKeyList.indexOf(colKey) > -1) {
      return { backgroundColor: statusColors[value] };
    }
    return {};
  };


export const tableModifier = tooltips =>
  (cellContent = {}, content = {}) => {
    const { colKey, value } = cellContent;
    if (typeof value === 'string' && value.length === 0) {
      return cellContent;
    }
    const toolT = tooltips[colKey];
    if (toolT === undefined) {
      return cellContent;
    }
    return addTooltipWithContent(
      cellContent,
      content,
      {
        lastUpdateMode: { key: toolT.mode },
        lastUpdateTime: { key: toolT.time },
      }
    );
  };
