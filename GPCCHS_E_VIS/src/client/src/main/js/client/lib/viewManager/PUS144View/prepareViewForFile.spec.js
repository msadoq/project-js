import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS144View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Partitions Service, (PUS 144)',
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
      onBoardPartitions: {
        name: 'On-Board Partitions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'ID', title: 'partitionId', displayed: true },
          { label: 'File ID', title: 'fileId', displayed: true },
          { label: 'File Type', title: 'fileType', displayed: true },
          { label: 'File Size', title: 'fileSize', displayed: true },
          { label: 'Creation Time', title: 'fileCreationTime', displayed: true },
          { label: 'Protection Status', title: 'fileProtectionStatus', displayed: true },
          { label: 'Mode', title: 'fileMode', displayed: true },
          { label: 'Address', title: 'fileAddress', displayed: true },
          { label: 'Uploaded Checksum', title: 'uploadedFileChecksum', displayed: true },
          { label: 'Reported Checksum', title: 'computedFileChecksum', displayed: true },
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
