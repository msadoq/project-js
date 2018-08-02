import { addTooltipWithContent } from './tooltip';
import parameters from '../../../common/configurationManager';

const statusColors = parameters.get('PUS_CONSTANTS').STATUS_COLOR;


export const tableOverrideStyle = keyList =>
  ({ content }) => {
    const { value, colKey } = content;
    if (keyList.indexOf(colKey) > -1) {
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
