import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS12View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 12, On-board Monitoring Service',
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
      parameterMonitoringDefinitions: {
        name: 'Parameter Monitoring Definitions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'MID', title: 'monitoringId', displayed: true },
          { label: 'MID Label', title: 'monitoringIdLabel', displayed: true },
          { label: 'Monit. Name', title: 'monitoringName', displayed: true },
          { label: 'Param. ID', title: 'parameterId', displayed: true },
          { label: 'Param. Name', title: 'parameterName', displayed: true },
          { label: 'Monit. Status', title: 'monitoringStatus', displayed: true },
          { label: 'Protect. Status', title: 'protectionStatus', displayed: true },
          { label: 'Interval', title: 'monitoringInterval', displayed: true },
          { label: 'Rep. Number', title: 'repetitionNumber', displayed: true },
          { label: 'Check Type', title: 'checkType', displayed: true },
          { label: 'Val. Param. ID', title: 'validityParameterId', displayed: true },
          { label: 'Val. Param. Name', title: 'validityParameterName', displayed: true },
          { label: 'Val. Param. Mask', title: 'validityParameterMask', displayed: true },
          { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', displayed: true },
          { label: 'RID-EL', title: 'ridEL', displayed: true },
          { label: 'RID-EL Label', title: 'ridLabelEL', displayed: true },
          { label: 'Status EL', title: 'ridStatusEL', displayed: true },
          { label: 'Action Status EL', title: 'actionStatusEL', displayed: true },
          { label: 'Action EL', title: 'actionNameEL', displayed: true },
          { label: 'Action Mask EL', title: 'maskEL', displayed: true },
          { label: 'Value EL', title: 'valueEL', displayed: true },
          { label: 'Action EL TC Apid', title: 'actionTcApidEL', displayed: true },
          { label: 'Action EL TC Type', title: 'actionTcTypeEL', displayed: true },
          { label: 'Action EL TC Subtype', title: 'actionTcSubTypeEL', displayed: true },
          { label: 'RID-H', title: 'ridH', displayed: true },
          { label: 'RID-H Label', title: 'ridLabelH', displayed: true },
          { label: 'Status H', title: 'ridStatusH', displayed: true },
          { label: 'Action Status H', title: 'actionStatusH', displayed: true },
          { label: 'Action H', title: 'actionNameH', displayed: true },
          { label: 'Action Mask H', title: 'maskH', displayed: true },
          { label: 'Value H', title: 'valueH', displayed: true },
          { label: 'Action H TC Apid', title: 'actionTcApidH', displayed: true },
          { label: 'Action H TC Type', title: 'actionTcTypeH', displayed: true },
          { label: 'Action H TC Subtype', title: 'actionTcSubTypeH', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS12View/prepareViewForFile', () => {
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
