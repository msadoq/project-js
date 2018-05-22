/* eslint-disable max-len */
import {
  buildFormula,
} from 'viewManager/common';

const constants = require('constants');

const PACKETS_TYPES = constants.PACKETS_TYPES;

describe('buildFormula', () => {
  [undefined, null, 'Reporting'].forEach((catalog) => {
    [undefined, null, 'AGA_AM_ACQPRIORITY'].forEach((catalogItem) => {
      [
        undefined,
        null,
        PACKETS_TYPES.REPORTING_PARAMETER,
        PACKETS_TYPES.DECOMMUTED_PACKET,
        PACKETS_TYPES.CLCW,
        PACKETS_TYPES.ISIS_AGGREGATION,
        PACKETS_TYPES.RM,
        PACKETS_TYPES.TM,
      ].forEach((comObject) => {
        [undefined, null, 'convertedValue'].forEach((field) => {
          const formula = buildFormula(catalog, catalogItem, comObject, field);
          test(`buildFormula :: [${catalog}][${catalogItem}][${comObject}][${field}] || ${formula}`, () => {
            if (catalog && catalogItem && comObject && comObject === PACKETS_TYPES.REPORTING_PARAMETER) {
              expect(formula).toEqual(`Reporting.AGA_AM_ACQPRIORITY<${PACKETS_TYPES.REPORTING_PARAMETER}>.convertedValue`);
            } else if (catalog && catalogItem && comObject && comObject === PACKETS_TYPES.DECOMMUTED_PACKET) {
              expect(formula).toEqual(`Reporting.AGA_AM_ACQPRIORITY<${PACKETS_TYPES.DECOMMUTED_PACKET}>`);
            } else if (catalog && catalogItem && comObject && field) {
              expect(formula).toEqual(`Reporting.AGA_AM_ACQPRIORITY<${comObject}>.convertedValue`);
            } else if (catalog && catalogItem && comObject) {
              expect(formula).toEqual(`Reporting.AGA_AM_ACQPRIORITY<${comObject}>`);
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
