import configureMockStore from 'redux-mock-store';
import createPlayerMiddleware from '.';


describe('store:middlewares:player', () => {
  test('createPlayerMiddleware should return a function', () => {
    expect(createPlayerMiddleware()).toBeAFunction();
  });
  const mockStore = configureMockStore([createPlayerMiddleware(500, 0.1)]);
  describe('player middleware', () => {
    const store = mockStore();
  });
});
