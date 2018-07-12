const tIME = require('../ccsds_mal/tIME');
const headerMessage = require('./headerMessage');

module.exports = {
  encode: data => ({
    firstDate: (data.firstDate !== null && typeof data.firstDate !== 'undefined')
      ? tIME.encode(data.firstDate)
      : null,
    secondDate: (data.secondDate !== null && typeof data.secondDate !== 'undefined')
      ? tIME.encode(data.secondDate)
      : null,
    headerMessage: headerMessage.encode(data.headerMessage),
  }),
  decode: data => ({
    firstDate: (data.firstDate !== null && typeof data.firstDate !== 'undefined')
      ? tIME.decode(data.firstDate)
      : undefined,
    secondDate: (data.secondDate !== null && typeof data.secondDate !== 'undefined')
      ? tIME.decode(data.secondDate)
      : undefined,
    headerMessage: headerMessage.decode(data.headerMessage),
  }),
};
