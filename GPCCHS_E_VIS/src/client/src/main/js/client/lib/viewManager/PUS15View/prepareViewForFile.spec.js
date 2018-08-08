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
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'Store ID', title: 'storeId', displayed: true },
          { label: 'HK Status Parameter', title: 'hkStoreStatusParameterName', displayed: true },
          { label: 'Dump Enabled', title: 'dumpEnabled', displayed: true },
          { label: 'Storage Status', title: 'storeStatus', displayed: true },
          { label: 'Downlink Status', title: 'downlinkStatus', displayed: true },
          { label: 'Type', title: 'storageType', displayed: true },
          { label: 'Name', title: 'storeName', displayed: true },
          { label: 'HK Downlink Status Param. Name', title: 'hkDownlinkStatusParameterName', displayed: true },
        ],
      },
      storageDef: {
        name: 'Storage Definitions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'APID', title: 'packetApid', displayed: true },
          { label: 'AP. Name', title: 'packetApidName', displayed: true },
          { label: 'Type', title: 'serviceType', displayed: true },
          { label: 'SubType', title: 'serviceSubType', displayed: true },
          { label: 'SID', title: 'sid', displayed: true },
          { label: 'SID Label', title: 'sidLabel', displayed: true },
          { label: 'SID Name', title: 'sidName', displayed: true },
          { label: 'Sampling Ratio', title: 'subsamplingRatio', displayed: true },
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
