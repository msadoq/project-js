// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

module.exports = {
  encode: data => ({
    dcQueriesDelay: data.dcQueriesDelay,
    tbdStatus: data.tbdStatus,
    avrgTimeMsQuery: (typeof data.avrgTimeMsQuery !== 'undefined')
      ? data.avrgTimeMsQuery
      : undefined,
    avrgTimeMsGetLast: (typeof data.avrgTimeMsGetLast !== 'undefined')
      ? data.avrgTimeMsGetLast
      : undefined,

  }),
  decode: data => ({
    dcQueriesDelay: data.dcQueriesDelay,
    tbdStatus: data.tbdStatus,
    avrgTimeMsQuery: (typeof data.avrgTimeMsQuery !== 'undefined')
      ? data.avrgTimeMsQuery
      : undefined,
    avrgTimeMsGetLast: (typeof data.avrgTimeMsGetLast !== 'undefined')
      ? data.avrgTimeMsGetLast
      : undefined,
  }),
};
