import { NODE_TYPE_KEY, NODE_TYPE_OBJECT } from 'constants';
import { getStructuredData, unboxPacketAttributes } from './selectors';

describe('getStructuredData', () => {
  test('unknown leaf', () => {
    const data = [
      {
        name: 'GENE_AM_CCSDSVERS1',
        extractedValue: 1,
        rawValue: 2,
        convertedValue: 5,
      }, {
        name: 'GENE_AM_CCSDSVERS2',
        extractedValue: 12,
        rawValue: 32,
        convertedValue: 'a5',
      }, {
        name: 'GENE_AM_CCSDSVERS1',
        extractedValue: 11,
      }, {
        name: 'GENE_AM_CCSDSVERS2',
        extractedValue: 112,
        rawValue: 132,
        convertedValue: '1a6',
      }, {
        name: 'GENE_AM_CCSDSVERS3',
        rawValue: 12,
        convertedValue: 5,
      }, {
        name: 'GENE_AM_CCSDSVERS3',
        rawValue: 'nest',
        convertedValue: '0x1346F65FA',
      }, {
        name: 'GENE_AM_CCSDSVERS1',
        extractedValue: 48,
      }, {
        name: 'GENE_AM_CCSDSVERS2',
        extractedValue: 40,
        rawValue: 'Nio',
      },
    ];
    const structure = { itemName: 'Root', children: [{ itemName: 'POUET', unit: 'V' }] };
    expect(getStructuredData(structure, data)).toEqual({
      name: 'Root',
      type: NODE_TYPE_OBJECT,
      toggled: true,
      children: [{
        name: 'POUET',
        type: NODE_TYPE_KEY,
      }],
    });
  });
  test('only one occurence for the leaf => takes it', () => {
    const data = [
      {
        name: { value: 'GENE_AM_CCSDSVERS2' },
        extractedValue: { value: 12 },
        rawValue: { value: 32 },
        convertedValue: { value: 'a5' },
      },
    ];
    const structure = {
      itemName: 'Root',
      children: [{
        itemName: 'GENE_AM_CCSDSVERS2',
        unit: 'V',
      }],
    };
    expect(getStructuredData(structure, data)).toEqual({
      name: 'Root',
      type: NODE_TYPE_OBJECT,
      toggled: true,
      children: [{
        name: 'GENE_AM_CCSDSVERS2',
        type: NODE_TYPE_KEY,
        value: 'a5 V',
      }],
    });
  });
  test('several consecutive occurences for the leaf => takes them all', () => {
    const data = [
      {
        name: { value: 'GENE_AM_CCSDSVERS2' },
        extractedValue: { value: 12 },
        rawValue: { value: 32 },
        convertedValue: { value: 'a5' },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS2' },
        convertedValue: { value: 13 },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS2' },
        convertedValue: { value: 14 },
      },
    ];
    const structure = {
      itemName: 'Root',
      children: [{
        itemName: 'GENE_AM_CCSDSVERS2',
        unit: 'V',
      }],
    };
    expect(getStructuredData(structure, data)).toEqual({
      name: 'Root',
      type: NODE_TYPE_OBJECT,
      toggled: true,
      children: [
        {
          name: 'GENE_AM_CCSDSVERS2',
          type: NODE_TYPE_KEY,
          value: 'a5 V',
        },
        {
          name: 'GENE_AM_CCSDSVERS2',
          type: NODE_TYPE_KEY,
          value: '13 V',
        },
        {
          name: 'GENE_AM_CCSDSVERS2',
          type: NODE_TYPE_KEY,
          value: '14 V',
        }],
    });
  });
  test('full example', () => {
    const data = [
      {
        name: { value: 'GENE_AM_CCSDSVERS1' },
        extractedValue: { value: 1 },
        rawValue: { value: 2 },
        convertedValue: { value: 5 },
      }, {
        name: { value: 'GENE_AM_CCSDSVERS2' },
        extractedValue: { value: 12 },
        rawValue: { value: 32 },
        convertedValue: { value: 'a5' },
      }, {
        name: { value: 'GENE_AM_CCSDSVERS2' },
        extractedValue: { value: 112 },
        rawValue: { value: 132 },
        convertedValue: { value: '1a6' },
      }, {
        name: { value: 'GENE_AM_CCSDSVERS3' },
        rawValue: { value: 12 },
        convertedValue: { value: 5 },
      }, {
        name: { value: 'GENE_AM_CCSDSVERS3' },
        rawValue: { value: 'nest' },
        convertedValue: { value: '0x1346F65FA' },
      }, {
        name: { value: 'GENE_AM_CCSDSVERS4' },
        convertedValue: { value: 48 },
      }, {
        name: { value: 'GENE_AM_CCSDSVERS5' },
        convertedValue: { value: 40 },
        rawValue: { value: 'Nio' },
      },
    ];

    const structure = {
      itemName: 'Root',
      children: [
        {
          itemName: 'Bidule',
          children: [
            { itemName: 'GENE_AM_CCSDSVERS1', unit: '°C' },
            { itemName: 'GENE_AM_CCSDSVERS2', unit: 'km' },
          ],
        },
        {
          itemName: 'Machin',
          children: [
            { itemName: 'GENE_AM_CCSDSVERS3', unit: 'V' },
          ],
        },
      ],
    };
    expect(getStructuredData(structure, data)).toEqual({
      name: 'Root',
      type: NODE_TYPE_OBJECT,
      toggled: true,
      children: [
        {
          name: 'Bidule',
          type: NODE_TYPE_OBJECT,
          toggled: true,
          children: [
            {
              name: 'GENE_AM_CCSDSVERS1',
              type: NODE_TYPE_KEY,
              value: '5 °C',

            },
            {
              name: 'GENE_AM_CCSDSVERS2',
              type: NODE_TYPE_KEY,
              value: 'a5 km',
            },
            {
              name: 'GENE_AM_CCSDSVERS2',
              type: NODE_TYPE_KEY,
              value: '1a6 km',
            },
          ],
        },
        {
          name: 'Machin',
          type: NODE_TYPE_OBJECT,
          toggled: true,
          children: [
            {
              name: 'GENE_AM_CCSDSVERS3',
              type: NODE_TYPE_KEY,
              value: '5 V',
            },
            {
              name: 'GENE_AM_CCSDSVERS3',
              type: NODE_TYPE_KEY,
              value: '0x1346F65FA V',
            },
          ],
        },
      ],
    });
  });
  test('full example 2', () => {
    const data = [
      {
        name: { value: 'GENE_AM_CCSDSVERS1' },
        convertedValue: { value: 12 },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS1' },
        convertedValue: { value: 23 },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS2' },
        convertedValue: { value: 0 },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS2' },
        convertedValue: { value: 610 },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS3' },
        convertedValue: { value: 12.1 },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS4' },
        rawValue: { value: 0 },
        convertedValue: { value: 0 },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS4' },
        convertedValue: { value: 1 },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS5' },
        convertedValue: { value: 0 },
        rawValue: { value: 'Niobé' },
      },
      {
        name: { value: 'GENE_AM_CCSDSVERS5' },
        convertedValue: { value: 'a31' },
      },
    ];

    const structure = {
      itemName: 'Root',
      children: [
        {
          itemName: 'Bidule',
          children: [
            { itemName: 'GENE_AM_CCSDSVERS1', unit: 'V' },
            { itemName: 'GENE_AM_CCSDSVERS2', unit: 'V' },
            { itemName: 'GENE_AM_CCSDSVERS3', unit: 'V' },
          ],
        },
        {
          itemName: 'Machin',
          children: [
            { itemName: 'GENE_AM_CCSDSVERS4', unit: 'V' },
            { itemName: 'GENE_AM_CCSDSVERS5', unit: 'V' },
          ],
        },
      ],
    };
    expect(getStructuredData(structure, data)).toEqual({
      name: 'Root',
      type: NODE_TYPE_OBJECT,
      toggled: true,
      children: [
        {
          name: 'Bidule',
          type: NODE_TYPE_OBJECT,
          toggled: true,
          children: [
            {
              name: 'GENE_AM_CCSDSVERS1',
              type: NODE_TYPE_KEY,
              value: '12 V',
            }, {
              name: 'GENE_AM_CCSDSVERS1',
              type: NODE_TYPE_KEY,
              value: '23 V',
            }, {
              name: 'GENE_AM_CCSDSVERS2',
              type: NODE_TYPE_KEY,
              value: '0 V',
            }, {
              name: 'GENE_AM_CCSDSVERS2',
              type: NODE_TYPE_KEY,
              value: '610 V',
            }, {
              name: 'GENE_AM_CCSDSVERS3',
              type: NODE_TYPE_KEY,
              value: '12.1 V',
            },
          ],
        },
        {
          name: 'Machin',
          type: NODE_TYPE_OBJECT,
          toggled: true,
          children: [
            {
              name: 'GENE_AM_CCSDSVERS4',
              type: NODE_TYPE_KEY,
              value: '0 V',
            }, {
              name: 'GENE_AM_CCSDSVERS4',
              type: NODE_TYPE_KEY,
              value: '1 V',
            }, {
              name: 'GENE_AM_CCSDSVERS5',
              type: NODE_TYPE_KEY,
              value: '0 V',
            }, {
              name: 'GENE_AM_CCSDSVERS5',
              type: NODE_TYPE_KEY,
              value: 'a31 V',
            },
          ],
        },
      ],
    });
  });

  describe('unboxPacketAttributes', () => {
    expect(unboxPacketAttributes({
      convertedValue: { type: 'ulong', value: 0 },
      extractedValue: { type: 'double', value: '73.45824635' },
    })).toEqual({
      convertedValue: 0,
      extractedValue: '73.45824635',
    });
  });
});
