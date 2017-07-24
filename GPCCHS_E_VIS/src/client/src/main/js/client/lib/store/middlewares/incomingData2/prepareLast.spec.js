import configureMockStore from 'redux-mock-store';
import prepareLast from './prepareLast';

const mockStore = configureMockStore([prepareLast()]);

describe('store:middlewares:prepareLast', () => {
  const store = mockStore();

  test('dummy test [prepareLAST]', () => {
    expect(store.getActions()).toMatchSnapshot();
  });
});
