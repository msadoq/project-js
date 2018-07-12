import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS14View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Scheduling Service Ground Model (PUS14)',
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
      pus014TmPacket: {
        name: 'Tm Packets',
        sorting: {
          colName: 'packetApid',
          direction: 'DESC',
        },
        cols: [
          { title: 'packetApid', displayed: true }, // A afficher dans le tableau de packets
          { title: 'forwardingStatus', displayed: true }, // A afficher dans le tableau de packets
          { title: 'lastUpdateModeFwdStatus', displayed: true }, // Tooltip sur forwardingStatus
          { title: 'lastUpdateTimeFwdStatus', displayed: true }, // Tooltip sur forwardingStatus
          { title: 'packetApidName', displayed: true }, // A afficher dans le tableau de packets
          { title: 'serviceApid', displayed: true }, // Inutilisé dans la vue
          { title: 'packetName', displayed: true }, // A afficher dans le tableau de packets
          { title: 'serviceApidName', displayed: true }, // Inutilisé dans la vue
          { title: 'lastUpdateModeRid', displayed: true }, // Tooltip sur rid / ridLabel
          { title: 'lastUpdateTimeRid', displayed: true }, // Tooltip sur rid / ridLabel
          { title: 'rid', displayed: true }, // A afficher dans le tableau de packets
          { title: 'ridLabel', displayed: true }, // A afficher dans le tableau de packets
          { title: 'lastUpdateModeSid', displayed: true }, // Tooltip sur sid, sidLabel
          { title: 'lastUpdateTimeSid', displayed: true }, // Tooltip sur sid, sidLabel
          { title: 'lastUpdateModeSubSamplingRatio', displayed: true }, // Tooltip sur subsamplingRatio
          { title: 'lastUpdateTimeSubSamplingRatio', displayed: true }, // Tooltip sur subsamplingRatio
          { title: 'subsamplingRatio', displayed: true }, // A afficher dans le tableau de packets
          { title: 'sid', displayed: true }, // A afficher dans le tableau de packets
          { title: 'sidLabel', displayed: true }, // A afficher dans le tableau de packets
          { title: 'lastUpdateModeTypeSubType', displayed: true }, // Tooltip sur serviceType, serviceSubType
          { title: 'lastUpdateTimeTypeSubType', displayed: true }, // Tooltip sur serviceType, serviceSubType
          { title: 'serviceType', displayed: true }, // A afficher dans le tableau de packets
          { title: 'serviceSubType', displayed: true }, // A afficher dans le tableau de packets
          // { title: 'uniqueId', displayed: true }, // Inutilisé dans la vue
          { title: 'status', displayed: true }, // Non affiché dans la vue.  Si 3 (DELETED), supprimer l’entrée du state
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS14View/prepareViewForFile', () => {
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
