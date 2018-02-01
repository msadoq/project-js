// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

module.exports = {
  // La valeur 0 semble être interdite UOCTET_0: 0,
  // UOCTET_1: { type: 'proto', value: 127 },
  // UOCTET_2: { type: 'proto', value: 255 },
  UOCTET_RAW_0: { type: 'raw', value: 123 },
};
