import React from 'react';
import { shallow } from 'enzyme';
import HistoryView from './HistoryView';

describe('Addition component', () => {
  const mockConfiguration = {
    entryPoints: [{
      connectedData: {
        catalog: 'Reporting',
        catalogItem: 'SAT_BC_NUMTC13',
        comObject: 'ReportingParameter',
        dataType: 'time_based_data',
        domain: 'fr.cnes.isis',
      },
      id: 'cbe8c689-bc99-4deb-961b-0e87148a5571',
      name: 'ep1',
      stateColors: [],
    }],
    tables: {
      history: {
        cols: [],
        name: 'Entry points history',
        sorting: {
          colName: 'referenceTimestamp',
          direction: 'DESC',
        },
      },
    },
    showLegend: false,
  };
  const mockSessions = [
    { id: 0, name: 'Master', timestamp: { ms: 1535966910142, ps: 0 } },
    { id: 42, name: 'Session#42', timestamp: { ms: 1535966910142, ps: 0 } },
    { id: 181, name: 'Session#181', timestamp: { ms: 1535966910142, ps: 0 } },
  ];
  const mockWrongSessions = [
    { id: 0, name: 'wrong name', timestamp: { ms: 1535966910142, ps: 0 } },
    { id: 42, name: 'Session#42', timestamp: { ms: 1535966910142, ps: 0 } },
    { id: 181, name: 'Session#181', timestamp: { ms: 1535966910142, ps: 0 } },
  ];
  const mockTimelines = {
    ba08cf53: {
      color: null,
      id: 'Session 1',
      kind: 'Session',
      offset: 0,
      sessionName: 'Master',
      uuid: 'ba08cf53',
    },
  };
  const validEvent = {
    dataTransfer: {
      getData: () => `{
          "catalogName":"Reporting", 
          "comObjects":["ReportingParameter"],
          "item":"AIV_TM_HK9018P065",
          "nameSpace":"SDB",
          "sessionName":"0",
          "domain":"fr.cnes.isis.simupus"
        }`,
    },
    stopPropagation: () => {},
  };
  const uncompletedEvent = {
    dataTransfer: {
      getData: () => `{
          "catalogName":"Reporting", 
          "comObjects":["ReportingParameter"],
          "item":"AIV_TM_HK9018P065",
          "nameSpace":"SDB",
          "sessionName":"0"
        }`,
    },
    stopPropagation: () => {},
  };
  const unexistingSessionEvent = {
    dataTransfer: {
      getData: () => `{
          "catalogName":"Reporting", 
          "comObjects":["ReportingParameter"],
          "item":"AIV_TM_HK9018P065",
          "nameSpace":"SDB",
          "sessionName":"666",
          "domain":"fr.cnes.isis.simupus"
        }`,
    },
    stopPropagation: () => {},
  };
  const addMessageMock = jest.fn();
  const addEntryPointMock = jest.fn();
  const openEditorMock = jest.fn();
  const rightWrapper = shallow(
    <HistoryView
      viewId={'1'}
      pageId={'2'}
      removeLink={() => {}}
      updateShowLinks={() => {}}
      mainMenu={[]}
      openInspector={() => {}}
      entryPoints={{}}
      entryPointsWithMetadata={{}}
      isTimelineSelected
      searchForThisView
      countBySearching={1}
      updateSearchCount={() => {}}
      searchCount={{}}
      searching={'something'}
      isInspectorOpened={false}
      inspectorEpId={'3'}
      configuration={mockConfiguration}
      sessions={mockSessions}
      timelines={mockTimelines}
      addMessage={addMessageMock}
      addEntryPoint={addEntryPointMock}
      openEditor={openEditorMock}
    />
  );
  const wrongWrapper = shallow(
    <HistoryView
      viewId={'1'}
      pageId={'2'}
      removeLink={() => {}}
      updateShowLinks={() => {}}
      mainMenu={[]}
      openInspector={() => {}}
      entryPoints={{}}
      entryPointsWithMetadata={{}}
      isTimelineSelected
      searchForThisView
      countBySearching={1}
      updateSearchCount={() => {}}
      searchCount={{}}
      searching={'something'}
      isInspectorOpened={false}
      inspectorEpId={'3'}
      configuration={mockConfiguration}
      sessions={mockWrongSessions}
      timelines={mockTimelines}
      addMessage={addMessageMock}
      addEntryPoint={addEntryPointMock}
      openEditor={openEditorMock}
    />
  );
  beforeEach(() => {
    addMessageMock.mockClear();
    addEntryPointMock.mockClear();
    openEditorMock.mockClear();
  });
  test('drop with a valid event', () => {
    expect(addMessageMock.mock.calls.length).toBe(0);
    expect(addEntryPointMock.mock.calls.length).toBe(0);
    expect(openEditorMock.mock.calls.length).toBe(0);
    rightWrapper.instance().onDrop(validEvent);
    expect(addMessageMock.mock.calls.length).toBe(0);
    expect(addEntryPointMock.mock.calls.length).toBe(1);
    expect(openEditorMock.mock.calls.length).toBe(1);
  });
  test('drop with a uncompleted event', () => {
    expect(addMessageMock.mock.calls.length).toBe(0);
    expect(addEntryPointMock.mock.calls.length).toBe(0);
    expect(openEditorMock.mock.calls.length).toBe(0);
    rightWrapper.instance().onDrop(uncompletedEvent);
    expect(addMessageMock.mock.calls.length).toBe(1);
    expect(addMessageMock.mock.calls[0][0]).toEqual('danger');
  });
  test('session id does not exist', () => {
    expect(addMessageMock.mock.calls.length).toBe(0);
    expect(addEntryPointMock.mock.calls.length).toBe(0);
    expect(openEditorMock.mock.calls.length).toBe(0);
    rightWrapper.instance().onDrop(unexistingSessionEvent);
    expect(addMessageMock.mock.calls.length).toBe(1);
    expect(addMessageMock.mock.calls[0][0]).toEqual('danger');
  });
  test('session name is wrong', () => {
    expect(addMessageMock.mock.calls.length).toBe(0);
    expect(addEntryPointMock.mock.calls.length).toBe(0);
    expect(openEditorMock.mock.calls.length).toBe(0);
    wrongWrapper.instance().onDrop(validEvent);
    expect(addMessageMock.mock.calls.length).toBe(1);
    expect(addMessageMock.mock.calls[0][0]).toEqual('danger');
    expect(addEntryPointMock.mock.calls.length).toBe(0);
    expect(openEditorMock.mock.calls.length).toBe(0);
  });
});
