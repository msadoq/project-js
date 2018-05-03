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
    expect(getCatalogByName(state.catalogs, { domainId: 'undefined', sessionId: 'session-id', name: 'catalogName' })).toEqual(undefined);
  });
  test('getCatalogByName :: undefined session', () => {
    expect(getCatalogByName(state.catalogs, { domainId: 'domain-id', sessionId: 'undefined', name: 'catalogName' })).toEqual(undefined);
  });
  test('getCatalogByName :: undefined name', () => {
    expect(getCatalogByName(state.catalogs, { domainId: 'domain-id', sessionId: 'session-id', name: 'undefined' })).toEqual(undefined);
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
    expect(getCatalogItemIndexByName(state.catalogs, { tupleId, name: 'catalogName', itemName: 'itemName' })).toEqual(0);
  });
  test('getCatalogsByTupleId :: nominal case', () => {
    expect(getCatalogsByTupleId(state.catalogs, { tupleId })).toEqual([catalog]);
  });
  test('getCatalogItemComObjects :: nominal case', () => {
    expect(getCatalogItemComObjects(state.catalogs, { tupleId, name: 'catalogName', itemName: 'itemName' })).toEqual([comObject]);
  });
});
