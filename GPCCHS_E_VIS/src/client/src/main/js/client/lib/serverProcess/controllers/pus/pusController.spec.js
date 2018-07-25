const { cleanupPayload } = require('./pusController');

const simplePayload = {
  serviceApid: {
    type: 'foo',
    value: 100,
  },
};

const recursivePayload = {
  serviceApid: {
    type: 'foo',
    value: 100,
  },
  status: {
    type: 'foo',
    value: 100,
  },
  pus011Apid: {
    apid: {
      type: 'foo',
      value: 100,
    },
    lastUpdateModeApid: {
      type: 'foo',
      value: 100,
    },
  },
  pus011Apid3: {
    pus011Blah: {
      apid: {
        type: 'foo',
        value: 100,
      },
      lastUpdateModeApid: {
        type: 'foo',
        value: 100,
      },
    },
  },
  pus011Apid2: [
    {
      apid: {
        type: 'foo',
        value: 100,
      },
      lastUpdateModeApid: {
        type: 'foo',
        value: 100,
      },
    },
    {
      apid: {
        type: 'foo',
        value: 100,
      },
      lastUpdateModeApid: {
        type: 'foo',
        value: 100,
      },
    },
  ],
};

describe('serverProcess/controllers/pus/pusController', () => {
  describe('cleanupPayload', () => {
    test('empty case', () => {
      expect(cleanupPayload({}))
        .toEqual({});
    });
    test('simple case', () => {
      expect(cleanupPayload(simplePayload))
        .toEqual({
          serviceApid: 100,
        });
    });
    test('recusive case', () => {
      expect(cleanupPayload(recursivePayload))
        .toEqual({
          serviceApid: 100,
          status: 100,
          pus011Apid: {
            apid: 100,
            lastUpdateModeApid: 100,
          },
          pus011Apid3: {
            pus011Blah: {
              apid: 100,
              lastUpdateModeApid: 100,
            },
          },
          pus011Apid2: [
            {
              apid: 100,
              lastUpdateModeApid: 100,
            },
            {
              apid: 100,
              lastUpdateModeApid: 100,
            },
          ],
        });
    });
  });
});
