// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// END-HISTORY
// ====================================================================

module.exports = (dataId, queryArguments) =>
  `${JSON.stringify(dataId)}${JSON.stringify(queryArguments)}`;
