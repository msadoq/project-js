/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import {
  getViews,
  getView,
  getEntryPointOnAxis,
  getModifiedViewsIds,
  getViewConfiguration,
  getViewContent,
  getViewEntryPoints,
  getViewEntryPoint,
  getViewEntryPointStateColors,
  getTextViewData,
} from './views';

describe('store:views:selectors', () => {
  it('getView', () => {
    const { getState } = getStore({
      views: {
        myViewId: { title: 'Title 1' },
      },
    });
    getView(getState(), { viewId: 'myViewId' }).should.have.property('title', 'Title 1');
    should.not.exist(getView(getState(), { viewId: 'unknownId' }));
  });
  describe('getViews', () => {
    it('should returns views', () => {
      const state = {
        views: {
          myId: { title: 'Title' },
          myOtherId: { title: 'Title other' },
        },
      };
      const { getState } = getStore(state);
      getViews(getState()).should.equal(state.views);
    });
  });
  it('getEntryPointOnAxis', () => {
    const state = {
      views: {
        myViewId: {
          configuration: {
            title: 'Title 1',
            entryPoints: [{
              name: 'ep1',
              connectedDataX: { axisId: 'axis1' },
              connectedDataY: { axisId: 'axis2' },
            }, {
              name: 'ep2',
              connectedDataX: { axisId: 'axis1' },
              connectedDataY: { axisId: 'axis3' },
            }],
            axes: {
              axis1: {},
              axis2: {},
              axis3: {},
            },
          },
        },
      },
    };
    getEntryPointOnAxis(state, { viewId: 'myViewId', axisId: 'axis1' }).should.be.an('array').with.length(2);
    getEntryPointOnAxis(state, { viewId: 'myViewId', axisId: 'axis2' }).should.be.an('array').with.length(1);
    getEntryPointOnAxis(state, { viewId: 'myViewId', axisId: 'invalidAxis' }).should.be.an('array').with.length(0);
    getEntryPointOnAxis(state, { viewId: 'unknown', axisId: 'axis1' }).should.be.an('array').with.length(0);
  });
  it('getModifiedViewsIds', () => {
    const state = {
      views: {
        view1: { isModified: true },
        view2: { isModified: false },
        view3: { isModified: true },
      },
    };
    getModifiedViewsIds(state).should.eql(['view1', 'view3']);
  });
  it('getViewConfiguration', () => {
    const state = {
      views: {
        myViewId: {
          configuration: {
            title: 'Title 1',
          },
        },
      },
    };
    getViewConfiguration(state, { viewId: 'myViewId' }).should.eql({
      title: 'Title 1',
    });
  });

  it('getViewContent', () => {
    const state = {
      views: {
        myViewId: {
          configuration: {
            title: 'Title 1',
            content: '<h1>content</h1>',
          },
        },
      },
    };
    getViewContent(state, { viewId: 'myViewId' }).should.eql('<h1>content</h1>');
  });

  it('getViewEntryPoints', () => {
    const state = {
      views: {
        myViewId: {
          configuration: {
            title: 'Title 1',
            entryPoints: [
              { name: 'AGA_AM_PRIORITY', connectedData: { formula: 'Reporting.ep1<ReportingParameter>.extractedValue' } },
              { name: 'TMMGT_BC_VIRTCHAN3' },
            ],
          },
        },
      },
    };
    getViewEntryPoints(state, { viewId: 'myViewId' }).should.eql([
      { name: 'AGA_AM_PRIORITY', connectedData: { formula: 'Reporting.ep1<ReportingParameter>.extractedValue' } },
      { name: 'TMMGT_BC_VIRTCHAN3' },
    ]);
  });
  it('getViewEntryPoint', () => {
    const state = {
      views: {
        myViewId: {
          configuration: {
            title: 'Title 1',
            entryPoints: [
              { name: 'AGA_AM_PRIORITY' },
              { name: 'TMMGT_BC_VIRTCHAN3', connectedData: { formula: 'Reporting.ep1<ReportingParameter>.extractedValue' } },
            ],
          },
        },
      },
    };
    getViewEntryPoint(state, { viewId: 'myViewId', epName: 'TMMGT_BC_VIRTCHAN3' }).should.eql({
      name: 'TMMGT_BC_VIRTCHAN3',
      connectedData: {
        formula: 'Reporting.ep1<ReportingParameter>.extractedValue',
      },
    });
  });
  it('getViewEntryPointStateColors', () => {
    const state = {
      views: {
        myViewId: {
          configuration: {
            title: 'Title 1',
            entryPoints: [{
              name: 'ep1',
              stateColors: [
                {
                  color: '#f44336',
                  condition: {
                    field: 'extractedValue',
                    operator: '>',
                    operand: '1',
                  },
                },
              ],
            }],
          },
        },
      },
    };
    getViewEntryPointStateColors(state, { viewId: 'myViewId', epName: 'ep1' }).should.eql([
      {
        color: '#f44336',
        condition: {
          field: 'extractedValue',
          operator: '>',
          operand: '1',
        },
      }]);
  });
  describe('getViewEntryPointColors', () => {
    it('For TextView', () => {
      const state = {
        views: {
          myViewId: {
            configuration: {
              title: 'Title 1',
              entryPoints: [{
                name: 'ep1',
                connectedData: {
                  formula: 'Reporting.ep1<ReportingParameter>.extractedValue',
                },
                stateColors: [
                  {
                    color: '#FF0000',
                    condition: {
                      field: 'extractedValue',
                      operator: '<',
                      operand: '1',
                    },
                  },
                  {
                    color: '#00FF00',
                    condition: {
                      field: 'extractedValue',
                      operator: '>',
                      operand: '1',
                    },
                  },
                ],
              }, {
                name: 'ep2',
                connectedData: {
                  formula: 'Reporting.ep2<ReportingParameter>.extractedValue',
                },
                stateColors: [
                  {
                    color: '#0000FF',
                    condition: {
                      field: 'extractedValue',
                      operator: '<=',
                      operand: '1',
                    },
                  },
                  {
                    color: '#F0F0F0',
                    condition: {
                      field: 'extractedValue',
                      operator: '>',
                      operand: '1',
                    },
                  },
                ],
              }, {
                name: 'ep3',
                connectedData: {
                  formula: 'Reporting.ep2<ReportingParameter>.extractedValue',
                },
                stateColors: [
                  {
                    color: '#FFFFFF',
                    condition: {
                      field: 'groundDate',
                      operator: '<=',
                      operand: '1',
                    },
                  },
                ],
              }],
            },
          },
        },
        viewData: {
          myViewId: {
            index: {
              ep1: 1480578457000,
              ep2: 1480578457000,
              ep3: 1480578457000,
            },
            values: {
              ep1: { value: 2 },
              ep2: { value: 1 },
              ep3: { value: 1 },
            },
          },
        },
      };
      getTextViewData(state, { viewId: 'myViewId' }).should.eql({
        index: {
          ep1: 1480578457000,
          ep2: 1480578457000,
          ep3: 1480578457000,
        },
        values: {
          ep1: {
            value: 2,
            color: '#00FF00',
          },
          ep2: {
            value: 1,
            color: '#0000FF',
          },
          ep3: {
            value: 1,
          },
        },
      });
    });
    it('For TextView (invalid formula)', () => {
      const state = {
        views: {
          myViewId: {
            configuration: {
              title: 'Title 1',
              entryPoints: [{
                name: 'ep1',
                connectedData: {
                  formula: 'Reporting.ep1<>.extractedValue',
                },
                stateColors: [
                  {
                    color: '#FF0000',
                    condition: {
                      field: 'extractedValue',
                      operator: '<',
                      operand: '1',
                    },
                  },
                ],
              }],
            },
          },
        },
        viewData: {
          myViewId: {
            index: {
              ep1: 1480578457000,
            },
            values: {
              ep1: { value: 0.5 },
            },
          },
        },
      };
      getTextViewData(state, { viewId: 'myViewId' }).should.eql({
        index: {
          ep1: 1480578457000,
        },
        values: {
          ep1: {
            color: '#FF0000',
            value: 0.5,
          },
        },
      });
    });
  });
});
