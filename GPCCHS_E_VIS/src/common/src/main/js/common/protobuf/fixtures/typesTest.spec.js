// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

/* eslint-disable import/no-dynamic-require, "DV6 TBC_CNES specific tests need dynamic require" */
const ProtoBuf = require('protobufjs');
const MALAdapters = require('./ccsds_mal');
const _each = require('lodash/each');
const fs = require('fs');

const rootpath = `${__dirname}`;

const results = {
  ATTRIBUTE: arg => ({ type: arg.type, value: arg.value }),
  BLOB: arg => ({ type: 'blob', value: arg }),
  BOOLEAN: arg => ({ type: 'boolean', value: arg }),
  DURATION: arg => ({ type: 'duration', value: arg }),
  DOUBLE: arg => ({ type: 'double', symbol: `${arg}` }),
  FINETIME: arg => ({ type: 'finetime', value: arg.millisec, pico: arg.pico }),
  FLOAT: arg => ({ type: 'float', value: arg }),
  IDENTIFIER: arg => ({ type: 'identifier', value: arg }),
  INTEGER: arg => ({ type: 'integer', value: arg }),
  LONG: arg => ({ type: 'long', symbol: arg }),
  OCTET: arg => ({ type: 'octet', value: arg }),
  UOCTET: arg => ({ type: 'uoctet', value: arg }),
  SHORT: arg => ({ type: 'short', value: arg }),
  USHORT: arg => ({ type: 'ushort', value: arg }),
  STRING: arg => ({ type: 'string', value: arg }),
  TIME: arg => ({ type: 'time', value: arg }),
  UINTEGER: arg => ({ type: 'uinteger', value: arg }),
  ULONG: arg => ({ type: 'ulong', symbol: arg }),
  URI: arg => ({ type: 'uri', value: arg }),
};

const checkBuffer = (type, file, value, result) => {
  const data = fs.readFileSync(file);
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ccsds_mal/${type}.proto`, { keepCase: true })
    .lookup(`ccsds_mal.protobuf.${type}`);
  const adapter = MALAdapters[type];
  const json = adapter.decode(builder.decode(data));
  expect(json).toEqual(result(value));
};

const checkRawBuffer = (type, file, value, result) => {
  const data = fs.readFileSync(file);
  const adapter = MALAdapters[type];
  expect(adapter.decodeRaw(data, null, 0, 10)).toEqual(result(value));
};

describe('protobuf/lpisis/CCSDS_MAL_TYPES', () => {
  _each(results, (result, type) => {
    describe(`${type}`, () => {
      const index = require(`./${type}`); // eslint-disable-line global-require
      _each(index, (value, fileName) => {
        if (value.type === 'raw') {
          test(`${value.type} ${JSON.stringify(value.value)}`, () =>
            checkRawBuffer(type, `${rootpath}/${type}/${fileName}`, value.value, result));
          return;
        }
        if (value.type === 'proto') {
          test(`${value.type} ${JSON.stringify(value.value)}`, () =>
            checkBuffer(type, `${rootpath}/${type}/${fileName}`, value.value, result));
        }
      });
    });
  });
});
