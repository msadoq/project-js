import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS144View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 144, On-Board Storage and Retrieval Service',
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
          colName: 'storeId',
          direction: 'DESC',
        },
        cols: [
          { title: 'storeId', displayed: true },
          { title: 'status', displayed: true },
          { title: 'storageType', displayed: true },
          { title: 'dumpEnabled', displayed: true },
          { title: 'hkStatusParameterName', displayed: true },
          { title: 'serviceApidName', displayed: true },
          { title: 'storeName', displayed: true },
          { title: 'serviceApid', displayed: true },
        ],
      },
      storageDef: {
        name: 'Storage Definition',
        sorting: {
          colName: 'packetApid',
          direction: 'DESC',
        },
        cols: [
          { title: 'packetApid', displayed: true },
          { title: 'serviceType', displayed: true },
          { title: 'serviceSubType', displayed: true },
          { title: 'sid', displayed: true },
          { title: 'subsamplingRatio', displayed: true },
          { title: 'packetType', displayed: true },
          { title: 'sidLabel', displayed: true },
          { title: 'isSubsamplingRatioSet', displayed: true },
          { title: 'serviceApid', displayed: true },
          { title: 'serviceApidName', displayed: true },
          { title: 'packetApidName', displayed: true },
          { title: 'sidName', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS144View/prepareViewForFile', () => {
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
