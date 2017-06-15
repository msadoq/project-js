import _ from 'lodash/fp';
import * as types from '../types';
import { removeWithAnimation } from '../actions/messages';

const MESSAGE_LIFE_DELAY = 5000;
const MESSAGE_TRANSITION_OUT_DELAY = 3000;

const createDelay = () => {
  const times = {};
  const funcs = {};
  const ids = {};

  const clean = (uuid) => {
    delete times[uuid];
    delete funcs[uuid];
    delete ids[uuid];
  };

  const set = (uuid, f, ms) => {
    clear(uuid);
    funcs[uuid] = f;
    times[uuid] = ms;
    ids[uuid] = setTimeout(() => {
      clean(uuid);
      f();
    }, ms);
  };

  const clear = (uuid) => {
    if (ids[uuid]) {
      clearTimeout(ids[uuid]);
      clean(uuid);
    }
  };

  const reset = (uuid) => {
    clearTimeout(ids[uuid]);
    set(uuid, funcs[uuid], times[uuid]);
  };

  return {
    set,
    clear,
    reset,
  };
};

const isAnimated = _.get('meta.withAnimation');

export default () => {
  const delay = createDelay();
  return ({ dispatch }) => next => (action) => {
    if (action.type === types.WS_MESSAGE_REMOVE) {
      delay.clear(action.payload.uuid);
    }
    if (action.type === types.WS_MESSAGE_REMOVE && isAnimated(action)) {
      dispatch({ type: types.WS_MESSAGE_REMOVING, payload: action.payload });
      delay.set(action.payload.uuid, () => {
        next(_.unset('meta.withAnimation', action));
      }, MESSAGE_TRANSITION_OUT_DELAY);
      return action;
    }
    if (action.type === types.WS_MESSAGE_ADD) {
      next(action);
      const { containerId, messages } = action.payload;
      messages.forEach((msg) => {
        delay.set(msg.uuid, () => {
          dispatch(removeWithAnimation(containerId, msg.uuid));
        }, MESSAGE_LIFE_DELAY);
      });
      return action;
    }
    return next(action);
  };
};
