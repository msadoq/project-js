import { addTooltipWithContent } from './tooltip';

const backgroundDisabled = { backgroundColor: '#e67e22' };
const backgroundEnabled = { backgroundColor: '#2ecc71' };
// eslint-disable-next-line arrow-body-style
const _formatDate = (date) => {
  return (new Date(date)) > 0
    ? (new Date(date)).toISOString()
    : date
    ;
};

export const tableOverrideStyle = statusKeyList =>
  ({ content }) => {
    const { value, colKey } = content;
    if (statusKeyList.indexOf(colKey) > -1) {
      if (value === 'DISABLED') {
        return backgroundDisabled;
      }
      if (value === 'ENABLED') {
        return backgroundEnabled;
      }
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
        lastUpdateMode: {
          key: toolT.mode,
        },
        lastUpdateTime: {
          key: toolT.time,
          format: _formatDate,
        },
      }
    );
  };
