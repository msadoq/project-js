import _last from 'lodash/last';
import _cloneDeep from 'lodash/cloneDeep';

/**
 * Fork of _sortedIndexBy of lodash to support comparison function
 *
 * @param  {Array}    array            array The sorted array to inspect.
 * @param  {*}        value            value The value to evaluate.
 * @param  {function} compareFunction  compareFunction The iteratee invoked per element.
 * @param  {boolean}  retHighest       Specify returning the highest qualified index.
 * @return {number}                    Returns the index at which `value` should be inserted into `array`.
 */
const forkedSortedIndexBy = (array, value, compareFunction, retHighest = false) => {
  let low = 0;
  let high = array.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const computed = compareFunction(array[mid], value);

    const setLow = retHighest ? (computed <= 0) : (computed < 0);

    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return high;
};

/**
 * Switch the type of type
 *
 * @param  {String} type 'x' or 'y'
 * @return {String]} 'y' or 'x'
 */
const oposite = type => (
  {
    x: 'y',
    y: 'x',
  }[type]
);

/**
 * Give the axis on wich the point have an interval.
 * If the point was not computed on an interval, return null
 *
 * @param  {Object} point {x:{timestamp/interval, value}, y:{timestamp/interval, value}}
 * @return {string/null}  'x' / 'y' / null
 */
const getPointIntervalType = (point) => {
  if (point.x.interval !== undefined) {
    return 'x';
  } else if (point.y.interval !== undefined) {
    return 'y';
  }

  return null;
};

/**
 * timestamp comparator for timeValue
 *
 * @param  {Object} timeValueA time-value couple {timestamp, value}
 * @param  {Object} timeValueB idem
 * @return {Number}
 */
const byTimestamp = (timeValueA, timeValueB) => (timeValueA.timestamp - timeValueB.timestamp);

/**
 * timestamp comparator for parametric point
 *
 * @param  {Object} pointA 'x' or 'y'
 * @param  {Object} pointB {x:{timestamp/interval, value}, y:{timestamp/interval, value}}
 * @return {Number}
 */
const byPointTimestamp = (pointA, pointB) => {
  const tTypeA = oposite(getPointIntervalType(pointA) || 'x');
  const tTypeB = oposite(getPointIntervalType(pointB) || 'x');

  return (pointA[tTypeA].timestamp - pointB[tTypeB].timestamp);
};

/**
  * Generate interval comparator for parametric point
  *
  * @param  {String} type        'x' or 'y'
  * @param  {Number} intervalIdx Indicate if we take begining or end of interval (0 or 1)
  * @return {Function}           Interval comparator
  */
const byInterval = (type, intervalIdx) => (pointA, pointB) => {
  const tA = pointA[type].timestamp !== undefined ?
    pointA[type].timestamp
    : pointA[type].interval[intervalIdx];

  const tB = pointB[type].timestamp !== undefined ?
    pointB[type].timestamp
    : pointB[type].interval[intervalIdx];

  return tA - tB;
};


/**
 * === O(log(n)) ===
 * Get a time-value inside a timestamp sorted list.
 *
 * @param  {Number} timestamp
 * @param  {array}  list      [{timestamp, value}]
 *
 * @return {Number}
 */
const getValueByTimestamp = (timestamp, list) => {
  if (list.length === 0) {
    return null;
  }

  const idx = forkedSortedIndexBy(list, { timestamp }, byTimestamp);

  if (list[idx].timestamp !== timestamp) {
    return null;
  }

  return list[idx].value;
};

/**
 * === "Operateur Maupetit Gaucher" === O(1) ===
 * Take a parametric point and (re)compute its interpolated value.
 *
 * @param  {Object} timeValueLists All the timeValues
 * @param  {Object} point {x:{timestamp/interval, value}, y:{timestamp/interval, value}}
 *
 * @return {Object}
 */
const OMG = (timeValueLists, point) => {
  // Compute the type of the interval
  const iType = getPointIntervalType(point);

  if (iType === null) {
    return point;
  }

  const newPoint = { ...point };

  // Linear interpolation init variables
  const oType = oposite(iType);

  const ti = point[iType].interval[0];
  const tj = point[iType].interval[1];
  const tn = point[oType].timestamp;

  const vi = getValueByTimestamp(ti, timeValueLists[iType]);
  const vj = getValueByTimestamp(tj, timeValueLists[iType]);

  if (vi === null || vj === null) {
    throw new Error('Can\'t compute OMG on this vector. This should never happen');
  }

  const dT = tj - ti;
  const dt = tn - ti;
  const dV = vj - vi;
  // linear interpolation formula
  const dv = (dt / dT) * dV;

  newPoint[iType].value = vi + dv;

  return newPoint;
};

