import { should, getStore } from '../../lib/common/test';

import {
  getSchemaJson,
  getConnectedDataFromState,
  getUsedValues,
} from './main';

describe('PlotView/main', () => {
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
  describe('getConnectedDataFromState', () => {
    const { getState } = getStore({
      views: {
        v1: {
          type: 'PlotView',
          configuration: {
            plotViewEntryPoints: [
              { connectedDataX: { uuid: 'cd3' }, connectedDataY: { uuid: 'cd4' } },
              { connectedDataX: { uuid: 'cd5' }, connectedDataY: { uuid: 'cd6' } },
            ]
          }
        },
        v2: {
          type: 'PlotView',
          configuration: {
            plotViewEntryPoints: [
              { connectedDataX: { uuid: 'cd1' } },
              { connectedDataY: { uuid: 'cd2' } },
              { connectedDataX: {}, connectedDataY: {} },
              { connectedDataX: { uuid: 'unknown' } },
            ],
          },
        },
        noconfiguration: { type: 'PlotView', configuration: undefined },
        noentrypoint: { type: 'PlotView', configuration: { plotViewEntryPoints: undefined } },
      },
      connectedData: {
        cd1: { uuid: 'cd1' },
        cd2: { uuid: 'cd2' },
        cd3: { uuid: 'cd3' },
        cd4: { uuid: 'cd4' },
        cd5: { uuid: 'cd5' },
        cd6: { uuid: 'cd6' },
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
        { uuid: 'cd3' },
        { uuid: 'cd4' },
        { uuid: 'cd5' },
        { uuid: 'cd6' },
      ]);
    });
    it('with invalid or incomplete entry points', () => {
      const cd = getConnectedDataFromState(getState(), 'v2');
      cd.should.eql([
        { uuid: 'cd1' },
        { uuid: 'cd2' },
      ]);
    });
  });
  describe('getUsedValues', () => {
    let payload;
    let visuWindow;
    before(() => {
      payload = [
        { timestamp: 1, payload: { val1: '10', val2: '20' } },
        { timestamp: 2, payload: { val1: '11', val2: '21' } },
        { timestamp: 3, payload: { val1: '12', val2: '22' } },
      ];

      visuWindow = [2, 3];
    });
    it('valid payload, state undefined', () => {
      const ret = getUsedValues(undefined, 'val1', visuWindow, payload);
      ret.should.be.an('object').with.keys('data', 'index');
      ret.data.should.be.an('object').with.keys('2', '3');
      ret.data[3].should.deep.equal(payload[2].payload.val1);
      ret.data[2].should.deep.equal(payload[1].payload.val1);
      ret.index.should.be.an('array').with.length(2)
      .that.have.properties([2, 3]);
    });
    it('valid payload, state defined', () => {
      const stateLocalId = {
        data: { 0: '100', 2.5: '101', 4: '102' },
        index: [0, 2.5, 4],
      };
      const ret = getUsedValues(stateLocalId, 'val1', visuWindow, payload);
      ret.should.be.an('object').with.keys('data', 'index');
      ret.data.should.be.an('object').with.keys('2', '2.5', '3');
      ret.data[3].should.deep.equal(payload[2].payload.val1);
      ret.data[2].should.deep.equal(payload[1].payload.val1);
      ret.index.should.be.an('array').with.length(3)
      .that.have.properties([2, 2.5, 3]);
    });
  });
});
