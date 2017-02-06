// Code came from https://gist.github.com/kbrownlees/93e57729d6ad95f38381

import _ from 'lodash/fp';

import { createSelectorCreator, defaultMemoize } from 'reselect';

function diff(a, b) {
  const r = {};
  _.each(a, (v, k) => {
    // If it's equal, return now
    if (b && (b[k] === v || _.isEqual(v, b[k]))) return;
    // If it's an array, the whole thing should be replaced
    if (Array.isArray(v)) {
      r[k] = v;
      return v;
    }

    // Using a temp variable for the object diff recursion means we can omit empty objects
    const t = _.isObject(v) ? _.diff(v, b[k]) : v;

    if ((_.isObject(t) && !_.isEmpty(t)) || !_.isObject(t)) {
      r[k] = t;
    }
  });

  return r;
}

function changeMemoize(func, changeCallback) {
  const defaultMemoizeInstance = defaultMemoize(func);
  if (changeCallback === undefined) {
    return defaultMemoizeInstance;
  }
  let lastArgs;
  let lastResult;
  return (...args) => {
    const result = defaultMemoizeInstance(...args);
    if (lastResult === undefined || result !== lastResult) {
      changeCallback(lastArgs, lastResult, args, result);
      lastResult = result;
      lastArgs = args;
    }
    return result;
  };
}

function createLogChange(name) {
  return (lastArgs, lastResult, newArgs, newResult) => {
    /* eslint-disable no-console */
    // console.warn(`selector ${name} recomputed. Should be optimized`);
    console.group(`Selector ${name} recomputed`);
    if (_.isEqual(lastArgs, newArgs)) {
      console.log('Args are the same', lastArgs, newArgs);
    } else {
      console.log('Args are not the same', diff(lastArgs, newArgs), lastArgs, newArgs);
    }
    if (_.isEqual(lastResult, newResult)) {
      console.log('Results are the same', newResult);
    }
    console.groupEnd(`Selector ${name}`);
    /* eslint-enable no-console */
  };
}

function createLoggingSelector(...args) {
  let name;
  if (typeof args[0] === 'string') {
    name = args.shift();
  }
  return createSelectorCreator(changeMemoize, createLogChange(name))(...args);
}

export default createLoggingSelector;
