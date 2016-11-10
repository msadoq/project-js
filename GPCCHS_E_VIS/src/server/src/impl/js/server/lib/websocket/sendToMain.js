const primus = require('./primus');

const sendToMain = (event, payload) => {
  const instance = primus.get();
  if (typeof instance === 'undefined') {
    throw new Error('primus wasn\'t inited yet');
  }
  instance.write({ event, payload });
};

module.exports = {
  sendToMain,
};
