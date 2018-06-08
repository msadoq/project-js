import { freezeArgs, freezeMe } from 'common/jest';
import {
  WS_CATALOGS_ASK,
  WS_CATALOGS_ADD,
  WS_CATALOG_ITEMS_ASK,
  WS_CATALOG_ITEMS_ADD,
  WS_COM_OBJECTS_ASK,
  WS_COM_OBJECTS_ADD,
} from 'store/types';
import catalogsReducer, {
  getCatalogsByDomainIdAndSessionId,
  getTupleId,
  getCatalogByName,
  getCatalogItems,
  getCatalogIndexByName,
  getCatalogItemByName,
  getCatalogItemIndexByName,
  getCatalogsByTupleId,
  getCatalogItemComObjects,
  REQUESTING,
} from '.';
import { getUnitByItemName, getStructuredData, unboxPacketAttributes } from './index';
import { NODE_TYPE_OBJECT, NODE_TYPE_KEY } from "constants";

const reducer = freezeArgs(catalogsReducer);
const tupleId = 'domain-id-session-id';
const comObject = {
  name: 'comObjectName',
};
const item = {
  name: 'itemName',
  comObjects: [comObject],
};
const items = [item];
const catalog = {
  name: 'catalogName',
  items,
};
const state = {
  domains: [
    {
      domainId: 'domain-id',
    },
  ],
  sessions: [
    {
      name: 'master',
      id: 'session-id',
    },
  ],
  timelines: {
    'timeline-uuid': {
      sessionName: 'master',
      id: 'timeline-id',
    },
  },
  catalogs: {
    'domain-id-session-id': [catalog],
  },
};
const state2 = {
  'domain-id-session-id': [
    {
      name: 'catalogName',
      items: REQUESTING,
    },
  ],
};

