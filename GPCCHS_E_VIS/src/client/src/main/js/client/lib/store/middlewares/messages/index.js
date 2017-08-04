import _ from 'lodash/fp';
import * as types from '../../types';
import { removeWithAnimation } from '../../actions/messages';

const MESSAGE_LIFE_DELAY = 10000;
const MESSAGE_TRANSITION_OUT_DELAY = 2500;

const createDelay = () => {
  const times = {};
  const funcs = {};
  const ids = {};

  const set = (uuid, f, ms) => {
    clear(uuid);
    funcs[uuid] = f;
    times[uuid] = ms;
    ids[uuid] = setTimeout(() => {
      f();
    }, ms);
  };

  const clear = (uuid) => {
    if (ids[uuid]) {
      clearTimeout(ids[uuid]);
    }
  };

  const reset = (uuid) => {
    clear(uuid);
    set(uuid, funcs[uuid], times[uuid]);
  };

  return {
    set,
    clear,
    reset,
  };
};

const isAnimated = _.get('meta.withAnimation');

export default function makeMessagesMiddleware() {
  const delayTimeout = createDelay();
  const delayAnimation = createDelay();
  return ({ dispatch }) => next => (action) => {
    if (action.type === types.WS_MESSAGE_REMOVE) {
      delayTimeout.clear(action.payload.uuid);
      delayAnimation.clear(action.payload.uuid);
    }
    if (action.type === types.WS_MESSAGE_CANCEL_REMOVING) {
      delayTimeout.reset(action.payload.uuid);
      delayAnimation.clear(action.payload.uuid);
    }
    if (action.type === types.WS_MESSAGE_REMOVE && isAnimated(action)) {
      dispatch({ type: types.WS_MESSAGE_REMOVING, payload: action.payload });
      delayAnimation.set(action.payload.uuid, () => {
        next(_.unset('meta.withAnimation', action));
      }, MESSAGE_TRANSITION_OUT_DELAY);
      return action;
    }
    if (action.type === types.WS_MESSAGE_ADD) {
      next(action);
      const { containerId, messages } = action.payload;
      messages.forEach((msg) => {
        delayTimeout.set(msg.uuid, () => {
          dispatch(removeWithAnimation(containerId, msg.uuid));
        }, MESSAGE_LIFE_DELAY);
      });
      return action;
    }
    return next(action);
  };
}
