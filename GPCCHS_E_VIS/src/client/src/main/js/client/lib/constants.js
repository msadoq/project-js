// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Refactor "patch action" decoration (patch in .meta)
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Change windowProcess health management to dispatch a
//  Redux action directly.
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Fix server process lauching timeout issue in
//  development
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only
//  path for link definition
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Refactor DC error handling (direct dispatch from
//  server)
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing info to meta action's
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Modify health monitoring mechanism : - Handle
//  properly start and stop - Add critical delay value in conf - Only start monitoring on DEBUG
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Remove SAVE_PAGE ipc method .
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each
//  process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Remove health management obsolete code
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Replace ipc openPage by askOpenPage redux
//  action
// VERSION : 1.1.2 : DM : #6700 : 20/07/2017 : Remove obsolete onServerDebug interface, ipcs and
//  model
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about openInspector .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about FMD_GET/FMD_CREATE and
//  RELOAD_SESSIONS/GET_SESSION_TIME
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about documents .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Remove serverDebug ipc . .
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : remove lastFrom0 from datamap add a test to keep the
//  good interval in datamap
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : remove lower bound type from viewManager
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store
//  folder in mainProcess
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 01/09/2017 : MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY now
//  outputs ViewDoc as mime type instead of TextViewDoc, PlotViewDoc...
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 04/09/2017 : REVERT MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY
//  now outputs ViewDoc as mime type instead of TextViewDoc, PlotViewDoc...
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : Page / Views / Workspace are saved with
//  extensions.
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : New extensions. Updated extensions of data
//  files, updated config.sample.json.
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Change EXTENSIONS constants . .
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update server process and data injection for alarms
// VERSION : 2.0.0 : DM : #6127 : 02/10/2017 : Add GroundAlarmView and onBoardAlarView extensions
//  in constants
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// VERSION : 2.0.0 : DM : #5806 : 20/10/2017 : Merge branch jmaupeti_alarmstub into dev
// VERSION : 2.0.0 : DM : #5806 : 26/10/2017 : Add GMA prefix to all GroundMonitoringAlarm
//  constants
// VERSION : 2.0.0 : DM : #5806 : 02/11/2017 : Remove code about non nominal alarms in OBA
// VERSION : 2.0.0 : DM : #5806 : 03/11/2017 : Manage ackrequests in stub .
// VERSION : 2.0.0 : DM : #5806 : 07/11/2017 : refacto for getpaiload for alarms
// VERSION : 2.0.0 : DM : #6832 : 07/11/2017 : Add ALARM_ACK_TIMEOUT in lib/constants .
// VERSION : 2.0.0 : DM : #9217 : 13/11/2017 : Add extensions for dump buffer
// VERSION : 2.0.0 : DM : #5806 : 13/11/2017 : Pass mode into archive query (GMA/OBA)
// VERSION : 2.0.0 : DM : #5806 : 14/11/2017 : Merge branch 'alarm_5806' into dev
// VERSION : 2.0.0 : DM : #5806 : 27/11/2017 : Remove specific GMA and OBA ALARM_ACKSTATE
// VERSION : 2.0.0 : DM : #5806 : 27/11/2017 : Remove specific GMA and OBA ALARM_MODE
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 30/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism
// VERSION : 2.0.0 : FA : #10835 : 23/02/2018 : head color on views depends on domains
// VERSION : 2.0.0 : FA : #10835 : 28/02/2018 : add global configuration for colors
// VERSION : 2.0.0 : FA : #11346 : 16/03/2018 : Change type mime for onboard and ground view
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0.2 : FA : #11854 : 18/04/2018 : Vima JS does not receive PUB/SUB data
// VERSION : 2.0.0.3 : FA : ISIS-FT-3105 : 04/05/2018 : Add RM field in provider
// VERSION : 2.0.0.3 : FA : ISIS-FT-2238 : 22/05/2018 : drag drop paquet dans dynamicView VIMA
// VERSION : 2.0.0.3 : FA : ISIS-FT-2238 : 30/05/2018 : drag drop paquet dans dynamicView VIMA
// VERSION : 2.0.0.3 : FA : ISIS-FT-3105 : 30/05/2018 : Add RM field in provider
// END-HISTORY
// ====================================================================

module.exports = {
  // CHILD PROCESS ID
  CHILD_PROCESS_READY_MESSAGE_TYPE_KEY: 'CHILD_PROCESS_IS_READY',
  CHILD_PROCESS_SERVER: 1,
  CHILD_PROCESS_DC: 2,
  CHILD_PROCESS_CONVERTER: 3,
  CHILD_PROCESS_PUS: 4,
  // DATA STRUCTURE TYPES
  DATASTRUCTURETYPE_LAST: 'last',
  DATASTRUCTURETYPE_RANGE: 'range',
  DATASTRUCTURETYPE_PUS: 'pus',
  // SESSION_ID
  UNKNOWN_SESSION_ID: 65535,
  // DC_COMMUNICATION_VERSION,
  DC_COM_V1: 'DC_COM_V1',
  DC_COM_V2: 'DC_COM_V2', // (ADE)
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
  // METHOD TYPE ADE
  ADE_DOMAIN_QUERY: 0,
  ADE_TIMEBASED_QUERY: 1,
  ADE_TIMEBASED_SUBSCRIPTION: 2,
  ADE_SESSION: 3,
  ADE_SESSION_TIME: 4,
  ADE_LOG: 5,
  ADE_FMD_GET: 6,
  ADE_FMD_CREATE: 7,
  ADE_FMD_CREATE_DOCUMENT: 8,
  ADE_SESSION_MASTER: 9,
  ADE_DC_STATUS: 10,
  ADE_TIMEOUT: 11,
  ADE_SESSION_UPDATE: 12,
  ADE_ALARM_ACK: 13,
  ADE_ALARM_ACK_DATA: 14,
  ADE_SDB_QUERY: 15,
  // SDB METHOD ADE
  ADE_SDB_RETRIEVE_CATALOGS: 0,
  ADE_SDB_RETRIEVE_CATALOG_ITEMS: 1,
  ADE_SDB_RETRIEVE_CATALOG_ITEM_COMOBJECT: 2,
  ADE_SDB_RETRIEVE_CATALOG_ITEM_FIELD_UNIT: 3,
  ADE_SDB_RETRIEVE_CATALOG_ITEM_EXISTS: 4,
  ADE_SDB_RETRIEVE_SATELLITE_ITEMS: 5,
  ADE_SDB_RETRIEVE_CATALOG_ITEM_STRUCTURE: 6, // not used yet
  ADE_SDB_RETRIEVE_APIDS: 7,
  ADE_SDB_RETRIEVE_CATALOG_ITEM_METADATA: 8,
  ADE_SDB_RETRIEVE_REPORTING_ITEM_PACKETS: 9,
  // FILE
  // PUS METHOD IPC
  PUS_SUBSCRIBE: 1,
  PUS_UNSUBSCRIBE: 2,
  PUS_INITIALIZE: 3,
  PUS_RESET: 4,
  PUS_DATA: 5,
  PUS_COMPARE: 6,
  PUS_ON_SYNCHRONISE: 7,
  // FILE TYPE
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
  PUS_STUB_VALUE_TIMESTEP: 20000,
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
  IPC_METHOD_SINGLETON_PATCH: 103,
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
  // PACKETS TYPES
  PACKETS_TYPES: {
    REPORTING_PARAMETER: 'ReportingParameter',
    DECOMMUTED_PACKET: 'DecommutedPacket',
    CLCW: 'CLCW',
    ISIS_AGGREGATION: 'IsisAggregation',
    RM: 'RM',
    TM: 'TM',
  },
  // MIME
  MIME_TYPES: {
    WorkSpace: 'WorkspaceDoc',
    Page: 'PageDoc',
    TextView: 'TextViewDoc',
    PlotView: 'PlotViewDoc',
    DynamicView: 'DynamicViewDoc',
    DecommutedPacketView: 'DecommutedPacketViewDoc',
    MimicView: 'MimicViewDoc',
    PacketView: 'PacketViewDoc',
    HistoryView: 'HistoryViewDoc',
    GroundAlarmView: 'GrounAlarmViewDoc',
    OnboardAlarmView: 'OnBoardAlarmViewDoc',
    CommaSeparatedValues: 'CommaSeparatedValues',
    PortableNetworkGraphics: 'PortableNetworkGraphics',
    ScalableVectorGraphics: 'ScalableVectorGraphics',
    PUS03View: 'PUS03ViewDoc',
    PUS05View: 'PUS05ViewDoc',
    PUS11View: 'PUS11ViewDoc',
    PUS12View: 'PUS12ViewDoc',
    PUS13View: 'PUS13ViewDoc',
    PUS14View: 'PUS14ViewDoc',
    PUS15View: 'PUS15ViewDoc',
    PUS18View: 'PUS18ViewDoc',
    PUS19View: 'PUS19ViewDoc',
    PUS140View: 'PUS140ViewDoc',
    PUS142View: 'PUS142ViewDoc',
    PUS144View: 'PUS144ViewDoc',
    PUSMMEView: 'PUSMMEViewDoc',
  },
  EXTENSIONS: {
    WorkSpace: 'viws',
    Page: 'vipg',
    TextView: 'vitv',
    PlotView: 'vipv',
    DynamicView: 'vidv',
    DecommutedPacketView: 'vidp',
    MimicView: 'vimv',
    PacketView: 'vikv',
    HistoryView: 'vihv',
    GroundAlarmView: 'viga',
    OnboardAlarmView: 'viba',
    CommaSeparatedValues: 'csv',
    PortableNetworkGraphics: 'png',
    ScalableVectorGraphics: 'svg',
    PUS03View: 'pus03',
    PUS05View: 'pus05',
    PUS11View: 'pus11',
    PUS12View: 'pus12',
    PUS13View: 'pus13',
    PUS14View: 'pus14',
    PUS15View: 'pus15',
    PUS18View: 'pus18',
    PUS19View: 'pus19',
    PUS140View: 'pus140',
    PUS142View: 'pus142',
    PUS144View: 'pus144',
    PUSMMEView: 'pusmme',
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

  ALARM_TYPE_NOMINAL: 'nominal',

  // Providers
  PROVIDER_FLOW_HKTMR: 'HKTMR',
  PROVIDER_FLOW_HKTMP: 'HKTMP',
  PROVIDER_FLOW_RM: 'RM',
  PROVIDER_FLOW_ALL: '*',

  // Code couleur for views
  COLOR_ISIS_SAT: '#0066ff',
  COLOR_SIMUPUS_SAT: '#339933',
  COLOR_MULTIPLE_SAT: '#ff3300',

  // list of domains
  DOMAIN_SIMUPUS: 'fr.cnes.isis.simupus',
  DOMAIN_ISIS: 'fr.cnes.isis',

  // time format
  DATETIME_TILL_MS_FORMAT: 'DD/MM/YYYY HH:mm:ss.SSS',
  DATE_FORMAT_TAI: 'YYYY-MM-DDTHH:mm:ss.SSS',

  // Input, output separators
  CSV_COLUMN_SEPARATOR: '; ',
  CSV_ROW_SEPARATOR: '\n',

  // nominal value for significant data
  SIGNIFICANT_VALIDITY_STATE_VALUE: 2,
  SIGNIFICANT_VALIDITY_STATE_STRING_VALUE: 'VALID',

  // list of view's type for search
  SEARCH_VIEWS_TYPE: ['TextView', 'PlotView', 'MimicView', 'HistoryView'],

  // list of prefix cacheIds
  PREFIX_KNOWN_RANGES: 'knownRanges',
  PREFIX_OBSOLETE_EVENTS: 'ObsoleteEvents',
  PREFIX_LASTS: 'lasts',
  PREFIX_PUS_MODELS: 'pusModels',
  PREFIX_PUS_DELTAS: 'pusDeltas',
  PREFIX_PUS: 'pus',
  PREFIX_SAMPLING: 'sampling',

  // list of editor data type
  Pus005ModelType: 1,
  Pus005OnBoardEventType: 2,
  Pus011CommandType: 3,
  Pus011ModelType: 4,
  Pus011SubScheduleType: 5,
  Pus012ModelType: 6,
  Pus012ParameterMonitoringDefinitionType: 7,
  Pus013DownlinkLDTType: 8,
  Pus013ModelType: 9,
  Pus013UplinkLDTType: 10,
  Pus014ForwardedPacketType: 11,
  Pus014ModelType: 12,
  Pus015ModelType: 13,
  Pus015PacketStoreType: 14,
  Pus018ModelType: 15,
  Pus018ObcpType: 16,
  Pus019EventActionType: 17,
  Pus019ModelType: 18,
  Pus140ModelType: 19,
  Pus140ParameterType: 20,
  Pus142FunctionalMonitoringType: 21,
  Pus142ModelType: 22,
  Pus144ModelType: 23,
  Pus144OnBoardFileType: 24,
  PusMmeModelType: 25,
  PusMmePacketType: 26,
  Pus011ApidType: 27,


  // list of key for deltas
  PUS005_ON_BOARD_EVENT: 'pus005OnBoardEvent',
  PUS011_APID: 'pus011Apid',
  PUS011_COMMAND: 'pus011Command',
  PUS011_SUB_SCHEDULE: 'pus011SubSchedule',
  PUS012_PARAMETER_MONITORING_DEFINITION: 'pus012ParameterMonitoringDefinition',
  PUS013_LDT_PART: 'pUS013LdtPart',
  PUS014_TM_PACKET: 'pus014TmPacket',
  PUS015_PACKET_STORE: 'pus015PacketStore',
  PUS018_OBCP: 'pus018Obcp',
  PUS019_EVENT_ACTION: 'pus19EventAction',
  PUS140_PARAMETER: 'pus140Parameter',
  PUS142_FUNCTIONAL_MONITORING: 'pus142FunctionalMonitoring',
  PUS144_ON_BOARD_FILES: 'pus144OnboardFiles',
  PUSMME_PACKET: 'pusMmePacket',

  // list of pus service
  PUS_SERVICE_05: 5,
  PUS_SERVICE_11: 11,
  PUS_SERVICE_12: 12,
  PUS_SERVICE_13: 13,
  PUS_SERVICE_14: 14,
  PUS_SERVICE_15: 15,
  PUS_SERVICE_18: 18,
  PUS_SERVICE_19: 19,
  PUS_SERVICE_140: 140,
  PUS_SERVICE_142: 142,
  PUS_SERVICE_144: 144,
  PUS_SERVICE_MME: 999,

  // for PUS MME AND 140
  // wildcard for all apids
  PUS_ALL_APIDS: 65535,

  // Status by delta type for deltas
  pus005OnBoardEventStatusKey: 'onBoardStatus',
  pus011CommandStatusKey: 'commandStatus',
  pus011SubScheduleStatusKey: 'status',
  pus012ParameterMonitoringDefinitionStatusKey: 'monitoringStatus',
  pUS013LdtPartStatusKey: 'status',
  pus014TmPacketStatusKey: 'status',
  pus015PacketStoreStatusKey: 'storeStatus',
  pus018ObcpStatusKey: 'obcpStatus',
  pus19EventActionStatusKey: 'actionStatus',
  pus140ParameterStatusKey: 'status',
  pus142FunctionalMonitoringStatusKey: 'status',
  pus144OnboardFilesStatusKey: 'status',
  pusMmePacketStatusKey: 'status',
};
