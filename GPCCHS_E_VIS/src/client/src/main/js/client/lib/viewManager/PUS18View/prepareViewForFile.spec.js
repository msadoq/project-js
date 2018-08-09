import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS18View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 18',
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
      onBoardCtrlProcedures: {
        name: 'On-Board Control Procedures',
        sorting: {
          colName: 'storeId',
          direction: 'DESC',
        },
        cols: [
          { title: 'serviceApidName', displayed: true },
          { title: 'obcpId', displayed: true },
          { title: 'status', displayed: true },
          { title: 'stepId', displayed: true },
          { title: 'partitionId', displayed: true },
          { title: 'observabilityLevel', displayed: true },
          { title: 'priority', displayed: true },
        ],
      },
      procedureParameters: {
        name: 'Procedure Parameters',
        sorting: {
          colName: 'obcpId',
          direction: 'DESC',
        },
        cols: [
          { title: 'obcpId', displayed: true },
          { title: 'parameterId', displayed: true },
          { title: 'parameterName', displayed: true },
          { title: 'value', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS18View/prepareViewForFile', () => {
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
