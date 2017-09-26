// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : fix editor opening per view and rename longData to convertData
// VERSION : 1.1.2 : FA : ISIS-FT-1952 : 16/05/2017 : Apply filters considering data type
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #6700 : 12/07/2017 : Fix bug with blob payload fields
// VERSION : 1.1.2 : DM : #6700 : 19/07/2017 : Fix bug with blob payload fields
// END-HISTORY
// ====================================================================

import { isLongValue, convertData, convertLongData, updateObjectValues } from './convertData';

describe('viewManager:commonData:convertData', () => {
  describe('isLongValue', () => {
    test('should returns true if a longValue', () => {
      const data = { type: 'long' };
      expect(isLongValue(data)).toEqual(true);
      data.type = 'ulong';
      expect(isLongValue(data)).toEqual(true);
      data.type = 'time';
      expect(isLongValue(data)).toEqual(true);
      data.type = 'fineTime';
      expect(isLongValue(data)).toEqual(true);
    });
    test('should returns false if not a longValue', () => {
      const data = { type: 'bool' };
      expect(isLongValue(data)).toEqual(false);
      data.type = 'string';
      expect(isLongValue(data)).toEqual(false);
      data.type = 'uinteger';
      expect(isLongValue(data)).toEqual(false);
    });
  });
  describe('convertData', () => {
    test('should supports long value', () => {
      // convertLongData is tested in detail in another test case
      expect(convertData({ type: 'long', symbol: '1485648450000' })).toEqual(1485648450000);
    });
    test('should supports boolean', () => {
      expect(convertData({ type: 'boolean', value: true })).toEqual('true');
      expect(convertData({ type: 'boolean', value: false })).toEqual('false');
      expect(convertData({ type: 'boolean' })).toEqual('false');
    });
    test('should supports enum', () => {
      expect(convertData({ type: 'enum', symbol: 'mySymbol' })).toEqual('mySymbol');
    });
    test('should supports double', () => {
      expect(convertData({ type: 'double', symbol: 1024.102410241024 })).toEqual(1024.102410241024);
    });
    test('should supports blob', () => {
      expect(convertData({ type: 'blob', value: Buffer.alloc(4, 12) })).toEqual('0c 0c 0c 0c ');
      expect(convertData({ type: 'blob', value: new Buffer([]) })).toEqual('');
    });
    test('should supports no type specified', () => {
      expect(convertData({ value: 10 })).toEqual({ value: 10 });
      expect(convertData({ value: { type: 'boolean', value: true } }))
        .toEqual({ value: { type: 'boolean', value: 'true' } });
    });
    test('should supports unknown type', () => {
      const value = {};
      expect(convertData({ type: 'unknown', value })).toBe(value);
    });
  });
  describe('convertLongData', () => {
    test('long', () => {
      const data = { type: 'long', symbol: '1485648450000' };
      expect(convertLongData(data)).toEqual(1485648450000);
    });
    test('ulong', () => {
      const data = { type: 'ulong', symbol: '1485648450000' };
      expect(convertLongData(data)).toEqual(1485648450000);
    });
    test('time', () => {
      const data = { type: 'time', value: 1485648450000 };
      expect(convertLongData(data)).toEqual('2017-01-29T00:07:30.000Z');
    });
    test('fineTime', () => {
      const data = { type: 'fineTime', value: 1485648450000 };
      expect(convertLongData(data)).toEqual('2017-01-29T00:07:30.000Z');
    });
    test('other', () => {
      const data = { type: 'other', value: 123456 };
      expect(convertLongData(data)).toEqual(123456);
    });
  });
  describe('updateObjectValues', () => {
    test('simple data', () => {
      let data = { type: 'string', value: 'myString' };
      expect(updateObjectValues(data)).toEqual(data);
      data = { type: 'long', symbol: '1485648450000' };
      expect(updateObjectValues(data)).toEqual({
        type: 'long',
        value: 1485648450000,
        symbol: '1485648450000' });
    });
    test('object data', () => {
      const data = { myString: { type: 'string', value: 'myStr' },
        myTime: { type: 'long', symbol: '1485648450000' } };
      expect(updateObjectValues(data)).toEqual({ myString: { type: 'string', value: 'myStr' },
        myTime: { type: 'long', value: 1485648450000, symbol: '1485648450000' } });
    });
    test('array data', () => {
      const data = { myArray: [{ myString: { type: 'string', value: 'myStr' },
        myTime: { type: 'long', symbol: '1485648450000' } }] };
      expect(updateObjectValues(data)).toEqual({ myArray: [
        { myString: { type: 'string', value: 'myStr' },
          myTime: { type: 'long', value: 1485648450000, symbol: '1485648450000' } }] });
    });
    test('complex object', () => {
      const data = { pus003DiagPacket: [{
        pus003Packet: {
          sid: { type: 'uinteger', value: 100 },
          validityParameterId: { type: 'uinteger', value: 100 },
          validityParameterMask: { type: 'string', value: 'mySTRING' },
          validityParameterExpectedValue: { type: 'double', symbol: '88.0390526054104' },
          collectionInterval: { type: 'duration', value: 4242 },
          status: { type: 'uinteger', value: 100 },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: 100 },
            lastUpdateTime: { type: 'time', value: 1485648450000 },
          },
        },
      }],
        numberHkPackets: { type: 'uinteger', value: 100 },
        numberDiagPackets: { type: 'uinteger', value: 100 },
        apid: { type: 'uinteger', value: 100 },
        pus003HkPacket: [{
          generationMode: { type: 'uinteger', value: 100 },
          pus003Packet: {
            sid: { type: 'uinteger', value: 100 },
            validityParameterId: { type: 'uinteger', value: 100 },
            validityParameterMask: { type: 'string', value: 'mySTRING' },
            validityParameterExpectedValue: { type: 'double', symbol: '88.0390526054104' },
            collectionInterval: { type: 'duration', value: 4242 },
            status: { type: 'uinteger', value: 100 },
            pusElement: {
              lastUpdateMode: { type: 'uinteger', value: 100 },
              lastUpdateTime: { type: 'time', value: 1485648450000 },
            },
          },
        }, {
          generationMode: { type: 'uinteger', value: 100 },
          pus003Packet: {
            sid: { type: 'uinteger', value: 100 },
            validityParameterId: { type: 'uinteger', value: 100 },
            validityParameterMask: { type: 'string', value: 'mySTRING' },
            validityParameterExpectedValue: { type: 'double', symbol: '88.0390526054104' },
            collectionInterval: { type: 'duration', value: 4242 },
            status: { type: 'uinteger', value: 100 },
            pusElement: {
              lastUpdateMode: { type: 'uinteger', value: 100 },
              lastUpdateTime: { type: 'time', value: 1485648450000 },
            },
          } }],
      };

      expect(updateObjectValues(data)).toEqual({
        pus003DiagPacket: [{
          pus003Packet: {
            sid: { type: 'uinteger', value: 100 },
            validityParameterId: { type: 'uinteger', value: 100 },
            validityParameterMask: { type: 'string', value: 'mySTRING' },
            validityParameterExpectedValue:
              { type: 'double', symbol: '88.0390526054104', value: '88.0390526054104' },
            collectionInterval: { type: 'duration', value: 4242 },
            status: { type: 'uinteger', value: 100 },
            pusElement: {
              lastUpdateMode: { type: 'uinteger', value: 100 },
              lastUpdateTime: { type: 'time', value: '2017-01-29T00:07:30.000Z' },
            },
          },
        }],
        numberHkPackets: { type: 'uinteger', value: 100 },
        numberDiagPackets: { type: 'uinteger', value: 100 },
        apid: { type: 'uinteger', value: 100 },
        pus003HkPacket: [{
          generationMode: { type: 'uinteger', value: 100 },
          pus003Packet: {
            sid: { type: 'uinteger', value: 100 },
            validityParameterId: { type: 'uinteger', value: 100 },
            validityParameterMask: { type: 'string', value: 'mySTRING' },
            validityParameterExpectedValue:
              { type: 'double', symbol: '88.0390526054104', value: '88.0390526054104' },
            collectionInterval: { type: 'duration', value: 4242 },
            status: { type: 'uinteger', value: 100 },
            pusElement: {
              lastUpdateMode: { type: 'uinteger', value: 100 },
              lastUpdateTime: { type: 'time', value: '2017-01-29T00:07:30.000Z' },
            },
          },
        }, {
          generationMode: { type: 'uinteger', value: 100 },
          pus003Packet: {
            sid: { type: 'uinteger', value: 100 },
            validityParameterId: { type: 'uinteger', value: 100 },
            validityParameterMask: { type: 'string', value: 'mySTRING' },
            validityParameterExpectedValue:
              { type: 'double', symbol: '88.0390526054104', value: '88.0390526054104' },
            collectionInterval: { type: 'duration', value: 4242 },
            status: { type: 'uinteger', value: 100 },
            pusElement: {
              lastUpdateMode: { type: 'uinteger', value: 100 },
              lastUpdateTime: { type: 'time', value: '2017-01-29T00:07:30.000Z' },
            },
          } }],
      });
    });
  });
});
