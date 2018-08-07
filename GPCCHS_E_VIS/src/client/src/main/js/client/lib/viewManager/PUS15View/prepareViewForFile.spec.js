import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS15View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 15, On-Board Storage and Retrieval Service',
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
      onBoardStorages: {
        name: 'On-Board Storages',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { title: 'serviceApidName', displayed: true },
          { title: 'storeId', displayed: true },
          { title: 'hkStoreStatusParameterName', displayed: true },
          { title: 'dumpEnabled', displayed: true },
          { title: 'storeStatus', displayed: true },
          { title: 'downlinkStatus', displayed: true },
          { title: 'storageType', displayed: true },
          { title: 'storeName', displayed: true },
          { title: 'hkDownlinkStatusParameterName', displayed: true },
        ],
      },
      storageDef: {
        name: 'Storage Definitions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { title: 'serviceApidName', displayed: true },
          { title: 'packetApid', displayed: true },
          { title: 'packetApidName', displayed: true },
          { title: 'serviceType', displayed: true },
          { title: 'serviceSubType', displayed: true },
          { title: 'sid', displayed: true },
          { title: 'sidLabel', displayed: true },
          { title: 'sidName', displayed: true },
          { title: 'subsamplingRatio', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS15View/prepareViewForFile', () => {
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
