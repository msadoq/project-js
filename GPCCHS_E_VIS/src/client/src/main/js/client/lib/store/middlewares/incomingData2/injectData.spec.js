import configureMockStore from 'redux-mock-store';
import injectData from './injectData';

const mockStore = configureMockStore([injectData()]);

describe('store:middlewares:injectData', () => {
  const store = mockStore();

  test('dummy test [injectData]', () => {
    expect(store.getActions()).toMatchSnapshot();
  });
});
