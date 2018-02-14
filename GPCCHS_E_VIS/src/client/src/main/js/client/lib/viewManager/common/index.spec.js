import {
  buildFormula,
} from 'viewManager/common';

describe('buildFormula', () => {
  [undefined, null, 'Reporting'].forEach((catalog) => {
    [undefined, null, 'AGA_AM_ACQPRIORITY'].forEach((catalogItem) => {
      [undefined, null, 'ReportingParameter'].forEach((comObject) => {
        [undefined, null, 'convertedValue'].forEach((field) => {
          const formula = buildFormula(catalog, catalogItem, comObject, field);
          test(`buildFormula :: [${catalog}][${catalogItem}][${comObject}][${field}] || ${formula}`, () => {
            if (catalog && catalogItem && comObject && field) {
              expect(formula).toEqual('Reporting.AGA_AM_ACQPRIORITY<ReportingParameter>.convertedValue');
            } else if (catalog && catalogItem && comObject) {
              expect(formula).toEqual('Reporting.AGA_AM_ACQPRIORITY<ReportingParameter>.convertedValue');
            } else if (catalog && catalogItem) {
              expect(formula).toEqual('Reporting.AGA_AM_ACQPRIORITY');
            } else if (catalog) {
              expect(formula).toEqual('Reporting');
            } else {
              expect(formula).toEqual('');
            }
          });
        });
      });
    });
  });
});
