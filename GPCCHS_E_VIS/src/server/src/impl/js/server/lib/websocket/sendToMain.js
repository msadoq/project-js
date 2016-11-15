const primus = require('./primus');

const sendToMain = (event, payload, queryId) => {
  const instance = primus.get();
  if (typeof instance === 'undefined') {
    throw new Error('primus wasn\'t inited yet');
  }
  instance.write({ event, queryId, payload });
};

module.exports = {
  sendToMain,
};
