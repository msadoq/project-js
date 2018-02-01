// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const bLOB = require('../ccsds_mal/bLOB');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uOCTET = require('../ccsds_mal/uOCTET');
const uSHORT = require('../ccsds_mal/uSHORT');

const LOGBOOKEVENTDEFINITIONNAME_SIZE = 64;
const LOGBOOKEVENTDEFINITIONNAME_OFFSET = 0;
const OBJECTTYPEAREA_SIZE = 2;
const OBJECTTYPEAREA_OFFSET = LOGBOOKEVENTDEFINITIONNAME_OFFSET + LOGBOOKEVENTDEFINITIONNAME_SIZE;
const OBJECTTYPESERVICE_SIZE = 2;
const OBJECTTYPESERVICE_OFFSET = OBJECTTYPEAREA_OFFSET + OBJECTTYPEAREA_SIZE;
const OBJECTTYPENUMBER_SIZE = 2;
const OBJECTTYPENUMBER_OFFSET = OBJECTTYPESERVICE_OFFSET + OBJECTTYPESERVICE_SIZE;
const OBJECTTYPEVERSION_SIZE = 1;
const OBJECTTYPEVERSION_OFFSET = OBJECTTYPENUMBER_OFFSET + OBJECTTYPENUMBER_SIZE;
const CHANNELS_SIZE = 1;
const CHANNELS_OFFSET = OBJECTTYPEVERSION_OFFSET + OBJECTTYPEVERSION_SIZE;
const LEVEL_SIZE = 1;
const LEVEL_OFFSET = CHANNELS_OFFSET + CHANNELS_SIZE;
const CRITICITY_SIZE = 16;
const CRITICITY_OFFSET = LEVEL_OFFSET + LEVEL_SIZE;
const AUTHID_SIZE = 4;
const AUTHID_OFFSET = CRITICITY_OFFSET + CRITICITY_SIZE;
const USERNAME_SIZE = 128;
const USERNAME_OFFSET = AUTHID_OFFSET + AUTHID_SIZE;
const USERPROFILEID_SIZE = 2;
const USERPROFILEID_OFFSET = USERNAME_OFFSET + USERNAME_SIZE;
const USERPROFILENAME_SIZE = 64;
const USERPROFILENAME_OFFSET = USERPROFILEID_OFFSET + USERPROFILEID_SIZE;
const PATTERN_SIZE = 1024;
const PATTERN_OFFSET = USERPROFILENAME_OFFSET + USERPROFILENAME_SIZE;
const SYSTEMDATE_SIZE = 8;
const SYSTEMDATE_OFFSET = PATTERN_OFFSET + PATTERN_SIZE;
const SPECIFICATTRIBUTES_SIZE = 128;
const SPECIFICATTRIBUTES_OFFSET = SYSTEMDATE_OFFSET + SYSTEMDATE_SIZE;
const EVENTDATE_SIZE = 8;
const EVENTDATE_OFFSET = SPECIFICATTRIBUTES_OFFSET + SPECIFICATTRIBUTES_SIZE;
const MISSION_SIZE = 64;
const MISSION_OFFSET = EVENTDATE_OFFSET + EVENTDATE_SIZE;
const SATELLITE_SIZE = 1;
const SATELLITE_OFFSET = MISSION_OFFSET + MISSION_SIZE;
const PROVIDERID_SIZE = 2;
const PROVIDERID_OFFSET = SATELLITE_OFFSET + SATELLITE_SIZE;
const PROVIDERNAME_SIZE = 64;
const PROVIDERNAME_OFFSET = PROVIDERID_OFFSET + PROVIDERID_SIZE;
const SOURCE_SIZE = 64;
const SOURCE_OFFSET = PROVIDERNAME_OFFSET + PROVIDERNAME_SIZE;
const SERVICE_SIZE = 128;
const SERVICE_OFFSET = SOURCE_OFFSET + SOURCE_SIZE;
const SESSIONID_SIZE = 2;
const SESSIONID_OFFSET = SERVICE_OFFSET + SERVICE_SIZE;
const SESSIONNAME_SIZE = 64;
const SESSIONNAME_OFFSET = SESSIONID_OFFSET + SESSIONID_SIZE;
const SLOTID_SIZE = 2;
const SLOTID_OFFSET = SESSIONNAME_OFFSET + SESSIONNAME_SIZE;
const DOMAINID_SIZE = 2;
const DOMAINID_OFFSET = SLOTID_OFFSET + SLOTID_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const log = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    sTRING.encodeRaw(data.logBookEventDefinitionName, log, LOGBOOKEVENTDEFINITIONNAME_OFFSET + offset, LOGBOOKEVENTDEFINITIONNAME_SIZE);
    uSHORT.encodeRaw(data.objectTypeArea, log, OBJECTTYPEAREA_OFFSET + offset, OBJECTTYPEAREA_SIZE);
    uSHORT.encodeRaw(data.objectTypeService, log, OBJECTTYPESERVICE_OFFSET + offset, OBJECTTYPESERVICE_SIZE);
    uSHORT.encodeRaw(data.objectTypeNumber, log, OBJECTTYPENUMBER_OFFSET + offset, OBJECTTYPENUMBER_SIZE);
    uOCTET.encodeRaw(data.objectTypeVersion, log, OBJECTTYPEVERSION_OFFSET + offset, OBJECTTYPEVERSION_SIZE);
    uOCTET.encodeRaw(data.channels, log, CHANNELS_OFFSET + offset, CHANNELS_SIZE);
    uOCTET.encodeRaw(data.level, log, LEVEL_OFFSET + offset, LEVEL_SIZE);
    sTRING.encodeRaw(data.criticity, log, CRITICITY_OFFSET + offset, CRITICITY_SIZE);
    bLOB.encodeRaw(data.authId, log, AUTHID_OFFSET + offset, AUTHID_SIZE);
    sTRING.encodeRaw(data.userName, log, USERNAME_OFFSET + offset, USERNAME_SIZE);
    uSHORT.encodeRaw(data.userProfileId, log, USERPROFILEID_OFFSET + offset, USERPROFILEID_SIZE);
    sTRING.encodeRaw(data.userProfileName, log, USERPROFILENAME_OFFSET + offset, USERPROFILENAME_SIZE);
    sTRING.encodeRaw(data.pattern, log, PATTERN_OFFSET + offset, PATTERN_SIZE);
    tIME.encodeRaw(data.systemDate, log, SYSTEMDATE_OFFSET + offset, SYSTEMDATE_SIZE);
    sTRING.encodeRaw(data.specificAttributes, log, SPECIFICATTRIBUTES_OFFSET + offset, SPECIFICATTRIBUTES_SIZE);
    tIME.encodeRaw(data.eventDate, log, EVENTDATE_OFFSET + offset, EVENTDATE_SIZE);
    sTRING.encodeRaw(data.mission, log, MISSION_OFFSET + offset, MISSION_SIZE);
    uOCTET.encodeRaw(data.satellite, log, SATELLITE_OFFSET + offset, SATELLITE_SIZE);
    uSHORT.encodeRaw(data.providerId, log, PROVIDERID_OFFSET + offset, PROVIDERID_SIZE);
    sTRING.encodeRaw(data.providerName, log, PROVIDERNAME_OFFSET + offset, PROVIDERNAME_SIZE);
    sTRING.encodeRaw(data.source, log, SOURCE_OFFSET + offset, SOURCE_SIZE);
    sTRING.encodeRaw(data.service, log, SERVICE_OFFSET + offset, SERVICE_SIZE);
    uSHORT.encodeRaw(data.sessionId, log, SESSIONID_OFFSET + offset, SESSIONID_SIZE);
    sTRING.encodeRaw(data.sessionName, log, SESSIONNAME_OFFSET + offset, SESSIONNAME_SIZE);
    uSHORT.encodeRaw(data.slotId, log, SLOTID_OFFSET + offset, SLOTID_SIZE);
    uSHORT.encodeRaw(data.domainId, log, DOMAINID_OFFSET + offset, DOMAINID_SIZE);
    return log.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const log = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    log.logBookEventDefinitionName = sTRING.decodeRaw(null, bufferedData, LOGBOOKEVENTDEFINITIONNAME_OFFSET + offset, LOGBOOKEVENTDEFINITIONNAME_SIZE);
    log.objectTypeArea = uSHORT.decodeRaw(null, bufferedData, OBJECTTYPEAREA_OFFSET + offset, OBJECTTYPEAREA_SIZE);
    log.objectTypeService = uSHORT.decodeRaw(null, bufferedData, OBJECTTYPESERVICE_OFFSET + offset, OBJECTTYPESERVICE_SIZE);
    log.objectTypeNumber = uSHORT.decodeRaw(null, bufferedData, OBJECTTYPENUMBER_OFFSET + offset, OBJECTTYPENUMBER_SIZE);
    log.objectTypeVersion = uOCTET.decodeRaw(null, bufferedData, OBJECTTYPEVERSION_OFFSET + offset, OBJECTTYPEVERSION_SIZE);
    log.channels = uOCTET.decodeRaw(null, bufferedData, CHANNELS_OFFSET + offset, CHANNELS_SIZE);
    log.level = uOCTET.decodeRaw(null, bufferedData, LEVEL_OFFSET + offset, LEVEL_SIZE);
    log.criticity = sTRING.decodeRaw(null, bufferedData, CRITICITY_OFFSET + offset, CRITICITY_SIZE);
    log.authId = bLOB.decodeRaw(null, bufferedData, AUTHID_OFFSET + offset, AUTHID_SIZE);
    log.userName = sTRING.decodeRaw(null, bufferedData, USERNAME_OFFSET + offset, USERNAME_SIZE);
    log.userProfileId = uSHORT.decodeRaw(null, bufferedData, USERPROFILEID_OFFSET + offset, USERPROFILEID_SIZE);
    log.userProfileName = sTRING.decodeRaw(null, bufferedData, USERPROFILENAME_OFFSET + offset, USERPROFILENAME_SIZE);
    log.pattern = sTRING.decodeRaw(null, bufferedData, PATTERN_OFFSET + offset, PATTERN_SIZE);
    log.systemDate = tIME.decodeRaw(null, bufferedData, SYSTEMDATE_OFFSET + offset, SYSTEMDATE_SIZE);
    log.specificAttributes = sTRING.decodeRaw(null, bufferedData, SPECIFICATTRIBUTES_OFFSET + offset, SPECIFICATTRIBUTES_SIZE);
    log.eventDate = tIME.decodeRaw(null, bufferedData, EVENTDATE_OFFSET + offset, EVENTDATE_SIZE);
    log.mission = sTRING.decodeRaw(null, bufferedData, MISSION_OFFSET + offset, MISSION_SIZE);
    log.satellite = uOCTET.decodeRaw(null, bufferedData, SATELLITE_OFFSET + offset, SATELLITE_SIZE);
    log.providerId = uSHORT.decodeRaw(null, bufferedData, PROVIDERID_OFFSET + offset, PROVIDERID_SIZE);
    log.providerName = sTRING.decodeRaw(null, bufferedData, PROVIDERNAME_OFFSET + offset, PROVIDERNAME_SIZE);
    log.source = sTRING.decodeRaw(null, bufferedData, SOURCE_OFFSET + offset, SOURCE_SIZE);
    log.service = sTRING.decodeRaw(null, bufferedData, SERVICE_OFFSET + offset, SERVICE_SIZE);
    log.sessionId = uSHORT.decodeRaw(null, bufferedData, SESSIONID_OFFSET + offset, SESSIONID_SIZE);
    log.sessionName = sTRING.decodeRaw(null, bufferedData, SESSIONNAME_OFFSET + offset, SESSIONNAME_SIZE);
    log.slotId = uSHORT.decodeRaw(null, bufferedData, SLOTID_OFFSET + offset, SLOTID_SIZE);
    log.domainId = uSHORT.decodeRaw(null, bufferedData, DOMAINID_OFFSET + offset, DOMAINID_SIZE);
    return log;
  },
};
