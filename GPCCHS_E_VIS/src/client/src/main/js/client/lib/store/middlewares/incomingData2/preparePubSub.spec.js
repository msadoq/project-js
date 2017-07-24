import configureMockStore from 'redux-mock-store';
import preparePubSub from './preparePubSub';

const mockStore = configureMockStore([preparePubSub()]);

describe('store:middlewares:preparePubSub', () => {
  const store = mockStore();

  test('dummy test [preparePUBSUB]', () => {
    expect(store.getActions()).toMatchSnapshot();
  });
});
