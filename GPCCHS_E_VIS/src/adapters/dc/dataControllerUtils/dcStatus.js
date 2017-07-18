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
