module.exports = {
  // DATA STRUCTURE TYPES
  DATASTRUCTURETYPE_LAST: 'last',
  DATASTRUCTURETYPE_RANGE: 'range',
  // MESSAGE TYPES
  MESSAGETYPE_DOMAIN_QUERY: 0,
  MESSAGETYPE_TIMEBASED_QUERY: 1,
  MESSAGETYPE_TIMEBASED_SUBSCRIPTION: 2,
  MESSAGETYPE_RESPONSE: 3,
  MESSAGETYPE_DOMAIN_DATA: 4,
  MESSAGETYPE_TIMEBASED_ARCHIVE_DATA: 5,
  MESSAGETYPE_TIMEBASED_PUBSUB_DATA: 6,
  // SUBSCRIPTION ACTIONS
  SUBSCRIPTIONACTION_ADD: 0,
  SUBSCRIPTIONACTION_DELETE: 1,
  // STATUS
  STATUS_SUCCESS: 0,
  STATUS_ERROR: 1,
  // GETLAST TYPES
  GETLASTTYPE_GET_LAST: 0,
  GETLASTTYPE_GET_N_LAST: 1,
  // TIMING
  HSC_PULL_FREQUENCY: 333,
  HSC_THROTTLE_REQUESTS: 333,
  HSC_PLAY_FREQUENCY: 333,
  CACHE_INVALIDATION_FREQUENCY: 3e5,
  // STUB
  DC_STUB_FREQUENCY: 250,
  DC_STUB_MAX_SUBSCRIPTION_VALUES: 1,
  DC_STUB_VALUE_TIMESTEP: 1000,
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
  EVENT_PULL: 'pull',
  EVENT_ERROR: 'error',
  EVENT_DOMAIN_QUERY: 'domainQuery',
  EVENT_DOMAIN_RESPONSE: 'domainResponse',
  EVENT_TIMEBASED_QUERY: 'timebasedQuery',
  EVENT_TIMEBASED_QUERY_INVALIDATION: 'timebasedQueryInvalidation',
  EVENT_TIMEBASED_DATA: 'timebasedData',
};