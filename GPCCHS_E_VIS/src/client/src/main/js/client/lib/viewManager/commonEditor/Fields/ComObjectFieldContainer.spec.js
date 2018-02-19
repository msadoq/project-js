import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ComObjectFieldContainer from './ComObjectFieldContainer';

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
  timelineId: 'timeline-id',
  domainId: 'domain-id',
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

describe('ComObjectFieldContainer :: render', () => {
  test('should render correctly with valid data', () => {
    const store = createStore(
      (state = {}) => state,
      stubState
    );
    const Decorated = reduxForm({ form: 'testsdfForm' })(ComObjectFieldContainer);
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
