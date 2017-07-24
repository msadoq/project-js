import configureMockStore from 'redux-mock-store';
import retrieveLast from './retrieveLast';

const mockStore = configureMockStore([retrieveLast()]);

describe('store:middlewares:retrieveLast', () => {
  const store = mockStore();

  test('dummy test [retrieveLast]', () => {
    expect(store.getActions()).toMatchSnapshot();
  });
});
