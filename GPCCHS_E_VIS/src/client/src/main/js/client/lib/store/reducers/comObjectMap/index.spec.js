import setComObjectMap from 'store/actions/comObjectMap';
import reducer, { getFieldsListByComObjectName } from '.';

const state = {
  comObjectMap: {
    fields: {
      myComObject: [
        {
          name: 'myField1',
          type: 'myType1',
        }, {
          name: 'myField2',
          type: 'myType2',
        },
      ],
    },
  },
};

const myMap = {
  myComObject: [
    {
      name: 'myField1',
      type: 'myType1',
    }, {
      name: 'myField2',
      type: 'myType2',
    },
  ],
};

describe('store:comObjectMap:reducer', () => {
  test('should returns initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toHaveProperty('fields', {});
  });
  test('should set comObjectMap', () => {
    expect(reducer(undefined, setComObjectMap(myMap)).fields).toBe(myMap);
  });
});

describe('store:editor:selector', () => {
  test('should return fieldsArray', () => {
    expect(getFieldsListByComObjectName(state, 'myComObject')).toEqual(
      [
        {
          name: 'myField1',
          type: 'myType1',
        }, {
          name: 'myField2',
          type: 'myType2',
        },
      ]
    );
  });
  test('should return undefined', () => {
    expect(getFieldsListByComObjectName(state, 'myAbsentComObject')).toEqual(undefined);
  });
  test('should return undefined when calling with undefined', () => {
    expect(getFieldsListByComObjectName(state, undefined)).toEqual(undefined);
  });
  test('should return undefined when calling with null', () => {
    expect(getFieldsListByComObjectName(state, null)).toEqual(undefined);
  });
});
