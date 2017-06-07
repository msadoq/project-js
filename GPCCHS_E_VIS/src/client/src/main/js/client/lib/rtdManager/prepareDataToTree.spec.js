import '../common/test';
import prepareDataToTree from './prepareDataToTree';

describe('rtdManager/prepareDataToTree', () => {
  it('works', () => {
    const data = {
      str: 'str1',
      obj: {
        key1: 'val1',
        key2: 'val2',
      },
      arr: ['item1', 'item2'],
      objArr: [{ key3: 'val3' }, { key4: 'val4', Link: 'foo@foo@foo' }],
      Link: 'bar@bar@bar',
    };

    expect(prepareDataToTree(data, { rootName: 'root' })).have.properties({
      path: [],
      name: 'root',
      type: 'object',
      children: [
        {
          path: ['children', '0'],
          name: 'str',
          type: 'key',
          value: 'str1',
        }, {
          path: ['children', '1'],
          name: 'obj',
          type: 'object',
          children: [{
            path: ['children', '1', 'children', '0'],
            name: 'key1',
            type: 'key',
            value: 'val1',
          }, {
            path: ['children', '1', 'children', '1'],
            name: 'key2',
            type: 'key',
            value: 'val2',
          }],
        }, {
          path: ['children', '2'],
          name: 'arr',
          type: 'array',
          children: [{
            path: ['children', '2', 'children', '0'],
            name: 0,
            type: 'item',
            value: 'item1',
          }, {
            path: ['children', '2', 'children', '1'],
            name: 1,
            type: 'item',
            value: 'item2',
          }],
        }, {
          path: ['children', '3'],
          name: 'objArr',
          type: 'array',
          children: [{
            path: ['children', '3', 'children', '0'],
            name: 0,
            type: 'objectItem',
            children: [{
              path: ['children', '3', 'children', '0', 'children', '0'],
              name: 'key3',
              type: 'key',
              value: 'val3',
            }],
          }, {
            path: ['children', '3', 'children', '1'],
            name: 1,
            type: 'objectItem',
            children: [{
              path: ['children', '3', 'children', '1', 'children', '0'],
              name: 'key4',
              type: 'key',
              value: 'val4',
            }, {
              path: ['children', '3', 'children', '1', 'children', '1'],
              name: 'Link',
              type: 'link',
              value: 'foo@foo@foo',
            }],
          }],
        }, {
          path: ['children', '4'],
          name: 'Link',
          type: 'link',
          value: 'bar@bar@bar',
        },
      ],
    });
  });
});
