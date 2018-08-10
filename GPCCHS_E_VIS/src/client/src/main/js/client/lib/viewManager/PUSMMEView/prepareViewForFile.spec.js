import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUSMMEView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'House Keeping and diagnostic Packets(PUSMME)',
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
      packets: {
        name: 'House-Keeping and Diagnostic Packets',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'SID', title: 'sid', displayed: true },
          { label: 'SID Label', title: 'sidLabel', displayed: true },
          { label: 'Name', title: 'packetName', displayed: true },
          { label: 'Type', title: 'packetType', displayed: true },
          { label: 'AP Name', title: 'packetApidName', displayed: true },
          { label: 'Status', title: 'status', displayed: true },
          { label: 'Val. Param. ID', title: 'validityParameterId', displayed: true },
          { label: 'Val. Param. Name', title: 'validityParameterName', displayed: true },
          { label: 'Val. Param. Mask', title: 'validityParameterMask', displayed: true },
          { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', displayed: true },
          { label: 'Collect. Int.', title: 'collectionInterval', displayed: true },
          { label: 'Forward. Status', title: 'forwardingStatusTypeSubtype', displayed: true },
          { label: 'Forward. Status RID SID', title: 'forwardingStatusRidSid', displayed: true },
          { label: 'Subsamp. Ratio', title: 'subsamplingRatio', displayed: true },
          { label: 'Gen. Mode', title: 'generationMode', displayed: true },
          { label: 'Packet APID', title: 'packetApid', displayed: true },
          { label: 'Service APID', title: 'serviceApid', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUSMMEView/prepareViewForFile', () => {
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
