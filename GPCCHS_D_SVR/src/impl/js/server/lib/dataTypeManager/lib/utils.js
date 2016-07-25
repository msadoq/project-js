const getAttributeValue = (attribute) => {
  let value = null;
  if (attribute._blob != null) {
    value = attribute._blob.value;
  } else if (attribute._boolean != null) {
    value = attribute._boolean.value;
  } else if (attribute.float != null) {
    value = attribute.float.value;
  } else if (attribute._double != null) {
    value = attribute._double.value;
  } else if (attribute._identifier != null) {
    value = attribute._identifier.value;
  } else if (attribute._octet != null) {
    value = attribute._octet.value;
  } else if (attribute._uoctet != null) {
    value = attribute._uoctet.value;
  } else if (attribute._short != null) {
    value = attribute._short.value;
  } else if (attribute._ushort != null) {
    value = attribute._ushort.value;
  } else if (attribute._integer != null) {
    value = attribute._integer.value;
  } else if (attribute._uinteger != null) {
    value = attribute._uinteger.value;
  } else if (attribute._long != null) {
    value = attribute._long.value;
  } else if (attribute._ulong != null) {
    value = attribute._ulong_blob.value;
  } else if (attribute._string != null) {
    value = attribute._string.value;
  } else if (attribute._time != null) {
    value = attribute._time.value;
  } else if (attribute._finetime != null) {
    value = attribute._finetime.value;
  } else if (attribute._rui != null) {
    value = attribute._rui.value;
  }
  return value;
};

module.exports = { getAttributeValue };
