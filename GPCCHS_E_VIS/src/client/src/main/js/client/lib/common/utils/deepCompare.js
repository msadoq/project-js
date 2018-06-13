import { isEqual, isObject, transform } from 'lodash/fp';

const _transform = transform.convert({
  cap: false,
});

const iteratee = baseObj => (result, value, key) => {
  if (!isEqual(value, baseObj[key])) {
    const valIsObj = isObject(value) && isObject(baseObj[key]);
    // eslint-disable-next-line no-param-reassign
    result[key] = valIsObj === true ? deepCompare(value, baseObj[key]) : value;
  }
};

export default function deepCompare(targetObj, baseObj) {
  return _transform(iteratee(baseObj), null, targetObj);
}
