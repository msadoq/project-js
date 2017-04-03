import moment from 'moment';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';

export function isLongValue(data) {
  if (data.type === 'time' || data.type === 'fineTime'
    || data.type === 'long' || data.type === 'ulong') {
    return true;
  }
  return false;
}

export function convertLongData(data) {
  if (data.type === 'time' || data.type === 'fineTime') {
    return moment(data.value).utc().toISOString();
  }
  if (data.type === 'long' || data.type === 'ulong') {
    return Number(data.symbol);
  }
  return data.value;
}

export function convertData(data) {
  if (isLongValue(data)) {
    return convertLongData(data);
  } else if (data.type === 'boolean') {
    return data.value ? 'true' : 'false';
  } else if (data.type === 'enum') {
    return data.symbol;
  } else if (data.type === 'blob') {
    let hexVal = '';
    data.value.data.forEach((val) => {
      let hVal = val.toString(16);
      if (hVal.length < 2) {
        hVal = '0'.concat(hVal);
      }
      hexVal = hexVal.concat(hVal).concat(' ');
    });
    return hexVal;
  } else if (!data.type) {
    return updateObjectValues(data);
  }
  return data.value;
}

export function updateObjectValues(data) {
  if (!data || _isEmpty(data)) {
    return data;
  }
  const newData = _cloneDeep(data);
  if (data.type) {
    newData.value = convertData(data);
    return newData;
  }
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i += 1) {
    const subData = data[keys[i]];
    if (_isArray(subData)) {
      subData.forEach((d, idx) => {
        newData[keys[i]][idx] = updateObjectValues(d);
      });
    } else if (_isObject(subData)) {
      if (subData.type) {
        newData[keys[i]].value = convertData(subData);
      } else {
        newData[keys[i]] = convertData(subData);
      }
    }
  }
  return newData;
}
