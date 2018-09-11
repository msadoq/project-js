const {
  getAll,
  getValue,
  getMaxValue,
  getMaxValues,
  getByField,
  getOrCreate,
  init,
  getStringByValue,
} = require('./stringToIntegerMapSingleton');

describe('common:stringToIntegerMapSingleton', () => {
  beforeAll(() => {
    init(() => {});
  });
  it('should map be initialise by default with configuration', () => {
    init(() => {});
    expect(getAll()).toEqual(
      {
        monitoringState: {
          nominal: 0,
          warning: 1,
          danger: 2,
          severe: 3,
          critical: 4,
          outOfRange: 5,
        },
      });
  });
  it('should return map for a given existing field', () => {
    expect(getByField('monitoringState')).toEqual(
      {
        nominal: 0,
        warning: 1,
        danger: 2,
        severe: 3,
        critical: 4,
        outOfRange: 5,
      }
    );
  });
  it('should return map for a given field', () => {
    expect(getByField('test')).toEqual(false);
  });
  it('should return the value for the given field dans string', () => {
    expect(getValue('monitoringState', 'warning')).toEqual(1);
  });
  it('should return false unknown field', () => {
    expect(getValue('test', 'warning')).toEqual(0);
  });
  it('should return false unknown string', () => {
    expect(getValue('monitoringState', 'test')).toEqual(0);
  });
  it('should return the max known value  for the field (here 5)', () => {
    expect(getMaxValues('monitoringState')).toEqual({ monitoringState: 5 });
  });
  it('should return the max known value  for the field (here 5)', () => {
    expect(getMaxValue('monitoringState')).toEqual(5);
  });
  it('should return the max known value for the field here unknonw field (-1)', () => {
    expect(getMaxValue('test')).toEqual(-1);
  });
  it('should return the value for a given field and string', () => {
    expect(getOrCreate('monitoringState', 'warning')).toEqual(1);
  });
  it('should return the value for a given field and string and create entry test: 6 in monitoring state', () => {
    expect(getOrCreate('monitoringState', 'test')).toEqual(6);
    expect(getAll()).toEqual(
      {
        monitoringState: {
          nominal: 0,
          warning: 1,
          danger: 2,
          severe: 3,
          critical: 4,
          outOfRange: 5,
          test: 6,
        },
      }
    );
  });
  it('should return the value for a given field and string and create test: { warning: 0 } at the root of the map', () => {
    expect(getOrCreate('test', 'warning')).toBeFalsy();
    expect(getAll()).toEqual(
      {
        monitoringState: {
          nominal: 0,
          warning: 1,
          danger: 2,
          severe: 3,
          critical: 4,
          outOfRange: 5,
          test: 6,
        },
        test: {
          warning: 0,
        },
      }
    );
  });
  it('should return the string from a given value and field', () => {
    expect(getStringByValue('monitoringState', 1)).toEqual('warning');
  });
});
