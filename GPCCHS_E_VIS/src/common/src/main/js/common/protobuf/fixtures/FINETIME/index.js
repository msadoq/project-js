// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

module.exports = {
  // FINETIME_0: { type: 'proto', value: { millisec: 0, pico: 0 } },
  // FINETIME_1: { type: 'proto', value: { millisec: 446744073709551601, pico: 2147483647 } },
  // FINETIME_2: { type: 'proto', value: { millisec: 1844674407370955169, pico: 4294967291 } },
  FINETIME_RAW_0: { type: 'raw', value: { millisec: 123456789123456789, pico: 123456792 } },
};
