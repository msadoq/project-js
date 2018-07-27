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
          colName: 'referenceTimestamp',
          direction: 'DESC',
        },
        cols: [
          { title: 'ssId', displayed: true }, // A afficher dans le tableau SubSchedules
          { title: 'ssIdLabel', displayed: true }, // A afficher dans le tableau SubSchedules
          { title: 'serviceApidName', displayed: true }, // A afficher dans le tableau SubSchedules
          { title: 'status', displayed: true }, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue. Si 3 (DELETED), supprimer l’entrée du state
          { title: 'executionTimeFirstTc', displayed: true }, // A afficher dans le tableau SubSchedules
        ],
      },
      enabledApids: {
        name: 'Enabled APIDs',
        cols: [
          { title: 'apid', displayed: true }, // à afficher dans le tableau Enabled AP
          { title: 'apidName', displayed: true }, // A afficher dans le tableau Enabled AP
          { title: 'lastUpdateModeApid', displayed: true }, // Tooltip sur apid / apidName
          { title: 'lastUpdateTimeApid', displayed: true }, // Tooltip sur apid / apidName
          // { title: 'status', displayed: true }, // N’afficher dans le tableau des Apids que ceux dont le status est à Enabled
          // { title: 'serviceApid', displayed: true }, // A afficher dans le tableau Enabled AP
          // { title: 'serviceApidName', displayed: true }, // A afficher dans le tableau Enabled AP
          // { title: 'uniqueId', displayed: true }, // inutilisé dans la vue
        ],
      },
      commands: {
        name: 'Commands',
        cols: [
          { title: 'commandSsId', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandName', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandDescription', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandApidName', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandSequenceCount', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandSourceId', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandStatus', displayed: true }, // A afficher dans le tableau Commands. Si 3 (DELETED), supprimer l’entrée du state
          { title: 'commandGroundStatus', displayed: true }, // A afficher dans le tableau Commands
          { title: 'initialExecutionTime', displayed: true }, // A afficher dans le tableau Commands
          { title: 'currentExecutionTime', displayed: true }, // A afficher dans le tableau Commands
          { title: 'totalTimeShiftOffset', displayed: true }, // A afficher dans le tableau Commands
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
