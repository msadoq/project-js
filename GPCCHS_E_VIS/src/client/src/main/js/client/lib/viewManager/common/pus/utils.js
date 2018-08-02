import { addTooltipWithContent } from './tooltip';
import parameters from '../../../common/configurationManager';

const statusColors = parameters.get('PUS_CONSTANTS').STATUS_COLOR;
const checksumColor = parameters.get('PUS_CONSTANTS').CHECKSUM_COLOR;

/**
 * @param date
 * @returns {string}
 */
export const formatDate = date => (
  (new Date(date)) > 0
    ? (new Date(date)).toISOString()
    : date
);

export const tableOverrideStyle = (keyList, cellType) => {
  let colorConst;
  switch (cellType) {
    case 'CHECKSUM':
      colorConst = checksumColor;
      break;
    default:
      colorConst = statusColors;
      break;
  }
  return ({ content }) => {
    const { value, colKey } = content;
    if (keyList.indexOf(colKey) > -1) {
      return { backgroundColor: colorConst[value] };
    }
    return {};
  };
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
        lastUpdateMode: {
          key: toolT.mode,
        },
        lastUpdateTime: {
          key: toolT.time,
          format: formatDate,
        },
      }
    );
  };
