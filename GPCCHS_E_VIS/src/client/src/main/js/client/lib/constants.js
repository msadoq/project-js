// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Refactor "patch action" decoration (patch in .meta)
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Change windowProcess health management to dispatch a Redux action directly.
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Fix server process lauching timeout issue in development
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only path for link definition
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Refactor DC error handling (direct dispatch from server)
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing info to meta action's
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Modify health monitoring mechanism : - Handle properly start and stop - Add critical delay value in conf - Only start monitoring on DEBUG
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Remove SAVE_PAGE ipc method .
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Remove health management obsolete code
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Replace ipc openPage by askOpenPage redux action
// VERSION : 1.1.2 : DM : #6700 : 20/07/2017 : Remove obsolete onServerDebug interface, ipcs and model
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about openInspector .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about FMD_GET/FMD_CREATE and RELOAD_SESSIONS/GET_SESSION_TIME
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about documents .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Remove serverDebug ipc . .
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : remove lastFrom0 from datamap add a test to keep the good interval in datamap
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : remove lower bound type from viewManager
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store folder in mainProcess
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 01/09/2017 : MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY now outputs ViewDoc as mime type instead of TextViewDoc, PlotViewDoc...
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 04/09/2017 : REVERT MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY now outputs ViewDoc as mime type instead of TextViewDoc, PlotViewDoc...
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : Page / Views / Workspace are saved with extensions.
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : New extensions. Updated extensions of data files, updated config.sample.json.
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Change EXTENSIONS constants . .
// END-HISTORY
// ====================================================================

module.exports = {
  // CHILD PROCESS ID
  CHILD_PROCESS_READY_MESSAGE_TYPE_KEY: 'CHILD_PROCESS_IS_READY',
  CHILD_PROCESS_SERVER: 1,
  CHILD_PROCESS_DC: 2,
  CHILD_PROCESS_CONVERTER: 3,
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
  MESSAGETYPE_ALARM_ACK: 26,
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
  HSC_CRITICAL_SWITCH_PAUSE_DELAY: 5e3, // 5s
  HSC_RENDERER_WARNING_STEP: 100,
  HSC_RENDERER_CRITICAL_STEP: 250,
  HSS_EVENTLOOP_WARNING_STEP: 10,
  HSS_EVENTLOOP_CRITICAL_STEP: 25,
  // STUB
  DC_STUB_FREQUENCY: 250,
  DC_STUB_MAX_SUBSCRIPTION_VALUES: 1,
  DC_STUB_VALUE_TIMESTEP: 1000,
  DC_STUB_VALUE_ALARMTIMESTEP: 100,
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
  IPC_METHOD_MASTER_SESSION: 14,
  IPC_METHOD_PRODUCT_LOG: 16,
  IPC_METHOD_WIKI_HELPER: 22,
  IPC_METHOD_RESOLVE_LINK: 24,
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
  // HEALTH INTERVAL VALUE
  HEALTH_INTERVAL_DELAY: 100,
  DEFAULT_HEALTH_CRITICAL_DELAY: 500,
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
    GroundAlarmView: 'GroundAlarmDoc',
    OnboardAlarmView: 'OnboardAlarmViewDoc',
  },
  EXTENSIONS: {
    WorkSpace: 'viws',
    Page: 'vipg',
    TextView: 'vitv',
    PlotView: 'vipv',
    DynamicView: 'vidv',
    MimicView: 'vimv',
    PacketView: 'vikv',
    HistoryView: 'vihv',
    GroundAlarmView: 'viga',
    OnboardAlarmView: 'viba',
  },
  DUMP_EXTENSIONS: {
    ARCHIVE: 'arc',
    PUB_SUB: 'pub',
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
  SORTING_ASC: 'SORTING_ASC',
  SORTING_DESC: 'SORTING_DESC',
  HISTORYVIEW_SEPARATOR: ' ',

  // Alarms
  ALARM_MODE_ALL: 0,
  ALARM_MODE_NONNOMINAL: 1,
  ALARM_MODE_TOACKNOWLEDGE: 2,

  ALARM_ACK_TIMEOUT: 10, // in seconds
  ALARM_ACKSTATE_ACQUITED: 'ACKNOWLEDGED',
  ALARM_ACKSTATE_REQUIREACK: 'REQUIRE ACKNOWLEDGE',
  ALARM_ACKSTATE_NOACK: 'NO ACKNOWLEDGE',
};
