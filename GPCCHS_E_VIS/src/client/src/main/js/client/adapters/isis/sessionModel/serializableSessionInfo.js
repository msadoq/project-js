// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const lONG = require('../ccsds_mal/lONG');
const objectId = require('../ccsds_com/objectId');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');
const uOCTET = require('../ccsds_mal/uOCTET');
const uSHORT = require('../ccsds_mal/uSHORT');

const OID_OBJECTTYPE_AREA_SIZE = 2;
const OID_OBJECTTYPE_AREA_OFFSET = 0;
const OID_OBJECTTYPE_SERVICE_SIZE = 2;
const OID_OBJECTTYPE_SERVICE_OFFSET = OID_OBJECTTYPE_AREA_OFFSET + OID_OBJECTTYPE_AREA_SIZE;
const OID_OBJECTTYPE_VERSION_SIZE = 1;
const OID_OBJECTTYPE_VERSION_OFFSET = OID_OBJECTTYPE_SERVICE_OFFSET + OID_OBJECTTYPE_SERVICE_SIZE;
const OID_OBJECTTYPE_NUMBER_SIZE = 2;
const OID_OBJECTTYPE_NUMBER_OFFSET = OID_OBJECTTYPE_VERSION_OFFSET + OID_OBJECTTYPE_VERSION_SIZE;
const OID_OBJECTTYPE_SIZE = (OID_OBJECTTYPE_NUMBER_OFFSET + OID_OBJECTTYPE_NUMBER_SIZE) - OID_OBJECTTYPE_AREA_OFFSET;
const OID_OBJECTTYPE_OFFSET = 0;
const OID_OBJECTKEY_DOMAINEID_SIZE = 2;
const OID_OBJECTKEY_DOMAINEID_OFFSET = OID_OBJECTTYPE_OFFSET + OID_OBJECTTYPE_SIZE;
const OID_OBJECTKEY_UID_SIZE = 8;
const OID_OBJECTKEY_UID_OFFSET = OID_OBJECTKEY_DOMAINEID_OFFSET + OID_OBJECTKEY_DOMAINEID_SIZE;
const OID_OBJECTKEY_SIZE = (OID_OBJECTKEY_UID_OFFSET + OID_OBJECTKEY_UID_SIZE) - OID_OBJECTKEY_DOMAINEID_OFFSET;
const OID_OBJECTKEY_OFFSET = OID_OBJECTTYPE_OFFSET + OID_OBJECTTYPE_SIZE;
const OID_SIZE = (OID_OBJECTKEY_OFFSET + OID_OBJECTKEY_SIZE) - OID_OBJECTTYPE_OFFSET;
const OID_OFFSET = 0;
const NAME_SIZE = 128;
const NAME_OFFSET = OID_OFFSET + OID_SIZE;
const STATE_SIZE = 4;
const STATE_OFFSET = NAME_OFFSET + NAME_SIZE;
const ID_SIZE = 2;
const ID_OFFSET = STATE_OFFSET + STATE_SIZE;
const PATH_SIZE = 256;
const PATH_OFFSET = ID_OFFSET + ID_SIZE;
const LASTSTATEUPDATETIME_SIZE = 8;
const LASTSTATEUPDATETIME_OFFSET = PATH_OFFSET + PATH_SIZE;
const HEALTHSTATUS_SIZE = 1;
const HEALTHSTATUS_OFFSET = LASTSTATEUPDATETIME_OFFSET + LASTSTATEUPDATETIME_SIZE;
const DOMAIN_SIZE = 2;
const DOMAIN_OFFSET = HEALTHSTATUS_OFFSET + HEALTHSTATUS_SIZE;
const TIMEDELTA_SIZE = 8;
const TIMEDELTA_OFFSET = DOMAIN_OFFSET + DOMAIN_SIZE;
const PROPERTIES_SIZE = 8192;
const PROPERTIES_OFFSET = TIMEDELTA_OFFSET + TIMEDELTA_SIZE;
const VARIABLES_SIZE = 8192;
const VARIABLES_OFFSET = PROPERTIES_OFFSET + PROPERTIES_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const serializableSessionInfo = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    objectId.encodeRaw(data.oid, serializableSessionInfo, OID_OFFSET + offset, OID_SIZE);
    sTRING.encodeRaw(data.name, serializableSessionInfo, NAME_OFFSET + offset, NAME_SIZE);
    uINTEGER.encodeRaw(data.state, serializableSessionInfo, STATE_OFFSET + offset, STATE_SIZE);
    uSHORT.encodeRaw(data.id, serializableSessionInfo, ID_OFFSET + offset, ID_SIZE);
    sTRING.encodeRaw(data.path, serializableSessionInfo, PATH_OFFSET + offset, PATH_SIZE);
    uLONG.encodeRaw(data.lastStateUpdateTime, serializableSessionInfo, LASTSTATEUPDATETIME_OFFSET + offset, LASTSTATEUPDATETIME_SIZE);
    uOCTET.encodeRaw(data.healthStatus, serializableSessionInfo, HEALTHSTATUS_OFFSET + offset, HEALTHSTATUS_SIZE);
    uSHORT.encodeRaw(data.domain, serializableSessionInfo, DOMAIN_OFFSET + offset, DOMAIN_SIZE);
    lONG.encodeRaw(data.timeDelta, serializableSessionInfo, TIMEDELTA_OFFSET + offset, TIMEDELTA_SIZE);
    sTRING.encodeRaw(data.properties, serializableSessionInfo, PROPERTIES_OFFSET + offset, PROPERTIES_SIZE);
    sTRING.encodeRaw(data.variables, serializableSessionInfo, VARIABLES_OFFSET + offset, VARIABLES_SIZE);
    return serializableSessionInfo.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const serializableSessionInfo = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    serializableSessionInfo.oid = objectId.decodeRaw(null, bufferedData, OID_OFFSET + offset, OID_SIZE);
    serializableSessionInfo.name = sTRING.decodeRaw(null, bufferedData, NAME_OFFSET + offset, NAME_SIZE);
    serializableSessionInfo.state = uINTEGER.decodeRaw(null, bufferedData, STATE_OFFSET + offset, STATE_SIZE);
    serializableSessionInfo.id = uSHORT.decodeRaw(null, bufferedData, ID_OFFSET + offset, ID_SIZE);
    serializableSessionInfo.path = sTRING.decodeRaw(null, bufferedData, PATH_OFFSET + offset, PATH_SIZE);
    serializableSessionInfo.lastStateUpdateTime = uLONG.decodeRaw(null, bufferedData, LASTSTATEUPDATETIME_OFFSET + offset, LASTSTATEUPDATETIME_SIZE);
    serializableSessionInfo.healthStatus = uOCTET.decodeRaw(null, bufferedData, HEALTHSTATUS_OFFSET + offset, HEALTHSTATUS_SIZE);
    serializableSessionInfo.domain = uSHORT.decodeRaw(null, bufferedData, DOMAIN_OFFSET + offset, DOMAIN_SIZE);
    serializableSessionInfo.timeDelta = lONG.decodeRaw(null, bufferedData, TIMEDELTA_OFFSET + offset, TIMEDELTA_SIZE);
    serializableSessionInfo.properties = sTRING.decodeRaw(null, bufferedData, PROPERTIES_OFFSET + offset, PROPERTIES_SIZE);
    serializableSessionInfo.variables = sTRING.decodeRaw(null, bufferedData, VARIABLES_OFFSET + offset, VARIABLES_SIZE);
    return serializableSessionInfo;
  },
};
