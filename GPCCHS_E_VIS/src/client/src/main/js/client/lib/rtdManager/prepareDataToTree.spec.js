// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add a tree component and format inspector data to be consumed
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add styles for the inspector
// VERSION : 1.1.2 : DM : #5822 : 16/03/2017 : resolve a rtd link in the inspector
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Migrate all rtdManager test for jest
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

import prepareDataToTree from './prepareDataToTree';

describe('rtdManager/prepareDataToTree', () => {
  test('works', () => {
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

    expect(prepareDataToTree(data, { rootName: 'root' })).toEqual(expect.objectContaining({
      path: [],
      name: 'root',
      type: 'object',
      children: [
        {
          parentName: 'root',
          path: ['children', '0'],
          name: 'str',
          type: 'key',
          value: 'str1',
        }, {
          path: ['children', '1'],
          name: 'obj',
          type: 'object',
          parentName: 'root',
          children: [{
            path: ['children', '1', 'children', '0'],
            parentName: 'obj',
            name: 'key1',
            type: 'key',
            value: 'val1',
          }, {
            path: ['children', '1', 'children', '1'],
            name: 'key2',
            parentName: 'obj',
            type: 'key',
            value: 'val2',
          }],
        }, {
          path: ['children', '2'],
          name: 'arr',
          type: 'array',
          parentName: 'root',
          children: [{
            path: ['children', '2', 'children', '0'],
            name: 0,
            type: 'item',
            parentName: 'arr',
            value: 'item1',
          }, {
            path: ['children', '2', 'children', '1'],
            name: 1,
            type: 'item',
            parentName: 'arr',
            value: 'item2',
          }],
        }, {
          path: ['children', '3'],
          name: 'objArr',
          type: 'array',
          parentName: 'root',
          children: [{
            path: ['children', '3', 'children', '0'],
            name: 0,
            type: 'objectItem',
            parentName: 'objArr',
            children: [{
              path: ['children', '3', 'children', '0', 'children', '0'],
              name: 'key3',
              type: 'key',
              value: 'val3',
              parentName: 0,
            }],
          }, {
            parentName: 'objArr',
            path: ['children', '3', 'children', '1'],
            name: 1,
            type: 'objectItem',
            children: [{
              path: ['children', '3', 'children', '1', 'children', '0'],
              name: 'key4',
              type: 'key',
              value: 'val4',
              parentName: 1,
            }, {
              path: ['children', '3', 'children', '1', 'children', '1'],
              name: 'Link',
              type: 'link',
              value: 'foo@foo@foo',
              parentName: 1,
            }],
          }],
        }, {
          path: ['children', '4'],
          name: 'Link',
          type: 'link',
          value: 'bar@bar@bar',
          parentName: 'root',
        },
      ],
    }));
  });
});
