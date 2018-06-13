import {
  isPusView,
  VM_VIEW_PUS11,
  VM_VIEW_TEXT,
} from './constants';

describe('viewManager/constants', () => {
  it('should be true', () => {
    expect(isPusView(VM_VIEW_PUS11)).toBe(true);
  });
  it('should be false with invalid name', () => {
    expect(isPusView('bla')).toBe(false);
  });
  it('should be false with empty name', () => {
    expect(isPusView()).toBe(false);
  });
  it('should be false with non PUS view', () => {
    expect(isPusView(VM_VIEW_TEXT)).toBe(false);
  });
});
