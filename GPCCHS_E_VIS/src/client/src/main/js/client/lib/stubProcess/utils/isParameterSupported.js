// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #6816 : 09/08/2017 : add textviews with 10, 1000 and >5000 EP
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update server process and data injection for alarms
// VERSION : 2.0.0 : DM : #5806 : 10/10/2017 : Change some protos, plus minor change
// VERSION : 2.0.0 : DM : #5806 : 26/10/2017 : Add Supported parameter
//  alarm.alarm<OnBoardAlarmAckRequest> in stubProcess
// VERSION : 2.0.0 : DM : #5806 : 02/11/2017 : Change formula for alarms .
// VERSION : 2.0.0.2 : FA : #11812 : 18/04/2018 : Add entrypoint stat aggreg in stub
// END-HISTORY
// ====================================================================

const supported = [
  /^[^.]*\.[^<.]*<COP1Context>$/,  // COP1Context
  /^TelemetryPacket\.[^<.]*<DecommutedPacket>$/, // DecommutedPacket
  /^TelemetryPacket\.[^<.]*<ClcwPacket>$/, // ClcwPacket
  /^TelemetryPacket\.[^<.]*<IsisAggregation>$/, // IsisAggregation
  /^TelemetryPacket\.[^<.]*<RmPacket>$/, // RmPacket
  /^TelemetryPacket\.[^<.]*<TmPacket>$/, // TmPacket
  /^Reporting\.[^<.]*<ReportingParameter>$/, // ReportingParameter
  /^[^.]*\.[^<.]*<GroundMonitoringAlarmAckRequest>$/,  // GroundMonitoringAlarmAckRequest
  /^Monitoring\.[^<.]*<GroundMonitoringAlarm>$/,  // GroundMonitoringAlarm
  /^[^.]*\.[^<.]*<OnBoardAlarmAckRequest>$/,  // OnBoardAlarmAckRequest
  /^OperationParameter\.[^<.]*<OperationParameter>$/,  // OperationParameter
  /^ComputedEventDefinition\.[^<.]*<ComputedEvent>$/,  // ComputedEvent
  /^LogbookEventDefinition\.[^<.]*<LogbookEvent>$/,  // LogbookEvent
  /^UserEventDefinition\.[^<.]*<ExternalEvent>$/,  // ExternalEvent
  /^UserEventDefinition\.[^<.]*<UserEvent>$/,  // UserEvent
  /^Pus003\.parameter<Pus003Model>$/,  // Pus003Model
  /^Pus005\.parameter<Pus005Model>$/,  // Pus005Model
  /^Pus012\.parameter<Pus012Model>$/,  // Pus012Model
  /^PusGroundModelDefinition\.[^<.]*<Pus003Model>$/,  // Pus003Model
  /^PusGroundModelDefinition\.[^<.]*<Pus005Model>$/,  // Pus005Model
  /^PusGroundModelDefinition\.[^<.]*<Pus011Command>$/,  // Pus011Command
  /^PusGroundModelDefinition\.[^<.]*<Pus011Model>$/,  // Pus011Model
  /^PusGroundModelDefinition\.[^<.]*<Pus011SubSchedule>$/,  // Pus011SubSchedule
  /^PusGroundModelDefinition\.[^<.]*<Pus011SyncPoint>$/,  // Pus011SyncPoint
  /^PusGroundModelDefinition\.[^<.]*<Pus012Model>$/,  // Pus012Model
  /^PusGroundModelDefinition\.[^<.]*<Pus013Model>$/,  // Pus013Model
  /^PusGroundModelDefinition\.[^<.]*<Pus014Model>$/,  // Pus014Model
  /^PusGroundModelDefinition\.[^<.]*<Pus015Model>$/,  // Pus015Model
  /^PusGroundModelDefinition\.[^<.]*<Pus018Model>$/,  // Pus018Model
  /^PusGroundModelDefinition\.[^<.]*<Pus019Model>$/,  // Pus019Model
  /^PusGroundModelDefinition\.[^<.]*<Pus140Model>$/,  // Pus140Model
  /^PusGroundModelDefinition\.[^<.]*<Pus142Model>$/,  // Pus142Model
  /^PusGroundModelDefinition\.[^<.]*<Pus144Model>$/,  // Pus144Model
  /^PusGroundModelDefinition\.[^<.]*<PusMmeModel>$/,  // PusMMEModel
  /^StatAggregationDefinition\.[^<.]*<StatAggregation>$/,  // supportedPus012Model
  /^StatValuesDefinition\.[^<.]*<StatValue>$/,  // StatValue
];

module.exports = function isParameterSupported(dataId) {
  const parameter = `${dataId.catalog}.${dataId.parameterName}<${dataId.comObject}>`;
  return supported.filter(pattern => parameter.match(pattern)).length > 0;
};
