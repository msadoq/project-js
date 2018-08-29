import React from 'react';

import { shallow } from 'enzyme';

import HistoryView from './HistoryView';

const mockRemoveLink = jest.fn();
const mockUpdateShowLink = jest.fn();
const mockOpenInspector = jest.fn();
const mockOpenEditor = jest.fn();
const mockAddEntryPoint = jest.fn();
const mockUpdateSearchCount = jest.fn();

const baseProps = {
  viewId: 'viewId',
  pageId: 'pageId',
  removeLink: mockRemoveLink,
  updateShowLinks: mockUpdateShowLink,
  mainMenu: [],
  openInspector: mockOpenInspector,
  openEditor: mockOpenEditor,
  addEntryPoint: mockAddEntryPoint,
  entryPoints: [],
  entryPointsWithMetadata: [],
  isTimelineSelected: false,
  searchForThisView: false,
  countBySearching: 0,
  updateSearchCount: mockUpdateSearchCount,
};

describe('HistoryView', () => {
  describe('Component rendering', () => {
    it('should display an error message if no timeline is selected', () => {
      const wrapper = shallow(<HistoryView {...baseProps} />);
      const displayedText = wrapper.text();
      expect(displayedText)
        .toContain('Unable to render view');
    });
    it('should render default view if a timeline is selected', () => {
      const props = {
        ...baseProps,
        isTimelineSelected: true,
      };

      const wrapper = shallow(<HistoryView {...props} />);
      expect(wrapper)
        .toMatchSnapshot();
    });
  });
  describe('Component functions', () => {
    describe('overrideStyle', () => {
      it('should outline cell in green when `isCurrent` property is set to true', () => {
        const style = {};
        const content = {
          isCurrent: true,
        };

        const historyComponent = new HistoryView();

        const overridenStyle = historyComponent.overrideStyle({ style, content });
        expect(overridenStyle)
          .toEqual({
            ...style,
            borderTop: '2px solid green',
            borderBottom: '2px solid green',
            backgroundColor: 'rgba(0, 100, 0, 0.1)',
          });
      });
    });
    describe('contentModifier', () => {
      it('should add `isCurrent` property to cell', () => {
        const date = new Date();
        const baseReferenceTimestamp = date.getTime();

        const cellContent = {
          value: 123,
        };
        const content = {
          id: 'ep1',
          epName: 'ep1',
          referenceTimestamp: baseReferenceTimestamp,
        };

        const entryPoints = [
          {
            id: 'ep1',
            name: 'ep1',
            metdata: {
              unit: 'V',
            },
          },
        ];

        const last = {
          ep1: {
            referenceTimestamp: baseReferenceTimestamp,
          },
        };

        const historyComponent = new HistoryView();
        const modifiedContent =
          historyComponent.contentModifier(entryPoints, last)(cellContent, content);

        expect(modifiedContent.isCurrent)
          .toEqual(true);
      });
      it('should add unit to convertedValue field', () => {
        const date = new Date();
        const baseReferenceTimestamp = date.getTime();

        const cellContent = {
          value: 123,
          colKey: 'convertedValue',
        };
        const content = {
          id: 'ep1',
          epName: 'ep1',
          referenceTimestamp: baseReferenceTimestamp,
        };

        const entryPoints = [
          {
            id: 'ep1',
            name: 'ep1',
            metadata: {
              unit: 'V',
            },
          },
        ];

        const last = {
          ep1: {
            referenceTimestamp: baseReferenceTimestamp,
          },
        };

        const historyComponent = new HistoryView();
        const modifiedContent =
          historyComponent.contentModifier(entryPoints, last)(cellContent, content);

        expect(modifiedContent.value)
          .toEqual('123 (V)');
      });
    });
  });
});
