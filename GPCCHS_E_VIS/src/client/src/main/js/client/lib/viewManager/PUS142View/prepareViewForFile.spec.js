import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS142View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 142',
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
      functionalMonitoring: {
        name: 'Functional Monitoring',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'FID', title: 'fmonId', displayed: true },
          { label: 'FID Label', title: 'fmonIdLabel', displayed: true },
          { label: 'Name', title: 'fmonName', displayed: true },
          { label: 'Status', title: 'status', displayed: true },
          { label: 'Checking Status', title: 'checkingStatus', displayed: true },
          { label: 'Protect. Status', title: 'protectionStatus', displayed: true },
          { label: 'RID', title: 'rid', displayed: true },
          { label: 'RID Label', title: 'ridLabel', displayed: true },
          { label: 'RID Status', title: 'ridStatus', displayed: true },
          { label: 'Pakect Name', title: 'packetName', displayed: true }, // pending confirmation
          { label: 'Val. Param', title: 'validityParameterId', displayed: true },
          { label: 'Val. Mask', title: 'validityParameterMask', displayed: true },
          { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', displayed: true },
          { label: 'Action TC APID', title: 'actionTcApid', displayed: true },
          { label: 'Action TC Type', title: 'actionTcType', displayed: true },
          { label: 'Action TC SubType', title: 'actionTcSubType', displayed: true },
          { label: 'Action Status', title: 'actionStatus', displayed: true },
          { label: 'Action Name', title: 'actionName', displayed: true },
        ],
      },
      parameterMonitorings: {
        name: 'Parameter Monitorings',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { title: 'serviceApidName', displayed: true },
          { title: 'fmonId', displayed: true },
          { title: 'fmonIdLabel', displayed: true },
          { title: 'paramMonId', displayed: true },
          { title: 'paramMonName', displayed: true },
          { title: 'lastUpdateModeId', displayed: true },
          { title: 'lastUpdateTimeId', displayed: true },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS142View/prepareViewForFile', () => {
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
