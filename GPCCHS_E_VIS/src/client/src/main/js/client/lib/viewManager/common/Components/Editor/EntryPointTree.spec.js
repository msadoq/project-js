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
  stateColors: [],
  filter: [],
  connectedData: {},

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
      connectedData: { formula: '' },
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
      connectedData: { formula: '' },
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
      connectedData: {
        ...entryPointEmpty.connectedData,
        formula: '',
      },
      entryPoint: {
        stateColors: [],
      },
    };
    wrapper.instance().handleSubmit(entryPointEmpty, entryPointUpdated);
    expect(entryPoint).toEqual(entryPointUpdated);
  });
  test.only('EntryPointTree :: handleSubmit connectedData', () => {
    const wrapper = shallow(
      <EntryPointTree
        {...propsStub}
      />
    );
    wrapper.instance().handleSubmit(entryPointEmpty, {
      connectedData: {
        catalog: 'Reporting',
        catalogItem: 'AGA_AM_ACQPRIORITY',
        comObject: 'ReportingParameter',
        comObjectField: 'convertedValue',
      },
    });
    const entryPointUpdated = {
      ...entryPointEmpty,
      connectedData: {
        ...propsStub.entryPoint.connectedData,
        formula: 'Reporting.AGA_AM_ACQPRIORITY<ReportingParameter>.convertedValue',
        catalog: 'Reporting',
        catalogItem: 'AGA_AM_ACQPRIORITY',
        comObject: 'ReportingParameter',
        comObjectField: 'convertedValue',
      },
    };
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
      connectedData: {
        ...propsStub.entryPoint.connectedData,
        formula: '',
        filter: [{ field: 'extractedValue', operand: 10, operator: '=' }],
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
      connectedData: {
        ...propsStub.entryPoint.connectedData,
        filter: [],
        formula: '',
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
        formula: '',
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
