const primus = require('./primus');

const sendToMain = (event, payload) => {
  const instance = primus.get();
  if (typeof instance === 'undefined') {
    throw new Error('primus wasn\'t inited yet');
  }
  instance.forEach((spark) => {
    if (spark.hsc.identity === 'main') {
      spark.write({ event, payload });
    }
  });
};

module.exports = {
  sendToMain,
};
