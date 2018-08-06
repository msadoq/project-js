import { tableOverrideStyle, tableModifier } from './utils';

// const statusColors = {
//   DISABLED: '#e67e22',
//   ENABLED: '#2ecc71',
//   DELETED: '#FF0000',
//   UNKNOWN: '#bdc3c7',
// };

describe('viewManager/common/pus/utils', () => {
  describe('tableOverrideStyle', () => {
    const statusKeyList = ['status'];
    it('empty value should return empty Object', () => {
      const cellContent = {
        content: {
          value: '',
          colKey: 'status',
        },
      };
      expect(tableOverrideStyle(statusKeyList)(cellContent)).toEqual({});
    });
    // it('should return a styling Object', () => {
    //   // mock of statusColor needed
    //   const cellContent = {
    //     content: {
    //       value: 'ENABLED',
    //       colKey: 'status',
    //     },
    //   };
    //   expect(tableOverrideStyle(statusKeyList)(cellContent)).toEqual(
    //     { backgroundColor: '#2ecc71' }
    //   );
    // });
  });
  describe('tableModifier', () => {
    const tooltips = {
      keyOne: { mode: 'modeOne', time: 'timeOne' },
      keyTwo: { mode: 'modeTwo', time: 'timeTwo' },
    };
    const content = { keyOne: 'ValueOne', keyTwo: 'ValueTwo' };
    it('should return cellContent for empty cellContent value ', () => {
      const cellContent = {
        content: {
          value: '',
          colKey: 'keyOne',
        },
      };
      expect(tableModifier(tooltips)(cellContent, content)).toEqual(cellContent);
    });
    it('should return cellContent for undefined tootips', () => {
      const cellContent = {
        content: {
          value: 'status',
          colKey: 'keyThree',
        },
      };
      expect(tableModifier(tooltips)(cellContent, content)).toEqual(cellContent);
    });
  });
});
