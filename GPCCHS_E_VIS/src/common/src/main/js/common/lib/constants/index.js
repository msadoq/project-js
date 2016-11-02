module.exports = {
  // DATA STRUCTURE TYPES
  DATASTRUCTURETYPE_LAST: 'last',
  DATASTRUCTURETYPE_RANGE: 'range',
  // TIMING
  FLUSH_TO_HSC_FREQUENCY: 100,
  DC_STUB_FREQUENCY: 100,
  DC_STUB_MAX_SUBSCRIPTION_VALUES: 1,
  DC_STUB_VALUE_TIMESTEP: 1000,
  CACHE_INVALIDATION_FREQUENCY: 3e5,
  HSC_THROTTLE_REQUESTS: 100,
  HSC_THROTTLE_RENDER: 100,
  HSC_PLAY_FREQUENCY: 150,
  // TIMELINE TYPES
  TIMELINETYPE_SESSION: 'session',
  TIMELINETYPE_DATASET: 'dataSet',
  TIMELINETYPE_RECORDSET: 'recordSet',
  // SUBSCRIPTION STATES
  SUBSCRIPTIONSTATE_PLAY: 'play',
  SUBSCRIPTIONSTATE_PAUSE: 'pause',
  // FILTER TYPES
  FILTERTYPE_EQ: 0,
  FILTERTYPE_NE: 1,
  FILTERTYPE_LT: 2,
  FILTERTYPE_LE: 3,
  FILTERTYPE_GT: 4,
  FILTERTYPE_GE: 5,
  FILTERTYPE_CONTAINS: 6,
  FILTERTYPE_ICONTAINS: 7,
  // QUERY ARGS
  SORTORDER_ASC: 0,
  SORTORDER_DESC: 1,
  // ERROR TYPES
  ERRORTYPE_RESPONSE: 0,
  // EVENTS
  EVENT_IDENTITY: 'identity',
  EVENT_AUTHENTICATED: 'authenticated',
  EVENT_READY: 'ready',
  EVENT_ERROR: 'error',
  EVENT_VIMA_TIMEBAR_INIT: 'vimaTimebarInit',
  EVENT_TIMEBAR_UPDATE: 'timebarUpdate',
  EVENT_DOMAIN_QUERY: 'domainQuery',
  EVENT_DOMAIN_RESPONSE: 'domainResponse',
  EVENT_TIMEBASED_QUERY: 'timebasedQuery',
  EVENT_TIMEBASED_QUERY_INVALIDATION: 'timebasedQueryInvalidation',
  EVENT_TIMEBASED_DATA: 'timebasedData',
};
