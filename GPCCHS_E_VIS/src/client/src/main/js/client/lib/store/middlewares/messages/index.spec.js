import configureMockStore from 'redux-mock-store';
import makeMessagesMiddleware from './';

const mockStore = configureMockStore([makeMessagesMiddleware()]);

describe('store:middlewares:messages', () => {
  jest.useFakeTimers();
  const store = mockStore();

  const addMessage = () => ({
    type: 'WS_MESSAGE_ADD',
    payload: {
      containerId: 'global',
      type: 'danger',
      messages: [{ content: 'the_message', uuid: 'the_uuid' }],
    },
  });

  afterEach(() => {
    store.clearActions();
  });

  test('add a message then wait for remove it', () => {
    store.dispatch(addMessage());
    expect(store.getActions()).toMatchSnapshot();

    jest.runOnlyPendingTimers();
    expect(store.getActions()).toMatchSnapshot();

    jest.runOnlyPendingTimers();
    expect(store.getActions()).toMatchSnapshot();
  });

  test('add a message then cancel removing', () => {
    store.dispatch(addMessage());
    expect(store.getActions()).toMatchSnapshot();

    jest.runOnlyPendingTimers();
    expect(store.getActions()).toMatchSnapshot();

    store.dispatch({
      type: 'WS_MESSAGE_CANCEL_REMOVING',
      payload: {
        containerId: 'global',
        uuid: 'the_uuid',
      },
    });
    expect(store.getActions()).toMatchSnapshot();

    jest.runOnlyPendingTimers();
    expect(store.getActions()).toMatchSnapshot();

    jest.runOnlyPendingTimers();
    expect(store.getActions()).toMatchSnapshot();
  });

  test('add a message then remove it', () => {
    store.dispatch(addMessage());
    expect(store.getActions()).toMatchSnapshot();

    store.dispatch({
      type: 'WS_MESSAGE_REMOVE',
      payload: {
        containerId: 'global',
        uuid: 'the_uuid',
      },
    });
    jest.runAllTimers();
    expect(store.getActions()).toMatchSnapshot();
  });
});
