import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS13View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 13',
  titleStyle: {
    align: 'left',
    bold: false,
    color: '#000000',
    font: 'Arial',
    italic: false,
    size: 13,
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
      uplink: {
        name: 'Table Large Data Transfer - Uplink',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'LDU ID', title: 'duId', displayed: true },
          { label: 'Status', title: 'status', displayed: true },
          { label: 'Type', title: 'transferType', displayed: true },
          { label: 'File Type', title: 'fileTypeCode', displayed: true },
          { label: 'Start Time', title: 'startTime', displayed: true },
          { label: 'End Time', title: 'endTime', displayed: true },
          { label: 'Size', title: 'size', displayed: true },
          { label: 'Remain Size', title: 'remainingSize', displayed: true },
          { label: '%', title: 'percent', displayed: true },
          { label: 'Reason', title: 'failureCode', displayed: true },
          { label: 'Partition ID', title: 'partitionId', displayed: true },
          { label: 'File ID', title: 'fileId', displayed: true },
          { label: 'Checksum', title: 'fileChecksum', displayed: true },
        ],
      },
      downlink: {
        name: 'Table Large Data Transfer - Downlink',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'LDU ID', title: 'duId', displayed: true },
          { label: 'Status', title: 'status', displayed: true },
          { label: 'Type', title: 'transferType', displayed: true },
          { label: 'File Type', title: 'fileTypeCode', displayed: true },
          { label: 'Start Time', title: 'startTime', displayed: true },
          { label: 'End Time', title: 'endTime', displayed: true },
          { label: 'Size', title: 'size', displayed: true },
          { label: 'Remain Size', title: 'remainingSize', displayed: true },
          { label: '%', title: 'percent', displayed: true },
          { label: 'Reason', title: 'failureCode', displayed: true },
          { label: 'Partition ID', title: 'partitionId', displayed: true },
          { label: 'File ID', title: 'fileId', displayed: true },
          { label: 'Checksum', title: 'fileChecksum', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS13View/prepareViewForFile', () => {
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
