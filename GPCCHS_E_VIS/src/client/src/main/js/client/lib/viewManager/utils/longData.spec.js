import { isLongValue, convertLongData, updateObjectValues } from './longData';

describe('viewManager/utils/longData', () => {
  it('isLongValue: yes', () => {
    const data = { type: 'long' };
    isLongValue(data).should.eql(true);
    data.type = 'ulong';
    isLongValue(data).should.eql(true);
    data.type = 'time';
    isLongValue(data).should.eql(true);
    data.type = 'fineTime';
    isLongValue(data).should.eql(true);
  });
  it('isLongValue: no', () => {
    const data = { type: 'bool' };
    isLongValue(data).should.eql(false);
    data.type = 'string';
    isLongValue(data).should.eql(false);
    data.type = 'uinteger';
    isLongValue(data).should.eql(false);
  });
  describe('convertLongData', () => {
    it('long', () => {
      const data = { type: 'long', symbol: '1485648450000' };
      convertLongData(data).should.eql(1485648450000);
    });
    it('long', () => {
      const data = { type: 'ulong', symbol: '1485648450000' };
      convertLongData(data).should.eql(1485648450000);
    });
    it('time', () => {
      const data = { type: 'time', value: 1485648450000 };
      convertLongData(data).should.eql('2017-01-29T00:07:30.000Z');
    });
    it('fineTime', () => {
      const data = { type: 'fineTime', value: 1485648450000 };
      convertLongData(data).should.eql('2017-01-29T00:07:30.000Z');
    });
    it('other', () => {
      const data = { type: 'other', value: 123456 };
      convertLongData(data).should.eql(123456);
    });
  });
  describe('updateObjectValues', () => {
    it('simple data', () => {
      let data = { type: 'string', value: 'myString' };
      updateObjectValues(data).should.eql(data);
      data = { type: 'long', symbol: '1485648450000' };
      updateObjectValues(data).should.eql({
        type: 'long',
        value: 1485648450000,
        symbol: '1485648450000' });
    });
    it('object data', () => {
      const data = { myString: { type: 'string', value: 'myStr' },
        myTime: { type: 'long', symbol: '1485648450000' } };
      updateObjectValues(data).should.eql({ myString: { type: 'string', value: 'myStr' },
        myTime: { type: 'long', value: 1485648450000, symbol: '1485648450000' } });
    });
    it('array data', () => {
      const data = { myArray: [{ myString: { type: 'string', value: 'myStr' },
        myTime: { type: 'long', symbol: '1485648450000' } }] };
      updateObjectValues(data).should.eql({ myArray: [
        { myString: { type: 'string', value: 'myStr' },
          myTime: { type: 'long', value: 1485648450000, symbol: '1485648450000' } }] });
    });
    it('complex object', () => {
      const data = { pus003DiagPacket: [{
        pus003Packet: {
          sid: { type: 'uinteger', value: 100 },
          validityParameterId: { type: 'uinteger', value: 100 },
          validityParameterMask: { type: 'string', value: 'mySTRING' },
          validityParameterExpectedValue: { type: 'double', value: 88.0390526054104 },
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
            validityParameterExpectedValue: { type: 'double', value: 88.0390526054104 },
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
            validityParameterExpectedValue: { type: 'double', value: 88.0390526054104 },
            collectionInterval: { type: 'duration', value: 4242 },
            status: { type: 'uinteger', value: 100 },
            pusElement: {
              lastUpdateMode: { type: 'uinteger', value: 100 },
              lastUpdateTime: { type: 'time', value: 1485648450000 },
            },
          } }],
      };

      updateObjectValues(data).should.eql({
        pus003DiagPacket: [{
          pus003Packet: {
            sid: { type: 'uinteger', value: 100 },
            validityParameterId: { type: 'uinteger', value: 100 },
            validityParameterMask: { type: 'string', value: 'mySTRING' },
            validityParameterExpectedValue: { type: 'double', value: 88.0390526054104 },
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
            validityParameterExpectedValue: { type: 'double', value: 88.0390526054104 },
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
            validityParameterExpectedValue: { type: 'double', value: 88.0390526054104 },
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