/**
 * === Step 1 === O(log(n)) ===
 * The new inserted point may affect some intervals.
 * /!\ This mutate parametric /!\
 *
 * @param  {Object} timeValueLists All the timeValues
 * @param  {array}  parametric     Computed parametric points [{x:{timestamp/interval, value}, y:{timestamp/interval, value}}]
 * @param  {Object} timeValue      time-value to insert {timestamp, value}
 * @param  {string} type           The type of the timeValue : 'x' or 'y'.
 */
/* eslint-disable no-param-reassign, "Performance optimisation : don't clone parametric object" */
const recomputeParametricAffectedPoints = (timeValueLists, parametric, timeValue, type) => {
  const oType = oposite(type);
  // Create point used for searching
  const referencePoint = {
    [type]: { timestamp: timeValue.timestamp },
  };

  // Determine where to begin searching for affected intervals
  let iAffectedRange = forkedSortedIndexBy(parametric, referencePoint, byInterval(type, 1));

  // Function to check if we should continue treating parametric
  const isPointInRange = (point) => {
    if (point === undefined) {
      return false;
    }

    if (point[type].timestamp !== undefined) {
      return true;
    }

    if (point[type].interval[0] > timeValue.timestamp) {
      return false;
    }

    return true;
  };

  // Split affected intervals
  while (isPointInRange(parametric[iAffectedRange])) {
    const point = _cloneDeep(parametric[iAffectedRange]);
    parametric[iAffectedRange] = point;

    if (point[type].interval !== undefined) {
      if (timeValue.timestamp < point[oposite(type)].timestamp) {
        point[type].interval[0] = timeValue.timestamp;
      } else {
        point[type].interval[1] = timeValue.timestamp;
      }
      point[type].value = null; // to trace uncomputed values

      if (point[type].interval[0] === point[oType].timestamp
        || point[type].interval[1] === point[oType].timestamp
      ) {
        // Delete this point
        parametric.splice(iAffectedRange, 1);
        iAffectedRange -= 1;
      } else {
        // Recompute interpolated value on splited range
        parametric[iAffectedRange] = OMG(timeValueLists, point);
      }
    }

    iAffectedRange += 1;
  }
};
/* eslint-enable no-param-reassign */

/**
 * === Step 2 === O(log(n)) ===
 * Insert the new timeValue inside the parametric points
 * /!\ This mutate parametric /!\
 *
 * @param  {Object} timeValueLists All the timeValues
 * @param  {array}  parametric     Computed parametric points [{x:{timestamp/interval, value}, y:{timestamp/interval, value}}]
 * @param  {Object} timeValue      time-value to insert {timestamp, value}
 * @param  {string} type           The type of the timeValue : 'x' or 'y'.
 */
const insertInParametric = (timeValueLists, parametric, timeValue, type) => {
  const oType = oposite(type);

  // Can't draw new point
  if (timeValue.timestamp < timeValueLists[oType][0].timestamp) {
    return;
  }
  if (timeValue.timestamp > _last(timeValueLists[oType]).timestamp) {
    return;
  }

  // Compute projected interval / associated timestamp
  let point = {
    [type]: timeValue,
  };
  const opositeTimeIdx = forkedSortedIndexBy(timeValueLists[oType], timeValue, byTimestamp);
  const opositeTimeValue = timeValueLists[oType][opositeTimeIdx];
  if (opositeTimeValue.timestamp === timeValue.timestamp) {
    point[oType] = {
      timestamp: timeValue.timestamp,
      value: opositeTimeValue.value,
    };
  } else {
    const prevOpositeTimeValue = timeValueLists[oType][opositeTimeIdx - 1];
    point[oType] = {
      interval: [prevOpositeTimeValue.timestamp, opositeTimeValue.timestamp],
      value: null,
    };
    point = OMG(timeValueLists, point);
  }

  // Determine where to insert in parametric
  const insertIdx = forkedSortedIndexBy(parametric, point, byPointTimestamp);

  parametric.splice(insertIdx, 0, point);
};

/**
 * === Step 3 === O(log(n)) ===
 * Insert new oposite points which are now drawable
 * /!\ This mutate parametric /!\
 *
 * @param  {Object} allTimeValueLists All the timeValues
 * @param  {array}  parametric        Computed parametric points [{x:{timestamp/interval, value}, y:{timestamp/interval, value}}]
 * @param  {Object} timeValue         time-value to insert {timestamp, value}
 * @param  {string} type              The type of the timeValue : 'x' or 'y'.
 */
