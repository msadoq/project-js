import { should, getStore } from '../../app/utils/test';

import {
  getSchemaJson,
  getConnectedDataFromState,
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
              { connectedDataX: { uuid: 'cd3' } , connectedDataY: { uuid: 'cd4' } },
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
        noconfiguration: { type: 'PlotView', configuration: undefined},
        noentrypoint: { type: 'PlotView', configuration: { plotViewEntryPoints: undefined }},
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
});
