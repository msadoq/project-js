import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import DomainField from 'viewManager/commonEditor/Fields/DomainField';
import { shallow } from 'enzyme';

const propsStub = {
  domainName: 'domain',
  domains: [{
    name: 'DomainFieldName',
    items: [],
  }],
  onChange: () => {},
};
describe('DomainField :: render', () => {
  test('DomainField :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(DomainField);
    const store = createStore(state => state, {});
    const tree = shallow(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
