import * as actions from './viewData';

describe('store:actions:viewData', () => {
  describe('importPayload', () => {
    test('exists', () => {
      expect(actions.importPayload).toBeAFunction();
    });
  });
  describe('removeAllData', () => {
    test('exists', () => {
      expect(actions.removeAllData).toBeAFunction();
    });
  });
  describe('updateViewData', () => {
    test('exists', () => {
      expect(actions.updateViewData).toBeAFunction();
    });
  });
});
