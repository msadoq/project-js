// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const objectKey = require('./objectKey');
const objectType = require('./objectType');

const OBJECTTYPE_AREA_SIZE = 2;
const OBJECTTYPE_AREA_OFFSET = 0;
const OBJECTTYPE_SERVICE_SIZE = 2;
const OBJECTTYPE_SERVICE_OFFSET = OBJECTTYPE_AREA_OFFSET + OBJECTTYPE_AREA_SIZE;
const OBJECTTYPE_VERSION_SIZE = 1;
const OBJECTTYPE_VERSION_OFFSET = OBJECTTYPE_SERVICE_OFFSET + OBJECTTYPE_SERVICE_SIZE;
const OBJECTTYPE_NUMBER_SIZE = 2;
const OBJECTTYPE_NUMBER_OFFSET = OBJECTTYPE_VERSION_OFFSET + OBJECTTYPE_VERSION_SIZE;
const OBJECTTYPE_SIZE = (OBJECTTYPE_NUMBER_OFFSET + OBJECTTYPE_NUMBER_SIZE) - OBJECTTYPE_AREA_OFFSET;
const OBJECTTYPE_OFFSET = 0;
const OBJECTKEY_DOMAINEID_SIZE = 2;
const OBJECTKEY_DOMAINEID_OFFSET = OBJECTTYPE_OFFSET + OBJECTTYPE_SIZE;
const OBJECTKEY_UID_SIZE = 8;
const OBJECTKEY_UID_OFFSET = OBJECTKEY_DOMAINEID_OFFSET + OBJECTKEY_DOMAINEID_SIZE;
const OBJECTKEY_SIZE = (OBJECTKEY_UID_OFFSET + OBJECTKEY_UID_SIZE) - OBJECTKEY_DOMAINEID_OFFSET;
const OBJECTKEY_OFFSET = OBJECTTYPE_OFFSET + OBJECTTYPE_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const objectId = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    objectType.encodeRaw(data.objectType, objectId, OBJECTTYPE_OFFSET + offset, OBJECTTYPE_SIZE);
    objectKey.encodeRaw(data.objectKey, objectId, OBJECTKEY_OFFSET + offset, OBJECTKEY_SIZE);
    return objectId.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const objectId = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    objectId.objectType = objectType.decodeRaw(null, bufferedData, OBJECTTYPE_OFFSET + offset, OBJECTTYPE_SIZE);
    objectId.objectKey = objectKey.decodeRaw(null, bufferedData, OBJECTKEY_OFFSET + offset, OBJECTKEY_SIZE);
    return objectId;
  },
};
