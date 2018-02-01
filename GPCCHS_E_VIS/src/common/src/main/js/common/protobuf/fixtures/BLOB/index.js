// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

module.exports = {
  // BLOB_0: { type: 'proto', value: Buffer.from('0', 'binary') },
  // BLOB_1: { type: 'proto', value: Buffer.from('17', 'binary') },
  // BLOB_2: { type: 'proto', value: Buffer.from('125', 'binary') },
  BLOB_RAW_0: { type: 'raw', value: Buffer.from('totê\0titi') },
};
