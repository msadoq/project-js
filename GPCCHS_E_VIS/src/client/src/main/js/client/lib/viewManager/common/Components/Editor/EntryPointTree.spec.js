import React from 'react';
import { shallow } from 'enzyme';
import { shallowRenderSnapshot } from 'common/jest/utils';
import EntryPointTree from './EntryPointTree';

let entryPoint;

beforeEach(() => {
  entryPoint = {};
});

const entryPointEmpty = {
  id: 'e484fb2d-88f7-4327-95dc-3458ef381ea6',
  connectedData: {
    formula: 'Reporting.AGA_AM_ACQPRIORITY<ReportingParameter>.convertedValue',
  },
  stateColors: [],
  filter: [],
};

const propsStub = {
  pageId: 'page1',
  viewId: 'view1',
  entryPoint: entryPointEmpty,
  // eslint-disable-next-line no-return-assign
  updateEntryPoint: (viewId, entryPointId, newValue) =>
    entryPoint = newValue,
  panels: [],
  updateViewSubPanels: () => null,
  remove: () => null,
  updateViewPanels: () => null,
  removeEntryPoint: () => null,
  entryPointsPanels: {},
};

describe('viewManager', () => {
  describe('viewManager/common', () => {
    describe('viewManager/common/Components', () => {
      describe('viewManager/common/Components/Editor', () => {
        describe('viewManager/common/Components/Editor/EntryPointTree', () => {
          test('EntryPointTree :: snapshot', () => {
            shallowRenderSnapshot(EntryPointTree, propsStub, {});
          });
          test('EntryPointTree :: handleSubmit name', () => {
            const wrapper = shallow(
              <EntryPointTree
                {...propsStub}
              />
            );
            const entryPointUpdated = {
              ...entryPointEmpty,
              name: 'YOLO',
            };
            wrapper.instance().handleSubmit(entryPointEmpty, entryPointUpdated);
            expect(entryPoint).toEqual(entryPointUpdated);
          });
          test('EntryPointTree :: handleSubmit stateColor add', () => {
            const wrapper = shallow(
              <EntryPointTree
                {...propsStub}
              />
            );
            const entryPointUpdated = {
              ...entryPointEmpty,
              entryPoint: {
                stateColors: [{
                  color: '#FFFFFF',
                  condition: {
                    field: 'convertedValue',
                    operand: '10',
                    operator: '=',
                  },
                }],
              },
            };
            wrapper.instance().handleSubmit(entryPointEmpty, entryPointUpdated);
            expect(entryPoint).toEqual(entryPointUpdated);
          });
          test('EntryPointTree :: handleSubmit stateColor remove', () => {
            // expect state to have some state colors defined
            const propsStub2 = {
              ...propsStub,
              entryPoint: {
                ...propsStub.entryPoint,
                connectedData: {
                  ...propsStub.entryPoint.connectedData,
                  stateColors: [{
                    color: '#FFFFFF',
                    condition: {
                      field: 'convertedValue',
                      operand: '10',
                      operator: '=',
                    },
                  }],
                },
              },
            };
            const wrapper = shallow(
              <EntryPointTree
                {...propsStub2}
              />
            );
            const entryPointUpdated = {
              ...entryPointEmpty,
              entryPoint: {
                stateColors: [],
              },
            };
            wrapper.instance().handleSubmit(entryPointEmpty, entryPointUpdated);
            expect(entryPoint).toEqual(entryPointUpdated);
          });
          test('EntryPointTree :: handleSubmit connectedData', () => {
            const wrapper = shallow(
              <EntryPointTree
                {...propsStub}
              />
            );
            const entryPointUpdated = {
              ...entryPointEmpty,
              entryPoint: {
                ...propsStub.entryPoint,
                connectedData: {
                  ...propsStub.entryPoint.connectedData,
                  formula: 'Reporting.AGA_AM_ACQPRIORITY<ReportingParameter>.extractedValue',
                },
              },
            };
            wrapper.instance().handleSubmit(entryPointEmpty, entryPointUpdated);
            expect(entryPoint).toEqual(entryPointUpdated);
          });
          test('EntryPointTree :: handleSubmit filter add', () => {
            const wrapper = shallow(
              <EntryPointTree
                {...propsStub}
              />
            );

            const entryPointUpdated = {
              ...entryPointEmpty,
              entryPoint: {
                ...propsStub.entryPoint,
                connectedData: {
                  ...propsStub.entryPoint.connectedData,
                  filter: [{ field: 'extractedValue', operand: 10, operator: '=' }],
                },
              },
            };
            wrapper.instance().handleSubmit(entryPointEmpty, entryPointUpdated);
            expect(entryPoint).toEqual(entryPointUpdated);
          });
          test('EntryPointTree :: handleSubmit filter delete', () => {
            const propsStub2 = {
              ...propsStub,
              entryPoint: {
                ...propsStub.entryPoint,
                connectedData: {
                  ...propsStub.entryPoint.connectedData,
                  filter: [{ field: 'extractedValue', operand: 10, operator: '=' }],
                },
              },
            };
            const wrapper = shallow(
              <EntryPointTree
                {...propsStub2}
              />
            );

            const entryPointUpdated = {
              ...entryPointEmpty,
              entryPoint: {
                ...propsStub.entryPoint,
                connectedData: {
                  ...propsStub.entryPoint.connectedData,
                  filter: [],
                },
              },
            };
            wrapper.instance().handleSubmit(entryPointEmpty, entryPointUpdated);
            expect(entryPoint).toEqual(entryPointUpdated);
          });
          test('EntryPointTree :: handleSubmit unit', () => {
            const wrapper = shallow(
              <EntryPointTree
                {...propsStub}
              />
            );
            const entryPointUpdated = {
              ...propsStub.entryPoint,
              connectedData: {
                ...propsStub.entryPoint.connectedData,
                unit: {
                  convertFrom: 'V',
                  convertTo: 'mV',
                },
              },
            };
            wrapper.instance().handleSubmit(entryPointEmpty, entryPointUpdated);
            expect(entryPoint).toEqual(entryPointUpdated);
          });
        });
      });
    });
  });
});
