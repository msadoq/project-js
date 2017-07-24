import configureMockStore from 'redux-mock-store';
import prepareRange from './prepareRange';

const mockStore = configureMockStore([prepareRange()]);

describe('store:middlewares:prepareRange', () => {
  const store = mockStore();

  test('dummy test [prepareRANGE]', () => {
    expect(store.getActions()).toMatchSnapshot();
  });
});
