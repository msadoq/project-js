const Action = require('./action');
const Boolean = require('./boolean');
const DataId = require('./dataId');
const DcStatus = require('./dcStatus');
const Domains = require('./domains');
const FMDCreateDocument = require('./fMDCreateDocument');
const FMDDocumentProperty = require('./fMDDocumentProperty');
const FMDFileInfo = require('./fMDFileInfo');
const FMDFileType = require('./fMDFileType');
const FMDGet = require('./fMDGet');
const Header = require('./header');
const QueryArguments = require('./queryArguments');
const SendLog = require('./sendLog');
const SessionGetTime = require('./sessionGetTime');
const Sessions = require('./sessions');
const Status = require('./status');
const String = require('./string');
const TimeInterval = require('./timeInterval');
const Timestamp = require('./timestamp');

module.exports = { // TODO .proto should be collocated with adapters
    Action : {type:"protobuf", adapter: Action},
    Boolean : {type:"protobuf", adapter: Boolean},
    DataId  : {type:"protobuf", adapter: DataId},
    DcStatus : {type:"protobuf", adapter: DcStatus},
    Domains : {type:"protobuf", adapter: Domains},
    FMDCreateDocument : {type:"protobuf", adapter: FMDCreateDocument},
    FMDDocumentProperty : {type:"protobuf", adapter: FMDDocumentProperty},
    FMDFileInfo : {type:"protobuf", adapter: FMDFileInfo},
    FMDFileType : {type:"protobuf", adapter: FMDFileType},
    FMDGet : {type:"protobuf", adapter: FMDGet},
    Header : {type:"protobuf", adapter: Header},
    QueryArguments : {type:"protobuf", adapter: QueryArguments},
    SendLog : {type:"protobuf", adapter: SendLog},
    SessionGetTime : {type:"protobuf", adapter: SessionGetTime},
    Sessions : {type:"protobuf", adapter: Sessions},
    Status : {type:"protobuf", adapter: Status},
    String : {type:"protobuf", adapter: String},
    TimeInterval : {type:"protobuf", adapter: TimeInterval},
    Timestamp : {type:"protobuf", adapter: Timestamp},
  };
