import { should, getStore } from '../../lib/common/test';
import {
  getSchemaJson,
  getConnectedDataFromState,
  getUsedValues,
} from './main';

describe('TextView/main', () => {
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
  describe('getConnectedDataFromState', () => {
    const { getState } = getStore({
      views: {
        v1: {
          type: 'TextView',
          configuration: {
            textViewEntryPoints: [
              { connectedData: { uuid: 'cd2' } },
              { connectedData: { uuid: 'cd3' } },
            ]
          }
        },
        v2: {
          type: 'TextView',
          configuration: {
            textViewEntryPoints: [
              { connectedData: { uuid: 'cd1' } },
              { connectedData: {} },
              { connectedData: { uuid: 'unknown' } },
            ],
          },
        },
        noconfiguration: { type: 'TextView', configuration: undefined },
        noentrypoint: { type: 'TextView', configuration: { textViewEntryPoints: undefined } },
      },
      connectedData: {
        cd1: { uuid: 'cd1' },
        cd2: { uuid: 'cd2' },
        cd3: { uuid: 'cd3' },
      },
    });
    it('unknown or empty view', () => {
      getConnectedDataFromState(getState(), 'unknown').should.be.an('array').that.is.empty;
      getConnectedDataFromState(getState(), 'noconfiguration').should.be.an('array').that.is.empty;
      getConnectedDataFromState(getState(), 'noentrypoint').should.be.an('array').that.is.empty;
    });
    it('valid entry points', () => {
      const cd = getConnectedDataFromState(getState(), 'v1');
      cd.should.eql([
        { uuid: 'cd2' },
        { uuid: 'cd3' },
      ]);
    });
    it('with invalid or incomplete entry points', () => {
      const cd = getConnectedDataFromState(getState(), 'v2');
      cd.should.eql([
        { uuid: 'cd1' },
      ]);
    });
  });
  describe('getUsedValues', () => {
    let payload;
    before(() => {
      payload = [
        { timestamp: 1, payload: { val1: '10', val2: '20' } },
        { timestamp: 2, payload: { val1: '11', val2: '21' } },
        { timestamp: 3, payload: { val1: '12', val2: '22' } },
      ];
    });
    it('valid payload with current inside', () => {
      const visuWindow = [1.9, 2];
      const ret = getUsedValues(undefined, 'val1', visuWindow, payload);
      ret.should.be.an('object').with.keys('timestamp', 'value');
      ret.timestamp.should.equal(payload[1].timestamp);
      ret.value.should.equal(payload[1].payload.val1);
    });
    it('valid payload without current inside', () => {
      const visuWindow = [1.9, 2.5];
      const ret = getUsedValues(undefined, 'val1', visuWindow, payload);
      ret.should.be.an('object').with.keys('timestamp', 'value');
      ret.timestamp.should.equal(payload[1].timestamp);
      ret.value.should.equal(payload[1].payload.val1);
    });
  });
});
