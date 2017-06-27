// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const lONG = require('../ccsds_mal/lONG');
const objectId = require('./objectId');

const RELATED_SIZE = 8;
const RELATED_OFFSET = 0;
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

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const objectDetails = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    lONG.encodeRaw(data.related, objectDetails, RELATED_OFFSET + offset, RELATED_SIZE);
    objectId.encodeRaw(data.source, objectDetails, SOURCE_OFFSET + offset, SOURCE_SIZE);
    return objectDetails.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const objectDetails = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    objectDetails.related = lONG.decodeRaw(null, bufferedData, RELATED_OFFSET + offset, RELATED_SIZE);
    objectDetails.source = objectId.decodeRaw(null, bufferedData, SOURCE_OFFSET + offset, SOURCE_SIZE);
    return objectDetails;
  },
};
