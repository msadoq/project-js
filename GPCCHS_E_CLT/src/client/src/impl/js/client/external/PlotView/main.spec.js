import { should, getStore } from '../../app/utils/test';

import {
  getSchemaJson,
  getConnectedDataFromState,
  getUsedValues,
} from './main';

describe('PlotView/main', () => {
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
  describe('getConnectedDataFromViewDocument', () => {
    // TODO: aleal
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
    it('valid payload, state undefined', () => {
      const payload = {
        1: { val1: '10', val2: '20' },
        2: { val1: '11', val2: '21' },
        3: { val1: '12', val2: '22' },
      };
      const visuWindow = { lower: 2, upper: 3 };
      let stateLocalId;
      const ret = getUsedValues(stateLocalId, 'val1', visuWindow, 0, payload);
      ret.should.be.an('object').with.keys('data', 'index');
      ret.data.should.be.an('object').with.keys('2', '3');
      ret.data[3].should.deep.equal(payload[3].val1);
      ret.data[2].should.deep.equal(payload[2].val1);
      ret.index.should.be.an('array').with.length(2)
      .that.have.properties(['2', '3']);
    });
    it('valid payload, state defined', () => {
      const payload = {
        1: { val1: '10', val2: '20' },
        2: { val1: '11', val2: '21' },
        3: { val1: '12', val2: '22' },
      };
      const visuWindow = { lower: 2, upper: 3 };
      const stateLocalId = {
        data: { 0: '100', 2.5: '101', 4: '102' },
        index: ['0', '2.5', '4'],
      };
      const ret = getUsedValues(stateLocalId, 'val1', visuWindow, 0, payload);
      ret.should.be.an('object').with.keys('data', 'index');
      ret.data.should.be.an('object').with.keys('0', '2', '2.5', '3', '4');
      ret.data[3].should.deep.equal(payload[3].val1);
      ret.data[2].should.deep.equal(payload[2].val1);
      ret.index.should.be.an('array').with.length(5)
      .that.have.properties(['0', '2', '2.5', '3', '4']);
    });
  });
});
