const headerMessage = require('./headerMessage');

module.exports = {
  encode: data => ({
    headerMessage: headerMessage.encode(data.headerMessage),
  }),
  decode: data => ({
    headerMessage: headerMessage.decode(data.headerMessage),
  }),
};