const insertNewDrawablePoints = (allTimeValueLists, parametric, timeValue, type) => {
  const oType = oposite(type);
  const firstTimestamp = allTimeValueLists.old[type][0].timestamp;
  const lastTimestamp = _last(allTimeValueLists.old[type]).timestamp;

  // Treatment only effect when the timeValue is inserted in first or last position
  let isInsertedInFirstPosition;
  if (timeValue.timestamp < firstTimestamp) {
    isInsertedInFirstPosition = true;
  } else if (timeValue.timestamp > lastTimestamp) {
    isInsertedInFirstPosition = false;
  } else {
    return;
  }

  // Compute newly covered range
  let newCoveredInterval;
  if (isInsertedInFirstPosition) {
    newCoveredInterval = [timeValue.timestamp, firstTimestamp - 1];
  } else {
    newCoveredInterval = [lastTimestamp + 1, timeValue.timestamp];
  }

  // Select affected points
  const startIdx = forkedSortedIndexBy(
    allTimeValueLists.old[oType],
    { timestamp: newCoveredInterval[0] },
    byTimestamp
  );
  const endIdx = forkedSortedIndexBy(
    allTimeValueLists.old[oType],
    { timestamp: newCoveredInterval[1] },
    byTimestamp,
    true
  );

  for (let idx = startIdx; idx <= endIdx; idx += 1) {
    const oTimeValue = allTimeValueLists.old[oType][idx];

    if (oTimeValue !== undefined
      && oTimeValue.timestamp >= newCoveredInterval[0]
      && oTimeValue.timestamp <= newCoveredInterval[1]
    ) {
      insertInParametric(allTimeValueLists.new, parametric, oTimeValue, oType);
    }
  }
};

/**
 * === Step 4 === O(log(n)) ===
 * Insert a time-value inside a timestamp sorted list.
 * /!\ This mutate list /!\
 *
 * @param  {Object} timeValue {timestamp, value}
 * @param  {array}  list      [{timestamp, value}]
 */
const insertInTimeValueList = (timeValue, list) => {
  const idx = forkedSortedIndexBy(list, timeValue, byTimestamp);
  list.splice(idx, 0, timeValue);
};


/**
 * Add one new point inside existing parametric curve
 * /!\ This mutate allTimeValueLists.new and parametric /!\
 *
 * @param  {Object} allTimeValueLists All the timeValues lists (old and new)
 * @param  {array}  parametric        Computed parametric points [{x:{timestamp/interval, value}, y:{timestamp/interval, value}}]
 * @param  {Object} timeValue         time-value to insert {timestamp, value}
 * @param  {string} type              The type of the inserted timeValue : 'x' or 'y'.
 */
const insertTimeValueInParametric = (allTimeValueLists, parametric, timeValue, type) => {
  // step - 4 - //
  insertInTimeValueList(timeValue, allTimeValueLists.new[type]);

  // step 1 //
  recomputeParametricAffectedPoints(allTimeValueLists.new, parametric, timeValue, type);

  // step 2 //
  insertInParametric(allTimeValueLists.new, parametric, timeValue, type);

  // step 3 //
  insertNewDrawablePoints(allTimeValueLists, parametric, timeValue, type);

  // step - 4 - //
  insertInTimeValueList(timeValue, allTimeValueLists.old[type]);
};

/**
 * Add new time-values inside existing parametric curve
 *
 * @param  {array}  xList           List of allready insterted points [{timestamp, value}]
 * @param  {array}  yList           Idem for Y
 * @param  {array}  parametric      Computed parametric points [{x:{timestamp/interval, value}, y:{timestamp/interval, value}}]
 * @param  {array}  newTimeValuesX  Points to insert in parametric
 * @param  {array}  newTimeValuesY  Idem for Y
 *
 * @return {Object}                 Updated xList, yList and parametric points
 */
const insertTimeValuesInParametric = (xList, yList, parametric, newTimeValuesX, newTimeValuesY) => {
  const newParametric = parametric.slice(0);
  const allTimeValueLists = {
    old: {
      x: xList.slice(0),
      y: yList.slice(0),
    },
    new: {
      x: xList.slice(0),
      y: yList.slice(0),
    },
  };

  newTimeValuesX.forEach((timeValue) => {
    insertTimeValueInParametric(allTimeValueLists, newParametric, timeValue, 'x');
  });
  newTimeValuesY.forEach((timeValue) => {
    insertTimeValueInParametric(allTimeValueLists, newParametric, timeValue, 'y');
  });

  return {
    ...allTimeValueLists.new,
    parametric: newParametric,
  };
};

export default {
  // For Unit tests purpose
  byTimestamp,
  byPointTimestamp,
  OMG,
  recomputeParametricAffectedPoints,
  insertInParametric,
  insertNewDrawablePoints,
  insertInTimeValueList,

  // For use
  insertTimeValuesInParametric,
};
