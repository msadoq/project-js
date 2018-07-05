const headerMessage = require('./headerMessage');
const time = require('../ccsds_mal/tIME');
const uninteger = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    initialisationMode: (data.initialisationMode !== null && typeof data.initialisationMode !== 'undefined')
    ? uninteger.encode(data.initialisationMode)
    : null,
    resetType:(data.resetType !== null && typeof data.resetType !== 'undefined')
    ? uninteger.encode(data.resetType)
    : null,
    date:(data.date !== null && typeof data.date !== 'undefined')
    ? time.encode(data.date)
    : null,
    headerMessage: headerMessage.encode(data.headerMessage),
  }),
  decode: data => ({
    initialisationMode: (data.initialisationMode !== null && typeof data.initialisationMode !== 'undefined')
    ? uninteger.decode(data.initialisationMode)
    : null,
    resetType:(data.resetType !== null && typeof data.resetType !== 'undefined')
    ? uninteger.decode(data.resetType)
    : null,
    date:(data.date !== null && typeof data.date !== 'undefined')
    ? time.decode(data.date)
    : null,
    headerMessage: headerMessage.decode(data.headerMessage),
  }),
};
