// Generated file

const {
  encodeAttribute,
  decodeAttribute,
} = require('../types');

module.exports = {
  encode: data => ({
    ridStatus: (data.ridStatus !== null && typeof data.ridStatus !== 'undefined')
      ? { value: data.ridStatus }
      : null,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? { value: data.actionStatus }
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? encodeAttribute(data.value)
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? { value: data.rid }
      : null,
    mask: (data.mask !== null && typeof data.mask !== 'undefined')
      ? { value: data.mask }
      : null,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? { value: data.actionName }
      : null,
  }),
  decode: data => ({
    ridStatus: (data.ridStatus !== null && typeof data.ridStatus !== 'undefined')
      ? { type: 'uinteger', value: data.ridStatus.value }
      : undefined,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? { type: 'uinteger', value: data.actionStatus.value }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? decodeAttribute(data.value)
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? { type: 'uinteger', value: data.rid.value }
      : undefined,
    mask: (data.mask !== null && typeof data.mask !== 'undefined')
      ? { type: 'string', value: data.mask.value }
      : undefined,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? { type: 'string', value: data.actionName.value }
      : undefined,
  }),
};

