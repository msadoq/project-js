import fetch from 'isomorphic-fetch';

export const ADD_VIEW = 'ADD_VIEW';
export const DEL_VIEW = 'DEL_VIEW';
export const SWITCH_SUB_VISIBILITY = 'SWITCH_SUB_VISIBILITY';
export const WAIT_SUB = 'WAIT_SUB';
export const ADD_SUB = 'ADD_SUB';

export function addView(viewId) {
  return {
    type: ADD_VIEW,
    viewId,
  };
}
export function delView(viewId) {
  return {
    type: DEL_VIEW,
    viewId,
  };
}

export function switchSubVisibility(viewId, subscriptionId) {
  return {
    type: SWITCH_SUB_VISIBILITY,
    viewId,
    subscriptionId,
  };
}

function waitSub(viewId, subscriptionId, waiting) {
  return {
    type: WAIT_SUB,
    viewId,
    subscriptionId,
    waiting,
  };
}

function addSub(viewId, subscriptionId) {
  return {
    type: ADD_SUB,
    viewId,
    subscriptionId,
  };
}

export function requestSub(viewId, subscription) {
  return (dispatch) => {
    dispatch(waitSub(viewId, subscription, true));
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      },
      body: JSON.stringify(subscription),
    };

    return fetch('http://127.0.0.1:1337/api/subscriptions', options)
      .then((res) => res.json())
      .then((body) => {
        const subId = `sub${body.subscriptionId}`;
        dispatch(addSub(viewId, subId));
        dispatch(switchSubVisibility(viewId, subId));
        dispatch(waitSub(viewId, subscription, false));
      });
  };
}
