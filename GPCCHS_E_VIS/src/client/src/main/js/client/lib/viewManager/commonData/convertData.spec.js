import { isLongValue, convertLongData, updateObjectValues } from './convertData';

describe('viewManager/commonData/convertData', () => {
  test('isLongValue: yes', () => {
    const data = { type: 'long' };
    expect(isLongValue(data)).toEqual(true);
    data.type = 'ulong';
    expect(isLongValue(data)).toEqual(true);
    data.type = 'time';
    expect(isLongValue(data)).toEqual(true);
    data.type = 'fineTime';
    expect(isLongValue(data)).toEqual(true);
  });
  test('isLongValue: no', () => {
    const data = { type: 'bool' };
    expect(isLongValue(data)).toEqual(false);
    data.type = 'string';
    expect(isLongValue(data)).toEqual(false);
    data.type = 'uinteger';
    expect(isLongValue(data)).toEqual(false);
  });
  describe('convertLongData', () => {
    test('long', () => {
      const data = { type: 'long', symbol: '1485648450000' };
      expect(convertLongData(data)).toEqual(1485648450000);
    });
    test('long', () => {
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
