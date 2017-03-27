// Produced by Acceleo JavaScript Generator 1.1.0
const pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const pusElement = require('./pusElement');
const {
  encodeAttribute,
  decodeAttribute,

} = require('../types');

module.exports = {
  encode: data => ({
    monitoringId: (data.monitoringId !== null && typeof data.monitoringId !== 'undefined')
      ? { value: data.monitoringId }
      : null,
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? { value: data.parameterId }
      : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? { value: data.validityParameterId }
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? { value: data.validityParameterMask }
      : null,
    parameterCurrentValue: (data.parameterCurrentValue !== null && typeof data.parameterCurrentValue !== 'undefined')
      ? encodeAttribute(data.parameterCurrentValue)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? encodeAttribute(data.validityParameterExpectedValue)
      : null,
    monitoringInterval: (data.monitoringInterval !== null && typeof data.monitoringInterval !== 'undefined')
      ? { value: data.monitoringInterval }
      : null,
    repetitionNumber: (data.repetitionNumber !== null && typeof data.repetitionNumber !== 'undefined')
      ? { value: data.repetitionNumber }
      : null,
    checkType: (data.checkType !== null && typeof data.checkType !== 'undefined')
      ? { value: data.checkType }
      : null,
    monitoringStatus: (data.monitoringStatus !== null && typeof data.monitoringStatus !== 'undefined')
      ? { value: data.monitoringStatus }
      : null,
    pus012MonitoringCheckPropertiesLow: (data.pus012MonitoringCheckPropertiesLow !== null && typeof data.pus012MonitoringCheckPropertiesLow !== 'undefined')
      ? pus012MonitoringCheckProperties.encode(data.pus012MonitoringCheckPropertiesLow)
      : null,
    pus012MonitoringCheckPropertiesHigh: (data.pus012MonitoringCheckPropertiesHigh !== null && typeof data.pus012MonitoringCheckPropertiesHigh !== 'undefined')
      ? pus012MonitoringCheckProperties.encode(data.pus012MonitoringCheckPropertiesHigh)
      : null,
    pus012MonitoringCheckPropertiesExpected: (data.pus012MonitoringCheckPropertiesExpected !== null && typeof data.pus012MonitoringCheckPropertiesExpected !== 'undefined')
      ? pus012MonitoringCheckProperties.encode(data.pus012MonitoringCheckPropertiesExpected)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    monitoringId: (data.monitoringId !== null && typeof data.monitoringId !== 'undefined')
      ? { type: 'uinteger', value: data.monitoringId.value }
      : undefined,
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? { type: 'uinteger', value: data.parameterId.value }
      : undefined,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? { type: 'uinteger', value: data.validityParameterId.value }
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? { type: 'string', value: data.validityParameterMask.value }
      : undefined,
    parameterCurrentValue: (data.parameterCurrentValue !== null && typeof data.parameterCurrentValue !== 'undefined')
      ? decodeAttribute(data.parameterCurrentValue)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? decodeAttribute(data.validityParameterExpectedValue)
      : undefined,
    monitoringInterval: (data.monitoringInterval !== null && typeof data.monitoringInterval !== 'undefined')
      ? { type: 'uinteger', value: data.monitoringInterval.value }
      : undefined,
    repetitionNumber: (data.repetitionNumber !== null && typeof data.repetitionNumber !== 'undefined')
      ? { type: 'uinteger', value: data.repetitionNumber.value }
      : undefined,
    checkType: (data.checkType !== null && typeof data.checkType !== 'undefined')
      ? { type: 'uinteger', value: data.checkType.value }
      : undefined,
    monitoringStatus: (data.monitoringStatus !== null && typeof data.monitoringStatus !== 'undefined')
      ? { type: 'uinteger', value: data.monitoringStatus.value }
      : undefined,
    pus012MonitoringCheckPropertiesLow: (data.pus012MonitoringCheckPropertiesLow !== null && typeof data.pus012MonitoringCheckPropertiesLow !== 'undefined')
      ? pus012MonitoringCheckProperties.decode(data.pus012MonitoringCheckPropertiesLow)
      : undefined,
    pus012MonitoringCheckPropertiesHigh: (data.pus012MonitoringCheckPropertiesHigh !== null && typeof data.pus012MonitoringCheckPropertiesHigh !== 'undefined')
      ? pus012MonitoringCheckProperties.decode(data.pus012MonitoringCheckPropertiesHigh)
      : undefined,
    pus012MonitoringCheckPropertiesExpected: (data.pus012MonitoringCheckPropertiesExpected !== null && typeof data.pus012MonitoringCheckPropertiesExpected !== 'undefined')
      ? pus012MonitoringCheckProperties.decode(data.pus012MonitoringCheckPropertiesExpected)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

