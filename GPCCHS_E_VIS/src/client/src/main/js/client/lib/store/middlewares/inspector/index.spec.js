import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from 'store/types';
import makeInspectorMiddleware from './';

const rtdManager = {
  prepareDataToTree: data => ({ ...data, prepared: true }),
  getTelemetryStaticElements: ({ sessionId, domainId }, parameterName, cb) => {
    if (parameterName === 'error') {
      return cb(new Error('error'));
    } else if (parameterName === 'nodata') {
      return cb(null, null);
    }
    return cb(null, { sessionId, domainId, parameterName });
  },
};

const mockStore = configureMockStore([thunk, makeInspectorMiddleware(rtdManager)]);

const askOpenInspector = (epId = 'myEp', catalog = 'Reporting', parameterName = 'param') => ({
  type: types.HSC_ASK_OPEN_INSPECTOR,
  payload: {
    pageId: 'p1',
    viewId: 'v1',
    type: 'MimicView',
    options: {
      epName: 'ep',
      epId,
      dataId: {
        parameterName,
        catalog,
        sessionId: 'sessionId',
        domainId: 'domainId',
      },
      field: 'field',
    },
  },
});

describe('store:serverProcess:middlewares:inspector', () => {
  const store = mockStore({ inspector: { generalData: { epId: 'ep1' } } });

  afterEach(() => {
    store.clearActions();
  });

  test('simply open inspector', () => {
    store.dispatch(askOpenInspector('ep1'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open inspector and get telemetry static elements', () => {
    store.dispatch(askOpenInspector());
    expect(store.getActions()).toMatchSnapshot();
  });

  test('getTelemetryStaticElements give an error', () => {
    store.dispatch(askOpenInspector(undefined, undefined, 'error'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('getTelemetryStaticElements give no data', () => {
    store.dispatch(askOpenInspector(undefined, undefined, 'nodata'));
    expect(store.getActions()).toMatchSnapshot();
  });
});
