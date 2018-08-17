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
      packetForwarding: {
        name: 'Table Packet Forwarding',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true }, // Inutilisé dans la vue
          { label: 'Name', title: 'packetName', displayed: true }, // A afficher dans le tableau de packets
          { label: 'APID', title: 'packetApid', displayed: true }, // A afficher dans le tableau de packets
          { label: 'AP Name', title: 'packetApidName', displayed: true }, // A afficher dans le tableau de packets
          { label: 'Type', title: 'serviceType', displayed: true }, // A afficher dans le tableau de packets
          { label: 'SubType', title: 'serviceSubType', displayed: true }, // A afficher dans le tableau de packets
          { label: 'Fwd Status (APID/T/ST)', title: 'forwardingStatusTypeSubtype', displayed: true }, // A afficher dans le tableau de packets
          { label: 'RID', title: 'rid', displayed: true }, // A afficher dans le tableau de packets
          { label: 'RID Label', title: 'ridLabel', displayed: true }, // A afficher dans le tableau de packets
          { label: 'SID', title: 'sid', displayed: true }, // A afficher dans le tableau de packets
          { label: 'SID Label', title: 'sidLabel', displayed: true }, // A afficher dans le tableau de packets
          { label: 'Sample Ratio', title: 'subsamplingRatio', displayed: true }, // A afficher dans le tableau de packets
          { label: 'Packet Type', title: 'packetType', displayed: true }, // Tooltip sur serviceType, serviceSubType
          { label: 'Fwd Status RID SID', title: 'forwardingStatusRidSid', displayed: true }, // Tooltip sur serviceType, serviceSubType
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
