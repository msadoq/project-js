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
          { title: 'serviceApidName', displayed: true },
          { title: 'partitionId', displayed: true },
          { title: 'fileId', displayed: true },
          { title: 'fileType', displayed: true },
          { title: 'fileSize', displayed: true },
          { title: 'fileCreationTime', displayed: true },
          { title: 'fileProtectionStatus', displayed: true },
          { title: 'fileMode', displayed: true },
          { title: 'fileAddress', displayed: true },
          { title: 'uploadedFileChecksum', displayed: true },
          { title: 'computedFileChecksum', displayed: true },
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