describe('store:catalogs:reducer', () => {
  test('catalogsReducer :: freeze state and return state on unknown action', () => {
    expect(catalogsReducer(freezeMe(state), { type: undefined }))
      .toEqual(state);
  });
  test('catalogsReducer :: WS_CATALOGS_ASK', () => {
    expect(catalogsReducer(freezeMe({}), {
      type: WS_CATALOGS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'session-id',
      },
    })).toEqual({
      'domain-id-session-id': REQUESTING,
    });
  });
  test('catalogsReducer :: WS_CATALOGS_ADD', () => {
    expect(catalogsReducer(freezeMe({}), {
      type: WS_CATALOGS_ADD,
      payload: {
        tupleId: 'domain-id-session-id',
        catalogs: ['catalog'],
      },
    })).toEqual({
      'domain-id-session-id': ['catalog'],
    });
  });
  test('catalogsReducer :: WS_CATALOG_ITEMS_ASK :: undefined catalog', () => {
    expect(catalogsReducer(freezeMe({}), {
      type: WS_CATALOG_ITEMS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'session-id',
        name: 'undefined',
      },
    })).toEqual({});
  });
  test('catalogsReducer :: WS_CATALOG_ITEMS_ASK :: not found catalog', () => {
    expect(catalogsReducer(freezeMe({
      'domain-id-session-id': [
        {
          name: 'catalogName',
        },
      ],
    }), {
      type: WS_CATALOG_ITEMS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'session-id',
        name: 'undefined',
      },
    })).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
        },
      ],
    });
  });
  test('catalogsReducer :: WS_CATALOG_ITEMS_ASK :: add an ask request to catalog items', () => {
    expect(catalogsReducer(freezeMe({
      'domain-id-session-id': [
        {
          name: 'catalogName',
        },
      ],
    }), {
      type: WS_CATALOG_ITEMS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'session-id',
        name: 'catalogName',
      },
    })).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: REQUESTING,
        },
      ],
    });
  });
  test('catalogsReducer :: WS_CATALOG_ITEMS_ADD :: tupleId not found', () => {
    expect(catalogsReducer(freezeMe({
      'domain-id-session-id': [
        {
          name: 'catalogName',
        },
      ],
    }), {
      type: WS_CATALOG_ITEMS_ADD,
      payload: {
        tupleId: 'undefined',
      },
    })).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
        },
      ],
    });
  });
  test('catalogsReducer :: WS_CATALOG_ITEMS_ADD :: no requesting defined, set anyway', () => {
    expect(catalogsReducer(freezeMe({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: REQUESTING,
        },
      ],
    }), {
      type: WS_CATALOG_ITEMS_ADD,
      payload: {
        tupleId: 'domain-id-session-id',
        name: 'catalogName',
        items: ['items'],
      },
    })).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: ['items'],
        },
      ],
    });
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ASK :: undefined domain', () => {
    expect(catalogsReducer(freezeMe(state2), {
      type: WS_COM_OBJECTS_ASK,
      payload: {
        domainId: 'undefined',
        sessionId: 'session-id',
        name: 'catalogName',
      },
    })).toEqual(state2);
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ASK :: undefined session', () => {
    expect(catalogsReducer(freezeMe(state2), {
      type: WS_COM_OBJECTS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'undefined',
        name: 'catalogName',
      },
    })).toEqual(state2);
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ASK :: undefined catalog', () => {
    expect(catalogsReducer(freezeMe(state2), {
      type: WS_COM_OBJECTS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'session-id',
        name: 'undefined',
      },
    })).toEqual(state2);
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ASK :: catalog not found', () => {
    expect(catalogsReducer(freezeMe({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: [
            {
              name: 'undefined',
            },
          ],
        },
      ],
    }), {
      type: WS_COM_OBJECTS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'session-id',
        name: 'catalogName',
      },
    })).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: [
            {
              name: 'undefined',
            },
          ],
        },
      ],
    });
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ASK :: nominal case', () => {
    expect(catalogsReducer(freezeMe({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: [
            {
              name: 'itemName',
            },
          ],
        },
      ],
    }), {
      type: WS_COM_OBJECTS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'session-id',
        name: 'catalogName',
        itemName: 'itemName',
      },
    })).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: [
            {
              name: 'itemName',
              comObjects: REQUESTING,
            },
          ],
        },
      ],
    });
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ADD :: undefined tuple', () => {
    expect(catalogsReducer(freezeMe(state2), {
      type: WS_COM_OBJECTS_ADD,
      payload: {
        tupleId: 'undefined',
        name: 'catalogName',
        itemName: 'itemName',
      },
    })).toEqual(state2);
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ADD :: undefined catalog', () => {
    expect(catalogsReducer(freezeMe(state2), {
      type: WS_COM_OBJECTS_ADD,
      payload: {
        tupleId: 'domain-id-session-id',
        name: 'undefined',
        itemName: 'itemName',
      },
    })).toEqual(state2);
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ADD :: undefined item', () => {
    expect(catalogsReducer(freezeMe(state2), {
      type: WS_COM_OBJECTS_ADD,
      payload: {
        tupleId: 'domain-id-session-id',
        name: 'catalogName',
        itemName: 'undefined',
      },
    })).toEqual(state2);
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ADD :: catalog not found', () => {
    expect(catalogsReducer(freezeMe({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: [
            {
              name: 'undefined',
            },
          ],
        },
      ],
    }), {
      type: WS_COM_OBJECTS_ADD,
      payload: {
        tupleId: 'domain-id-session-id',
        name: 'catalogName',
        itemName: 'itemName',
      },
    })).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: [
            {
              name: 'undefined',
            },
          ],
        },
      ],
    });
  });
  test('catalogsReducer :: WS_COM_OBJECTS_ADD :: nominal case', () => {
    expect(catalogsReducer(freezeMe({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: [
            {
              name: 'itemName',
            },
          ],
        },
      ],
    }), {
      type: WS_COM_OBJECTS_ADD,
      payload: {
        tupleId: 'domain-id-session-id',
        name: 'catalogName',
        itemName: 'itemName',
        comObjects: [{
          name: 'comObjectName',
        }],
      },
    })).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
          items: [
            {
              name: 'itemName',
              comObjects: [{
                name: 'comObjectName',
              }],
            },
          ],
        },
      ],
    });
  });
});

