import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS140View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 140',
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
      parameters: {
        name: 'Parameters',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'APID', title: 'apid', displayed: true },
          { label: 'ID', title: 'parameterId', displayed: true },
          { label: 'Name', title: 'parameterName', displayed: true },
          { label: 'Init. Value', title: 'initialValue', displayed: true },
          { label: 'Cur. Value', title: 'currentValue', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS140View/prepareViewForFile', () => {
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
