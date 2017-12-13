// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

module.exports = {
  /* TODO: Impossible de decoder d'autres valeurs
    que la valeur maximale pour le short SHORT_v2_3: -32768
    et la valeur maximale pour le short SHORT_v2_1: 123 */
  // SHORT_v2_2: { type: 'proto', value: 32767 },
  SHORT_RAW_0: { type: 'raw', value: 12345 },
};