describe('store:catalogs:selectors', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('unknown action', () => {
    expect(reducer({
      'domain-id-session-id': [
        {
          name: 'catalogName',
        },
      ],
    }, {})).toEqual({
      'domain-id-session-id': [
        {
          name: 'catalogName',
        },
      ],
    });
  });
  test('should return the whole list', () => {
    expect(getTupleId('domain-id', 'session-id')).toBe('domain-id-session-id');
  });
  test('getCatalogsByDomainIdAndSessionId :: should return the required catalog', () => {
    expect(getCatalogsByDomainIdAndSessionId(state, { domainId: 'domain-id', sessionId: 'session-id' }))
      .toEqual([catalog]);
  });
  test('getCatalogsByDomainIdAndSessionId :: should return null', () => {
    expect(getCatalogsByDomainIdAndSessionId(state, { domainId: 'domain-id', sessionId: 'undefined' }))
      .toEqual(null);
  });
  test('getCatalogByName :: undefined domain', () => {
    expect(getCatalogByName(state.catalogs, {
      domainId: 'undefined',
      sessionId: 'session-id',
      name: 'catalogName'
    })).toEqual(undefined);
  });
  test('getCatalogByName :: undefined session', () => {
    expect(getCatalogByName(state.catalogs, {
      domainId: 'domain-id',
      sessionId: 'undefined',
      name: 'catalogName'
    })).toEqual(undefined);
  });
  test('getCatalogByName :: undefined name', () => {
    expect(getCatalogByName(state.catalogs, {
      domainId: 'domain-id',
      sessionId: 'session-id',
      name: 'undefined'
    })).toEqual(undefined);
  });
  test('getCatalogByName :: nominal case', () => {
    expect(getCatalogByName(state.catalogs, { tupleId, name: 'catalogName' })).toEqual(catalog);
  });
  test('getCatalogItems :: empty state', () => {
    expect(getCatalogItems({}, { tupleId, name: 'catalogName' })).toEqual(undefined);
  });
  test('getCatalogItems :: undefined tuple', () => {
    expect(getCatalogItems(state.catalogs, { tupleId: undefined, name: 'catalogName' })).toEqual(undefined);
  });
  test('getCatalogItems :: undefined catalog name', () => {
    expect(getCatalogItems(state.catalogs, { tupleId, name: 'undefined' })).toEqual(undefined);
  });
  test('getCatalogItems :: nominal case', () => {
    expect(getCatalogItems(state.catalogs, { tupleId, name: 'catalogName' })).toEqual(items);
  });
  test('getCatalogIndexByName :: nominal case', () => {
    expect(getCatalogIndexByName(state.catalogs, { tupleId, name: 'catalogName' })).toEqual(0);
  });
  test('getCatalogIndexByName :: not found catalog', () => {
    expect(getCatalogIndexByName(state.catalogs, { tupleId, name: 'undefined' })).toEqual(-1);
  });
  test('getCatalogIndexByName :: no catalogs', () => {
    expect(getCatalogIndexByName([], { tupleId, name: 'catalogName' })).toEqual(-1);
  });
  test('getCatalogItemByName :: nominal case', () => {
    expect(getCatalogItemByName(state.catalogs, { tupleId, name: 'catalogName', itemName: 'itemName' })).toEqual(item);
  });
  test('getCatalogItemIndexByName :: nominal case', () => {
    expect(getCatalogItemIndexByName(state.catalogs, {
      tupleId,
      name: 'catalogName',
      itemName: 'itemName'
    })).toEqual(0);
  });
  test('getCatalogsByTupleId :: nominal case', () => {
    expect(getCatalogsByTupleId(state.catalogs, { tupleId })).toEqual([catalog]);
  });
  test('getCatalogItemComObjects :: nominal case', () => {
    expect(getCatalogItemComObjects(state.catalogs, {
      tupleId,
      name: 'catalogName',
      itemName: 'itemName'
    })).toEqual([comObject]);
  });

  describe('getUnitByItemName', () => {
    const localState = {
      catalogs: {
        units: {
          '4-0': {
            StatValueDefinition: {
              TMMGT_BC_VIRTCHAN3: 'V',
              TEST_AGGREG: 'defaultString',
            },
          },
        },
      },
    };
    test('nominal case', () => {
      expect(getUnitByItemName(
        localState,
        { tupleId: '4-0', name: 'StatValueDefinition', itemName: 'TMMGT_BC_VIRTCHAN3' })
      ).toEqual('V');

      expect(getUnitByItemName(
        localState,
        { tupleId: '4-0', name: 'StatValueDefinition', itemName: 'TEST_AGGREG' })
      ).toEqual('defaultString');
    });
    test('non-existing itemName', () => {
      expect(getUnitByItemName(
        localState,
        { tupleId: '4-0', name: 'StatValueDefinition', itemName: 'NON-existing key' })
      ).toEqual(undefined);
    });
    test('non-existing name', () => {
      expect(getUnitByItemName(
        localState,
        { tupleId: '4-0', name: 'Braaaaaah', itemName: 'TEST_AGGREG' })
      ).toEqual(undefined);
    });
    test('non-existing name', () => {
      expect(getUnitByItemName(
        localState,
        { tupleId: 'ploup', name: 'StatValueDefinition', itemName: 'TEST_AGGREG' })
      ).toEqual(undefined);
    });
  });

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
      const structure = { itemName: 'Root', children: [{ itemName: 'POUET' }] };
      expect(getStructuredData(structure, data)).toEqual({
        name: 'Root',
        type: NODE_TYPE_OBJECT,
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
      const structure = { itemName: 'Root', children: [{ itemName: 'GENE_AM_CCSDSVERS2' }] };
      expect(getStructuredData(structure, data)).toEqual({
        name: 'Root',
        type: NODE_TYPE_OBJECT,
        children: [{
          name: 'GENE_AM_CCSDSVERS2',
          type: NODE_TYPE_KEY,
          values: [{
            extractedValue: 12,
            rawValue: 32,
            convertedValue: 'a5',
          }],
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
          extractedValue: { value: 13 },
        },
        {
          name: { value: 'GENE_AM_CCSDSVERS2' },
          extractedValue: { value: 14 },
        },
      ];
      const structure = { itemName: 'Root', children: [{ itemName: 'GENE_AM_CCSDSVERS2' }] };
      expect(getStructuredData(structure, data)).toEqual({
        name: 'Root',
        type: NODE_TYPE_OBJECT,
        children: [
          {
            name: 'GENE_AM_CCSDSVERS2',
            type: NODE_TYPE_KEY,
            values: [
              {
                extractedValue: 12,
                rawValue: 32,
                convertedValue: 'a5',
              },
              {
                extractedValue: 13,
              },
              {
                extractedValue: 14,
              }],
          },
        ],
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
          extractedValue: { value: 48 },
        }, {
          name: { value: 'GENE_AM_CCSDSVERS5' },
          extractedValue: { value: 40 },
          rawValue: { value: 'Nio' },
        },
      ];

      const structure = {
        itemName: 'Root',
        children: [
          {
            itemName: 'Bidule',
            children: [
              { itemName: 'GENE_AM_CCSDSVERS1' },
              { itemName: 'GENE_AM_CCSDSVERS2' },
            ],
          },
          {
            itemName: 'Machin',
            children: [
              { itemName: 'GENE_AM_CCSDSVERS3' },
            ],
          },
        ],
      };
      expect(getStructuredData(structure, data)).toEqual({
        name: 'Root',
        type: NODE_TYPE_OBJECT,
        children: [
          {
            name: 'Bidule',
            type: NODE_TYPE_OBJECT,
            children: [
              {
                name: 'GENE_AM_CCSDSVERS1',
                type: NODE_TYPE_KEY,
                values: [
                  {
                    extractedValue: 1,
                    rawValue: 2,
                    convertedValue: 5,
                  },
                ],
              },
              {
                name: 'GENE_AM_CCSDSVERS2',
                type: NODE_TYPE_KEY,
                values: [
                  {
                    extractedValue: 12,
                    rawValue: 32,
                    convertedValue: 'a5',
                  },
                  {
                    extractedValue: 112,
                    rawValue: 132,
                    convertedValue: '1a6',
                  },
                ],
              },
            ],
          },
          {
            name: 'Machin',
            type: NODE_TYPE_OBJECT,
            children: [
              {
                name: 'GENE_AM_CCSDSVERS3',
                type: NODE_TYPE_KEY,
                values: [
                  {
                    rawValue: 12,
                    convertedValue: 5,
                  },
                  {
                    rawValue: 'nest',
                    convertedValue: '0x1346F65FA',
                  },
                ],
              },
            ],
          },
        ],
      });
    });
    test('full example 2', () => {
      const data = [
        {
          name: 'GENE_AM_CCSDSVERS1',
          extractedValue: 12,
        },
        {
          name: 'GENE_AM_CCSDSVERS1',
          convertedValue: 23,
        },
        {
          name: 'GENE_AM_CCSDSVERS2',
          convertedValue: 0,
        },
        {
          name: 'GENE_AM_CCSDSVERS2',
          extractedValue: 610,
        },
        {
          name: 'GENE_AM_CCSDSVERS3',
          convertedValue: 12.1,
        },
        {
          name: 'GENE_AM_CCSDSVERS4',
          rawValue: 0,
          convertedValue: 0,
        },
        {
          name: 'GENE_AM_CCSDSVERS4',
          rawValue: 1,
        },
        {
          name: 'GENE_AM_CCSDSVERS5',
          convertedValue: 0,
        },
        {
          name: 'GENE_AM_CCSDSVERS5',
          convertedValue: 'a31',
        },
      ];

      const structure = {
        itemName: 'Root',
        children: [
          {
            itemName: 'Bidule',
            children: [
              {
                itemName: 'GENE_AM_CCSDSVERS1',
              }, {
                itemName: 'GENE_AM_CCSDSVERS2',
              }, {
                itemName: 'GENE_AM_CCSDSVERS3',
              },
            ],
          },
          {
            itemName: 'Machin',
            children: [
              {
                itemName: 'GENE_AM_CCSDSVERS4',
              },
              {
                itemName: 'GENE_AM_CCSDSVERS5',
              },
            ],
          },
        ],
      };
      expect(getStructuredData(structure, data)).toEqual({
        name: 'Root',
        type: NODE_TYPE_OBJECT,
        children: [
          {
            name: 'Bidule',
            type: NODE_TYPE_OBJECT,
            children: [
              {
                name: 'GENE_AM_CCSDSVERS1',
                type: NODE_TYPE_KEY,
                values: [{ extractedValue: 12 }, { convertedValue: 23 }],
              }, {
                name: 'GENE_AM_CCSDSVERS2',
                type: NODE_TYPE_KEY,
                values: [{ convertedValue: 0 }, { extractedValue: 610 }],
              }, {
                name: 'GENE_AM_CCSDSVERS3',
                type: NODE_TYPE_KEY,
                values: [{ convertedValue: 12.1 }],
              },
            ],
          },
          {
            name: 'Machin',
            type: NODE_TYPE_OBJECT,
            children: [
              {
                name: 'GENE_AM_CCSDSVERS4',
                type: NODE_TYPE_KEY,
                values: [{ rawValue: 0, convertedValue: 0 }, { rawValue: 1 }],
              },
              {
                name: 'GENE_AM_CCSDSVERS5',
                type: NODE_TYPE_KEY,
                values: [{ convertedValue: 0 }, { convertedValue: 'a31' }],
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
});
