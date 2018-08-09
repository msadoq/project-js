import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS19View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 19',
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
      eventActions: {
        name: 'Event Actions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'AP ID', title: 'apid', displayed: true },
          { label: 'AP Name', title: 'apidName', displayed: true },
          { label: 'RID', title: 'rid', displayed: true },
          { label: 'RID Label', title: 'ridLabel', displayed: true },
          { label: 'Name', title: 'actionName', displayed: true },
          { label: 'Status', title: 'actionStatus', displayed: true },
          { label: 'Action TC', title: 'packetName', displayed: true },
          { label: 'Description', title: 'actionDescription', displayed: true },
          { label: 'Action TC APID', title: 'actionTcApid', displayed: true },
          { label: 'Action TC Type', title: 'actionTcType', displayed: true },
          { label: 'Action TC Subtype', title: 'actionTcSubType', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS19View/prepareViewForFile', () => {
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
