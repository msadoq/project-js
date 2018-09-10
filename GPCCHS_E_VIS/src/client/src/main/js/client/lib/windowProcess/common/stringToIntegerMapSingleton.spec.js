const {
  getAll,
  getValue,
  getByField,
  set,
} = require('./stringToIntegerMapSingleton');

describe('common:stringToIntegerMapSingleton', () => {
  it('should map be initialise by default with configuration', () => {
    expect(getAll())
      .toEqual({});
  });
  it('should map be initialise by default with configuration', () => {
    const singleton = {
      monitoringState: {
        nominal: 0,
        warning: 1,
        danger: 2,
        severe: 3,
        critical: 4,
        outOfRange: 5,
      },
    };
    set(singleton);
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
      }
    );
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
    expect(getByField('test'))
      .toEqual(false);
  });
  it('should return the value for the given field dans string', () => {
    expect(getValue('monitoringState', 'warning'))
      .toEqual(1);
  });
  it('should return false unknown field', () => {
    expect(getValue('test', 'warning'))
      .toEqual(false);
  });
  it('should return false unknown string', () => {
    expect(getValue('monitoringState', 'test'))
      .toEqual(false);
  });
});
