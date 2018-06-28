// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const fINETIME = require('../ccsds_mal/fINETIME');
const lONG = require('../ccsds_mal/lONG');
const objectId = require('./objectId');
const sTRING = require('../ccsds_mal/sTRING');
const uSHORT = require('../ccsds_mal/uSHORT');

const _MILLISEC_SIZE = 8;
const _PICOSEC_SIZE = 4;
const DOMAINID_SIZE = 2;
const DOMAINID_OFFSET = 0;
const SLOTID_SIZE = 2;
const SLOTID_OFFSET = DOMAINID_OFFSET + DOMAINID_SIZE;
const PROVIDERID_SIZE = 2;
const PROVIDERID_OFFSET = SLOTID_OFFSET + SLOTID_SIZE;
const RELATED_SIZE = 8;
const RELATED_OFFSET = PROVIDERID_OFFSET + PROVIDERID_SIZE;
const SOURCE_OBJECTTYPE_AREA_SIZE = 2;
const SOURCE_OBJECTTYPE_AREA_OFFSET = 0;
const SOURCE_OBJECTTYPE_SERVICE_SIZE = 2;
const SOURCE_OBJECTTYPE_SERVICE_OFFSET = SOURCE_OBJECTTYPE_AREA_OFFSET + SOURCE_OBJECTTYPE_AREA_SIZE;
const SOURCE_OBJECTTYPE_VERSION_SIZE = 1;
const SOURCE_OBJECTTYPE_VERSION_OFFSET = SOURCE_OBJECTTYPE_SERVICE_OFFSET + SOURCE_OBJECTTYPE_SERVICE_SIZE;
const SOURCE_OBJECTTYPE_NUMBER_SIZE = 2;
const SOURCE_OBJECTTYPE_NUMBER_OFFSET = SOURCE_OBJECTTYPE_VERSION_OFFSET + SOURCE_OBJECTTYPE_VERSION_SIZE;
const SOURCE_OBJECTTYPE_SIZE = (SOURCE_OBJECTTYPE_NUMBER_OFFSET + SOURCE_OBJECTTYPE_NUMBER_SIZE) - SOURCE_OBJECTTYPE_AREA_OFFSET;
const SOURCE_OBJECTTYPE_OFFSET = 0;
const SOURCE_OBJECTKEY_DOMAINEID_SIZE = 2;
const SOURCE_OBJECTKEY_DOMAINEID_OFFSET = SOURCE_OBJECTTYPE_OFFSET + SOURCE_OBJECTTYPE_SIZE;
const SOURCE_OBJECTKEY_UID_SIZE = 8;
const SOURCE_OBJECTKEY_UID_OFFSET = SOURCE_OBJECTKEY_DOMAINEID_OFFSET + SOURCE_OBJECTKEY_DOMAINEID_SIZE;
const SOURCE_OBJECTKEY_SIZE = (SOURCE_OBJECTKEY_UID_OFFSET + SOURCE_OBJECTKEY_UID_SIZE) - SOURCE_OBJECTKEY_DOMAINEID_OFFSET;
const SOURCE_OBJECTKEY_OFFSET = SOURCE_OBJECTTYPE_OFFSET + SOURCE_OBJECTTYPE_SIZE;
const SOURCE_SIZE = (SOURCE_OBJECTKEY_OFFSET + SOURCE_OBJECTKEY_SIZE) - SOURCE_OBJECTTYPE_OFFSET;
const SOURCE_OFFSET = RELATED_OFFSET + RELATED_SIZE;
const STARTTIME_SIZE = _MILLISEC_SIZE + _PICOSEC_SIZE;
const STARTTIME_OFFSET = SOURCE_OFFSET + SOURCE_SIZE;
const ENDTIME_SIZE = _MILLISEC_SIZE + _PICOSEC_SIZE;
const ENDTIME_OFFSET = STARTTIME_OFFSET + STARTTIME_SIZE;
const SORTORDER_SIZE = 1;
const SORTORDER_OFFSET = ENDTIME_OFFSET + ENDTIME_SIZE;
const SORTFIELDNAME_SIZE = 32;
const SORTFIELDNAME_OFFSET = SORTORDER_OFFSET + SORTORDER_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const archiveQuery = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uSHORT.encodeRaw(data.domainID, archiveQuery, DOMAINID_OFFSET + offset, DOMAINID_SIZE);
    uSHORT.encodeRaw(data.slotId, archiveQuery, SLOTID_OFFSET + offset, SLOTID_SIZE);
    uSHORT.encodeRaw(data.providerId, archiveQuery, PROVIDERID_OFFSET + offset, PROVIDERID_SIZE);
    lONG.encodeRaw(data.related, archiveQuery, RELATED_OFFSET + offset, RELATED_SIZE);
    objectId.encodeRaw(data.source, archiveQuery, SOURCE_OFFSET + offset, SOURCE_SIZE);
    fINETIME.encodeRaw(data.startTime, archiveQuery, STARTTIME_OFFSET + offset, STARTTIME_SIZE);
    fINETIME.encodeRaw(data.endTime, archiveQuery, ENDTIME_OFFSET + offset, ENDTIME_SIZE);
    bOOLEAN.encodeRaw(data.sortOrder, archiveQuery, SORTORDER_OFFSET + offset, SORTORDER_SIZE);
    sTRING.encodeRaw(data.sortFieldName, archiveQuery, SORTFIELDNAME_OFFSET + offset, SORTFIELDNAME_SIZE);
    return archiveQuery.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const archiveQuery = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    archiveQuery.domainID = uSHORT.decodeRaw(null, bufferedData, DOMAINID_OFFSET + offset, DOMAINID_SIZE);
    archiveQuery.slotId = uSHORT.decodeRaw(null, bufferedData, SLOTID_OFFSET + offset, SLOTID_SIZE);
    archiveQuery.providerId = uSHORT.decodeRaw(null, bufferedData, PROVIDERID_OFFSET + offset, PROVIDERID_SIZE);
    archiveQuery.related = lONG.decodeRaw(null, bufferedData, RELATED_OFFSET + offset, RELATED_SIZE);
    archiveQuery.source = objectId.decodeRaw(null, bufferedData, SOURCE_OFFSET + offset, SOURCE_SIZE);
    archiveQuery.startTime = fINETIME.decodeRaw(null, bufferedData, STARTTIME_OFFSET + offset, STARTTIME_SIZE);
    archiveQuery.endTime = fINETIME.decodeRaw(null, bufferedData, ENDTIME_OFFSET + offset, ENDTIME_SIZE);
    archiveQuery.sortOrder = bOOLEAN.decodeRaw(null, bufferedData, SORTORDER_OFFSET + offset, SORTORDER_SIZE);
    archiveQuery.sortFieldName = sTRING.decodeRaw(null, bufferedData, SORTFIELDNAME_OFFSET + offset, SORTFIELDNAME_SIZE);
    return archiveQuery;
  },
};
