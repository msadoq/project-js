import moment from 'moment';
import _isBuffer from 'lodash/isBuffer';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';

export function isLongValue(data) {
  return (
    data.type === 'time'
    || data.type === 'fineTime'
    || data.type === 'long'
    || data.type === 'ulong'
  );
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
  if (!data) {
    return data;
  }

  if (isLongValue(data)) {
    return convertLongData(data);
  } else if (data.type === 'boolean') {
    return data.value ? 'true' : 'false';
  } else if (data.type === 'enum' || data.type === 'double') {
    return data.symbol;
  } else if (data.type === 'blob') {
    // deprecated code, previously buffer was sent to IPC and transform in array of digits during process
    // let hexVal = '';
    // data.value.data.forEach((val) => {
    //   let hVal = val.toString(16);
    //   if (hVal.length < 2) {
    //     hVal = '0'.concat(hVal);
    //   }
    //   hexVal = hexVal.concat(hVal).concat(' ');
    // });
    // return hexVal;
    if (!_isBuffer(data.value)) {
      // theoretically never happens
      return data.value;
    }
    // @doc: https://nodejs.org/dist/latest-v6.x/docs/api/buffer.html#buffer_buffers_and_es6_iteration
    let hexVal = '';
    // eslint-disable-next-line no-restricted-syntax, "DV6 TBC_CNES LPISIS In this particular case (iteration on buffer) the for structure is better"
    for (const val of data.value) {
      let hVal = val.toString(16);
      if (hVal.length < 2) {
        hVal = '0'.concat(hVal);
      }
      hexVal = hexVal.concat(hVal).concat(' ');
    }
    return hexVal;
  } else if (data.type === 'duration') {
    if (data.value === Infinity) {
      return '-';
    }
    const duration = moment.duration(data.value);
    const hours = duration.get('h').toString().concat(':');
    const minutes = duration.get('m').toString().concat(':');
    const seconds = duration.get('s').toString().concat('.');
    const milliseconds = duration.get('ms').toString();
    return hours.concat(minutes).concat(seconds).concat(milliseconds);
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
