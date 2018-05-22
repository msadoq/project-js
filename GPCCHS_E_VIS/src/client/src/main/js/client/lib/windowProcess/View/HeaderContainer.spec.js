import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HeaderContainer from 'windowProcess/View/HeaderContainer';

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
  timebars: {
    tb1: {
      masterId: 'masterId',
    },
  },
  catalogs: {
    'domain-id-session-id': [
      {
        name: 'catalogName',
      },
    ],
  },
  windows: {
    w1: {
      focusedPage: 'page-id',
      pages: ['page-id'],
    },
  },
  pages: {
    'page-id': {
      domainName: 'pageDomainName',
      properties: [],
      layout: [
        {
          h: 10,
          i: 'c691a648-36c3-4c5a-b131-07aa86977437',
          w: 8,
          x: 0,
          y: 0,
        },
        {
          h: 8,
          i: '225cce85-7d35-456c-97e9-be47a977e373',
          w: 8,
          x: 0,
          y: 10,
        },
      ],
    },
  },
  views: {
    'view-id': {
      domainName: 'viewDomainName',
      type: 'TextView',
    },
  },
  hsc: {
    domainName: 'viewDomainName',
    detachWindow: true,
    attachWindow: 'attachWindow',
  },
  comObjectMap: {
    fields: [],
  },
};

const propsStub = {
  viewId: 'view-id',
  pageId: 'page-id',
  collapseView: false,
  saveView: true,
  onContextMenu: () => {},
};

// we can just pass through the component since we pass dispatch prop directly
jest.mock('redux-form', () => ({
  Field: 'Field',
  reduxForm: options => (
    Form => (props) => {
      if (options.validate) {
        options.validate({}, props);
      }

      return <Form {...props} />;
    }
  ),
}));
jest.mock('windowProcess/common/colors', () => ({
  getColorWithDomainDetermination: () => '#CCC',
}));
describe('windowProcess', () => {
  describe('windowProcess :: View', () => {
    describe('windowProcess :: View:: HeaderContainer', () => {
      test('should render correctly with valid data', () => {
        const store = createStore(
          (state = {}) => state,
          stubState
        );
        const Decorated = reduxForm({ form: 'testForm' })(HeaderContainer);
        const component = renderer.create(
          <Provider store={store}>
            <Decorated
              {...propsStub}
            />
          </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
