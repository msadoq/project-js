import _ from 'lodash';
import asyncSeries from 'async/series';
import { PREFIX_KNOWN_RANGES, PREFIX_LASTS } from 'constants';
import passerelle from '../../utils/passerelle/index';

/**
 * List of the conversion to be done for a given datamap
 * @param {*} newViewMap Is viewMap generated by datamap
 */
const mapUnitConvertion = (newViewMap) => {
  const mapConvert = {};
  const viewIdKeys = Object.keys(newViewMap);
  viewIdKeys.forEach((viewIdKey) => {
    const view = newViewMap[viewIdKey].entryPoints;
    const entryPointsKeys = Object.keys(view);
    entryPointsKeys.forEach((epKey) => {
      const ep = view[epKey];
      if (!ep.error) {
        const tbdId = ep.tbdId;
        if (!mapConvert[tbdId]) {
          mapConvert[tbdId] = [];
        }
        const field = ep.field || ep.fieldY;
        const convertFrom = ep.convertFrom;
        const convertTo = ep.convertTo;
        if (convertFrom && convertTo) {
          if (!_.find(mapConvert[tbdId], { field, convertFrom, convertTo })) {
            mapConvert[tbdId].push({ field, convertFrom, convertTo });
          }
        }
      }
    });
  });
  return mapConvert;
};

/**
 * Convert data from data inject with async parallel
 * @param {*} toConvertMap map given by mapUnitConvertion method
 * @param {*} dataToInject new Data to inject (see injectData middleware and general VIMA data consumption)
 * @param {*} cb Callback waiting for the new dataToInjectCOnverted (dataToInject + gpinuc field)
 */
const convertData = (toConvertMap, dataToInject, cb) => {
  // console.log(toConvertMap);
  const tbdIdKeysLasts = Object.keys(dataToInject[PREFIX_LASTS]);
  const tbdIdKeysRanges = Object.keys(dataToInject[PREFIX_KNOWN_RANGES]);
  const asyncMap = {
    ...preparePromisesMap(tbdIdKeysLasts, dataToInject[PREFIX_LASTS], toConvertMap, PREFIX_LASTS),
    ...preparePromisesMap(
      tbdIdKeysRanges,
      dataToInject[PREFIX_KNOWN_RANGES],
      toConvertMap, PREFIX_KNOWN_RANGES
    ),
  };
  asyncSeries(asyncMap, (err, results) => {
    const resultsKeys = Object.keys(results);
    const convertedDataToInject = { ...dataToInject };
    resultsKeys.forEach((resultsKey) => {
      const {
        response,
        tbdIdKey,
        field,
        convertTo,
        prefix,
        listToConvert } = results[resultsKey];
      listToConvert.forEach(({ value, timestamp }, index) =>
      _.set(convertedDataToInject, [prefix, tbdIdKey, timestamp, 'gpinuc', field, convertTo], response[index]));
    });

    cb(err, convertedDataToInject);
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};

const preparePromisesMap = (keysLists, dataToInject, toConvertMap, prefix) => {
  const asyncMap = {};
  keysLists.forEach((tbdIdKey) => {
    const timestampMap = dataToInject[tbdIdKey];
    const timestampArray = Object.keys(timestampMap);
    const arrayToConvert = toConvertMap[tbdIdKey];
    if (arrayToConvert) { // If there are some stuff to convert
      arrayToConvert.forEach(({ field, convertFrom, convertTo }) => {
        const listToConvert = timestampArray.map(timestamp =>
          ({ value: timestampMap[timestamp][field].symbol, timestamp }));
        asyncMap[`${tbdIdKey}${field}${convertFrom}${convertTo}`] = (callbackAsync) => {
          passerelle.caller('convertUnit',
            {
              value: listToConvert,
              unitesource: convertFrom,
              unitecible: convertTo,
            },
            (response) => {
              callbackAsync(null,
                { response,
                  tbdIdKey,
                  field,
                  convertFrom,
                  convertTo,
                  prefix,
                  listToConvert,
                }
              );
            }
          );
        };
      });
    }
  });
  return asyncMap;
};

export default {
  mapUnitConvertion,
  convertData,
};
