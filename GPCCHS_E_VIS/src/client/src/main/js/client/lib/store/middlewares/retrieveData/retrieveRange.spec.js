import configureMockStore from 'redux-mock-store';
import retrieveRange from './retrieveRange';

const mockStore = configureMockStore([retrieveRange()]);

describe('store:middlewares:retrieveRange', () => {
  const store = mockStore();

  test('dummy test [retrieveRange]', () => {
    expect(store.getActions()).toMatchSnapshot();
  });
});
