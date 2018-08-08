import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS11View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Scheduling Service Ground Model (PUS11)',
  titleStyle: {
    align: 'left',
    bold: false,
    color: '#000000',
    font: 'Arial',
    italic: false,
    size: 12,
    strikeOut: false,
    underline: false,
  },
  uuid: 'e90097c0-6ca8-4f28-a1e0-6434168fc197',
  isModified: true,
  showLinks: false,
  domainName: '*',
  sessionName: '*',
  domain: '*',
  session: '*',
  configuration: {
    tables: {
      subSchedules: {
        name: 'Sub schedules',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true }, // A afficher dans le tableau SubSchedules
          { label: 'SSID', title: 'ssId', displayed: true }, // A afficher dans le tableau SubSchedules
          { label: 'SSID Label', title: 'ssIdLabel', displayed: true }, // A afficher dans le tableau SubSchedules
          { label: 'Status', title: 'status', displayed: true }, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue. Si 3 (DELETED), supprimer l’entrée du state
          { label: 'First TC Time', title: 'executionTimeFirstTc', displayed: true }, // A afficher dans le tableau SubSchedules
        ],
      },
      enabledApids: {
        name: 'Enabled APIDs',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true }, // A afficher dans le tableau Enabled AP
          { label: 'APID', title: 'apid', displayed: true }, // à afficher dans le tableau Enabled AP
          { label: 'Name', title: 'apidName', displayed: true }, // A afficher dans le tableau Enabled AP
          { label: 'Update Type', title: 'lastUpdateModeApid', displayed: true }, // A afficher dans le tableau Enabled AP
          { label: 'Update Time', title: 'lastUpdateTimeApid', displayed: true }, // A afficher dans le tableau Enabled AP
        ],
      },
      commands: {
        name: 'Commands',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'SSID', title: 'commandSsId', displayed: true },
          { label: 'Cmd. Name', title: 'commandName', displayed: true },
          { label: 'Cmd. Short Description', title: 'commandDescription', displayed: true },
          { label: 'Cmd. AP Name', title: 'commandApidName', displayed: true },
          { label: 'Seq. Count', title: 'commandSequenceCount', displayed: true },
          { label: 'Source ID', title: 'commandSourceId', displayed: true },
          { label: 'Cmd. Status', title: 'commandStatus', displayed: true },
          { label: 'Ground Status', title: 'commandGroundStatus', displayed: true },
          { label: 'Init. Exec. Time', title: 'initialExecutionTime', displayed: true },
          { label: 'Cur. Exec. Time', title: 'currentExecutionTime', displayed: true },
          { label: 'Tot. Time Shift', title: 'totalTimeShiftOffset', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS11View/prepareViewForFile', () => {
  it('should remove correctly entryPoints key, and copy it as entryPoint', () => {
    expect(prepareViewForFile(props)).toEqual({
      ...props,
      configuration: {
        ..._omit(props.configuration, ['entryPoints']),
        entryPoint: { foo: 'foo' },
      },
    });
  });
});
