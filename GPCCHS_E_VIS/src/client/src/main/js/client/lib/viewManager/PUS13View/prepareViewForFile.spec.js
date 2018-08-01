import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS13View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 13, On-board Monitoring Service',
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
      parameterMonitoringDefinitions: {
        name: 'Parameter Monitoring Definitions',
        sorting: {
          colName: 'monitoringId',
          direction: 'DESC',
        },
        cols: [
          { title: 'monitoringId', displayed: true },
          { title: 'monitoringIdLabel', displayed: true },
          { title: 'monitoringName', displayed: true },
          { title: 'parameterId', displayed: true },
          { title: 'parameterName', displayed: true },
          { title: 'monitoringStatus', displayed: true },
          { title: 'protectionStatus', displayed: true },
          { title: 'monitoringInterval', displayed: true },
          { title: 'repetitionNumber', displayed: true },
          { title: 'checkType', displayed: true },
          { title: 'validityParameterId', displayed: true },
          { title: 'validityParameterName', displayed: true },
          { title: 'validityParameterMask', displayed: true },
          { title: 'validityParameterExpectedValue', displayed: true },
          { title: 'parameterCurrentValue', displayed: true },
          { title: 'ridEL', displayed: true },
          { title: 'ridLabelEL', displayed: true },
          { title: 'ridStatusEL', displayed: true },
          { title: 'actionStatusEL', displayed: true },
          { title: 'actionNameEL', displayed: true },
          { title: 'maskEL', displayed: true },
          { title: 'valueEL', displayed: true },
          { title: 'actionTcApidEL', displayed: true },
          { title: 'actionTcTypeEL', displayed: true },
          { title: 'actionTcSubTypeEL', displayed: true },
          { title: 'ridH', displayed: true },
          { title: 'ridLabelH', displayed: true },
          { title: 'ridStatusH', displayed: true },
          { title: 'actionStatusH', displayed: true },
          { title: 'actionNameH', displayed: true },
          { title: 'maskH', displayed: true },
          { title: 'valueH', displayed: true },
          { title: 'actionTcApidH', displayed: true },
          { title: 'actionTcTypeH', displayed: true },
          { title: 'actionTcSubTypeH', displayed: true },
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
