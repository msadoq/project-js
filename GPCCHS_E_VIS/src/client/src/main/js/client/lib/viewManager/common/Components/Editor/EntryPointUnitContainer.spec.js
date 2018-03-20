import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import EntryPointUnitContainer from './EntryPointUnitContainer';

const stubState = {
  domains: [
    {
      domainId: 13214,
    },
  ],
  sessions: [
    {
      name: 'master',
      id: 1321,
    },
  ],
  timelines: {
    'timeline-uuid': {
      sessionName: 'master',
      id: 'timeline-id',
    },
  },
  catalogs: {
    'domain-id-session-id': [
      {
        name: 'catalogName',
        items: [
          {
            name: 'itemName',
            unit: 'J',
          },
        ],
      },
    ],
  },
  pages: {
    'page-id': {
      domainName: 'pageDomainName',
    },
  },
  views: {
    'view-id': {
      domainName: 'viewDomainName',
    },
  },
  hsc: {
    domainName: 'viewDomainName',
  },
  comObjectMap: {
    fields: [],
  },
};

const propsStub = {
  pageId: 'page1',
  viewId: 'view1',
  entryPoint: {},
  updateEntryPoint: () => null,
  panels: [],
  updateViewSubPanels: () => null,
  remove: () => null,
  updateViewPanels: () => null,
  removeEntryPoint: () => null,
  entryPointsPanels: {},
  connectedData: {
    domain: 13214,
    catalog: 'catalogName',
    timeline: 'timeline-id',
    catalogItem: 'itemName',
  },
};
describe('EntryPointUnitContainer :: render', () => {
  test('EntryPointUnitContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(EntryPointUnitContainer);
    const store = createStore(state => state, stubState);
    const tree = renderer.create(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
