// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */


module.exports = {
  encode: data => ({
    numberCalls: (data.numberCalls !== null && typeof data.numberCalls !== 'undefined')
      ? { value: data.numberCalls }
      : null,
    alertByPHONE: (data.alertByPHONE !== null && typeof data.alertByPHONE !== 'undefined')
      ? { value: data.alertByPHONE }
      : null,
    alertByAUDIO: (data.alertByAUDIO !== null && typeof data.alertByAUDIO !== 'undefined')
      ? { value: data.alertByAUDIO }
      : null,
    alertByEMAIL: (data.alertByEMAIL !== null && typeof data.alertByEMAIL !== 'undefined')
      ? { value: data.alertByEMAIL }
      : null,
    alertBySMS: (data.alertBySMS !== null && typeof data.alertBySMS !== 'undefined')
      ? { value: data.alertBySMS }
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
    alertByPHONE: (data.alertByPHONE !== null && typeof data.alertByPHONE !== 'undefined')
      ? { type: 'boolean', value: data.alertByPHONE.value }
      : undefined,
    alertByAUDIO: (data.alertByAUDIO !== null && typeof data.alertByAUDIO !== 'undefined')
      ? { type: 'boolean', value: data.alertByAUDIO.value }
      : undefined,
    alertByEMAIL: (data.alertByEMAIL !== null && typeof data.alertByEMAIL !== 'undefined')
      ? { type: 'boolean', value: data.alertByEMAIL.value }
      : undefined,
    alertBySMS: (data.alertBySMS !== null && typeof data.alertBySMS !== 'undefined')
      ? { type: 'boolean', value: data.alertBySMS.value }
      : undefined,
    maxNumberRetries: (data.maxNumberRetries !== null && typeof data.maxNumberRetries !== 'undefined')
      ? { type: 'integer', value: data.maxNumberRetries.value }
      : undefined,
    delayRetries: (data.delayRetries !== null && typeof data.delayRetries !== 'undefined')
      ? { type: 'duration', value: data.delayRetries.value }
      : undefined,
  }),
};
