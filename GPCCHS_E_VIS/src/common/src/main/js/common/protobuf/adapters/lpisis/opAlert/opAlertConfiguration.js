// Produced by Acceleo JavaScript Generator 1.1.0
const alertingWay = require('./alertingWay');

module.exports = {
  encode: data => ({
    numberCalls: (data.numberCalls !== null && typeof data.numberCalls !== 'undefined')
      ? { value: data.numberCalls }
      : null,
    alertingWay: (data.alertingWay !== null && typeof data.alertingWay !== 'undefined')
      ? data.alertingWay
      : null,
    maxNumberRetries: (data.maxNumberRetries !== null && typeof data.maxNumberRetries !== 'undefined')
      ? { value: data.maxNumberRetries }
      : null,
    delayRetries: (data.delayRetries !== null && typeof data.delayRetries !== 'undefined')
      ? { value: data.delayRetries }
      : null,
  }),
  decode: data => ({
    numberCalls: (data.numberCalls !== null && typeof data.numberCalls !== 'undefined')
      ? { type: 'integer', value: data.numberCalls.value }
      : undefined,
    alertingWay: (data.alertingWay !== null && typeof data.alertingWay !== 'undefined')
      ? { type: 'enum', value: data.alertingWay, symbol: alertingWay[data.alertingWay] }
      : undefined,
    maxNumberRetries: (data.maxNumberRetries !== null && typeof data.maxNumberRetries !== 'undefined')
      ? { type: 'integer', value: data.maxNumberRetries.value }
      : undefined,
    delayRetries: (data.delayRetries !== null && typeof data.delayRetries !== 'undefined')
      ? { type: 'duration', value: data.delayRetries.value }
      : undefined,
  }),
};

