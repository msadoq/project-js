module.exports = {
  // CHILD PROCESS ID
  CHILD_PROCESS_READY_MESSAGE_TYPE_KEY: 'CHILD_PROCESS_IS_READY',
  CHILD_PROCESS_SERVER: 1,
  CHILD_PROCESS_DC: 2,
  // DATA STRUCTURE TYPES
  DATASTRUCTURETYPE_LAST: 'last',
  DATASTRUCTURETYPE_RANGE: 'range',
  // SESSION_ID
  UNKNOWN_SESSION_ID: 65535,
  // MESSAGE TYPES
  MESSAGETYPE_DOMAIN_QUERY: 0,
  MESSAGETYPE_TIMEBASED_QUERY: 1,
  MESSAGETYPE_TIMEBASED_SUBSCRIPTION: 2,
  MESSAGETYPE_RESPONSE: 3,
  MESSAGETYPE_DOMAIN_DATA: 4,
  MESSAGETYPE_TIMEBASED_ARCHIVE_DATA: 5,
  MESSAGETYPE_TIMEBASED_PUBSUB_DATA: 6,
  MESSAGETYPE_SESSION_QUERY: 7,
  MESSAGETYPE_SESSION_DATA: 8,
  MESSAGETYPE_SESSION_TIME_QUERY: 9,
  MESSAGETYPE_SESSION_TIME_DATA: 10,
  MESSAGETYPE_LOG_SEND: 12,
  MESSAGETYPE_FMD_GET_QUERY: 13,
  MESSAGETYPE_FMD_GET_DATA: 14,
  MESSAGETYPE_FMD_CREATE_QUERY: 15,
  MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY: 16,
  MESSAGETYPE_FMD_CREATE_DATA: 17,
  MESSAGETYPE_SESSION_MASTER_QUERY: 18,
  MESSAGETYPE_SESSION_MASTER_DATA: 19,
  MESSAGETYPE_DC_STATUS_QUERY: 20,
  MESSAGETYPE_DC_STATUS_DATA: 21,
  FILE_TYPE_COLLECTION: 0,
  FILE_TYPE_COLLECTION_DOCUMENT: 1,
  FILE_TYPE_DOCUMENT: 2,
  FILE_TYPE_FOLDER: 3,
  // SUBSCRIPTION ACTIONS
  SUBSCRIPTIONACTION_ADD: 0,
  SUBSCRIPTIONACTION_DELETE: 1,
  // STATUS
  STATUS_SUCCESS: 0,
  STATUS_ERROR: 1,
  // GETLAST TYPES
  GETLASTTYPE_GET_LAST: 0,
  GETLASTTYPE_GET_N_LAST: 1,
  // TIMING (ms)
  RTE_SESSIONS_REQUEST_LAUNCHING_TIMEOUT: 5e3, // 5s
  SERVER_PROCESS_LAUNCHING_TIMEOUT: 3e4, // 30s
  HSC_ORCHESTRATION_WARNING_STEP: 100,
  HSC_ORCHESTRATION_CRITICAL_STEP: 250,
  HSC_CRITICAL_SWITCH_PAUSE_DELAY: 5e3, // 5s
  HSC_RENDERER_WARNING_STEP: 100,
  HSC_RENDERER_CRITICAL_STEP: 250,
  HSS_EVENTLOOP_WARNING_STEP: 10,
  HSS_EVENTLOOP_CRITICAL_STEP: 25,
  HSC_PUBSUB_MONITORING_FREQUENCY: 5e3, // 5s
  // STUB
  DC_STUB_FREQUENCY: 250,
  DC_STUB_MAX_SUBSCRIPTION_VALUES: 1,
  DC_STUB_VALUE_TIMESTEP: 1000,
  // TIMELINE TYPES
  TIMELINETYPE_SESSION: 'session',
  TIMELINETYPE_DATASET: 'dataSet',
  TIMELINETYPE_RECORDSET: 'recordSet',
  // SUBSCRIPTION STATES
  HSC_PLAY_STATE: 'play',
  HSC_PAUSE_STATE: 'pause',
  // FILTER TYPES
  FILTERTYPE_EQ: 0,
  FILTERTYPE_NE: 1,
  FILTERTYPE_LT: 2,
  FILTERTYPE_LE: 3,
  FILTERTYPE_GT: 4,
  FILTERTYPE_GE: 5,
  FILTERTYPE_CONTAINS: 6,
  FILTERTYPE_ICONTAINS: 7,
  // FMD FILE TYPES
  FMDFILETYPE_COLLECTION: 0,
  FMDFILETYPE_COLLECTION_DOCUMENT: 1,
  FMDFILETYPE_DOCUMENT: 2,
  FMDFILETYPE_FOLDER: 3,
  // QUERY ARGS
  SORTORDER_ASC: 0,
  SORTORDER_DESC: 1,
  // ERROR TYPES
  ERRORTYPE_RESPONSE: 0,
  // MODELS
  COLLECTION_TIMEBASED_DATA_PREFIX: 'timebasedData',
  COLLECTION_CONNECTED_DATA_PREFIX: 'connectedData',
  COLLECTION_SUBSCRIPTIONS_PREFIX: 'subscriptions',
  // IPC MESSAGE TYPES
  IPC_RPC_REQUEST: 0,
  IPC_RPC_RESPONSE: 1,
  IPC_MESSAGE: 2,
  // IPC MESSAGE NAMES
  IPC_METHOD_REDUX_CURRENT_STATE: 100,
  IPC_METHOD_REDUX_DISPATCH: 101,
  IPC_METHOD_REDUX_PATCH: 102,
  IPC_METHOD_DOMAINS_REQUEST: 0,
  IPC_METHOD_SESSIONS_REQUEST: 1,
  IPC_METHOD_TIMEBASED_QUERY: 2,
  IPC_METHOD_TIMEBASED_PULL: 3,
  IPC_METHOD_CACHE_CLEANUP: 5,
  IPC_METHOD_SESSION_TIME: 6, // warn! used for two message in two different IPC
  IPC_METHOD_RELOAD_SESSIONS: 7,
  IPC_METHOD_RELOAD_VIEW: 8,
  IPC_METHOD_SAVE_VIEW: 9,
  IPC_METHOD_ERROR: 10,
  IPC_METHOD_SERVER_DEBUG: 11, // warn! used for two message in two different IPC
  IPC_METHOD_FMD_GET: 12,
  IPC_METHOD_FMD_CREATE: 13,
  IPC_METHOD_MASTER_SESSION: 14,
  IPC_METHOD_CREATE_MODEL: 15,
  IPC_METHOD_PRODUCT_LOG: 16,
  IPC_METHOD_OPEN_VIEW: 17,
  IPC_METHOD_OPEN_PAGE: 18,
  IPC_METHOD_OPEN_WORKSPACE: 19,
  IPC_METHOD_HEALTH_PULL: 21,
  IPC_METHOD_WIKI_HELPER: 22,
  IPC_METHOD_OPEN_INSPECTOR: 23,
  IPC_METHOD_RESOLVE_LINK: 24,
  IPC_METHOD_SAVE_PAGE: 26,
  IPC_METHOD_GET_RTE_DOMAINS: 27,
  IPC_METHOD_GET_RTE_CATALOGS: 28,
  IPC_METHOD_GET_RTE_ITEM_NAMES: 29,
  IPC_METHOD_OPEN_RTE_ITEM: 30,
  IPC_METHOD_FOCUS_RTE_ITEM: 31,
  IPC_METHOD_RESOLVE_RTE_LINK: 32,
  // DIST LOG UIDS
  LOG_APPLICATION_START: 6502,
  LOG_APPLICATION_STOP: 6503,
  LOG_APPLICATION_ERROR: 6504,
  LOG_DOCUMENT_OPEN: 6505,
  LOG_DOCUMENT_SAVE: 6506,
  LOG_APPLICATION_OVERLOADED: 6507,
  // DC STATUS
  TBD_HEALTHY: 0,
  TBD_UNRESPONSIVE: 1,
  TBD_DEAD: 2,
  // DC QUEUE
  DC_EMPTY_QUEUE: 0,
  DC_QUEUE_MAX_SIZE: 1000,
  // HEALTH STATUS
  HEALTH_STATUS_HEALTHY: 'HEALTHY',
  HEALTH_STATUS_WARNING: 'WARNING',
  HEALTH_STATUS_CRITICAL: 'CRITICAL',
  // NODE_TYPES
  NODE_TYPE_ARRAY: 'array',
  NODE_TYPE_OBJECT: 'object',
  NODE_TYPE_ARRAY_ITEM: 'arrayItem',
  NODE_TYPE_OBJECT_ITEM: 'objectItem',
  NODE_TYPE_ITEM: 'item',
  NODE_TYPE_KEY: 'key',
  NODE_TYPE_LINK: 'link',
  NODE_TYPE_RESOLVED_LINK: 'resolvedLink',
  // MIME
  MIME_TYPES: {
    WorkSpace: 'WorkspaceDoc',
    Page: 'PageDoc',
    TextView: 'TextViewDoc',
    PlotView: 'PlotViewDoc',
    DynamicView: 'DynamicViewDoc',
    MimicView: 'MimicViewDoc',
    PacketView: 'PacketViewDoc',
    HistoryView: 'HistoryViewDoc',
  },
  // REDUX SYNCHRONIZATION
  REDUX_SYNCHRONIZATION_PATCH_KEY: 'patch',
  TIMING_DATA: 'timing',
  TIMING_MILESTONES: {
    SEND_UP: 'sendUpFrom',
    BEFORE_SERVER_STORE_UPDATE: 'beforeServerStoreUpdate',
    AFTER_SERVER_STORE_UPDATE: 'afterServerStoreUpdate',
    BEFORE_STORE_UPDATE: 'beforeStoreUpdate_',
    AFTER_STORE_UPDATE: 'afterStoreUpdate_',
  },
  COMPUTED_TIMING_DATA: 'computedTiming',
};
