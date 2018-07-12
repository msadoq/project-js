import PUSMMEView, { isValid, renderInvald, generatePopover } from 'viewManager/PUSMMEView/Components/View/PUSMMEView';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import renderer from 'react-test-renderer';

const propsStub = {
  viewId: '9a057132-aa02-43b1-99e7-5d870a3af609',
  pageId: '035eaef0-c4e7-4093-be64-aa6cc92905c9',
  isViewsEditorOpen: true,
  mainMenu: [
    {
      label: 'Close Editor',
    },
    {
      label: 'Search in this view',
    },
    {
      type: 'separator',
    },
    {
      label: 'Compare (Alt+c)',
    },
    {
      label: 'Reset (Alt+r)',
    },
    {
      label: 'Save in file (Alt+s)',
    },
    {
      label: 'Synchronize',
    },
    {
      type: 'separator',
    },
    {
      label: 'Move view to...',
    },
    {
      label: 'Collapse view',
    },
    {
      label: 'Maximize view',
    },
    {
      label: 'Reload view',
      enabled: false,
    },
    {
      type: 'separator',
    },
    {
      label: 'Save view',
    },
    {
      label: 'Save view as...',
    },
    {
      label: 'Save view as a model...',
    },
    {
      label: 'Export as image...',
    },
    {
      label: 'Export as csv...',
    },
    {
      type: 'separator',
    },
    {
      label: 'Close view',
    },
  ],
  serviceApid: 100,
  serviceApidName: 'myString',
  apids: [
    {
      apidName: 'TIMEPACKET',
      apidRawValue: '0',
    },
    {
      apidName: 'ORBIT',
      apidRawValue: '2',
    },
    {
      apidName: 'POWERMGT',
      apidRawValue: '3',
    },
  ],
  packetsData: {
    data: [
      {
        collectionInterval: 'myString',
        forwardingStatusRidSid: 100,
        forwardingStatusTypeSubtype: 1,
        generationMode: 'myString',
        lastUpdateModeApid: '',
        lastUpdateModeCollectInterval: 100,
        lastUpdateModeFwdStatusTypeRidSid: 100,
        lastUpdateModeFwdStatusTypeSubtype: 1,
        lastUpdateModeGenMode: 1,
        lastUpdateModeSid: 100,
        lastUpdateModeStatus: 1,
        lastUpdateModeSubSamplingRatio: 1,
        lastUpdateModeValidParamExpValue: 100,
        lastUpdateModeValidParamId: 100,
        lastUpdateModeValidParamMask: 100,
        lastUpdateTimeCollectInterval: 1531403224583,
        lastUpdateTimeFwdStatusTypeRidSid: 1531403224583,
        lastUpdateTimeFwdStatusTypeSubtype: 1531403224583,
        lastUpdateTimeGenMode: 1531403224583,
        lastUpdateTimeSid: 1531403224583,
        lastUpdateTimeStatus: 1531403224583,
        lastUpdateTimeSubSamplingRatio: 1531403224583,
        lastUpdateTimeValidParamExpValue: 1531403224583,
        lastUpdateTimeValidParamId: 1531403224583,
        lastUpdateTimeValidParamMask: 1531403224583,
        packetApid: 100,
        packetApidName: 'myString',
        packetName: 'myString',
        packetType: 'myString',
        pusMmePacketParameter: [
          {
            lastUpdateModeFilteredStatus: 1,
            lastUpdateModeStoreId: 1,
            lastUpdateTimeFilteredStatus: 1531403224583,
            lastUpdateTimeStoreId: 1531403224583,
            parameterFilteredStatus: 'myString',
            parameterId: 1,
            parameterName: 'myString',
            parameterOrder: 1,
            uniqueId: 1,
          },
        ],
        pusMmePacketStore: [
          {
            lastUpdateModeStoreId: 1,
            lastUpdateModeStoreStatus: 1,
            lastUpdateModeSubSamplingRatio: 1,
            lastUpdateTimeStoreId: 1531403224583,
            lastUpdateTimeStoreStatus: 1531403224583,
            lastUpdateTimeSubSamplingRatio: 1531403224583,
            storeId: 1,
            storeName: 'myString',
            storeStatus: 1,
            subSamplingRatio: 1,
            uniqueId: 1,
          },
        ],
        serviceApid: 100,
        serviceApidName: 'myString',
        sid: 100,
        sidLabel: 'myString',
        status: 'ENABLED',
        subsamplingRatio: 1,
        uniqueId: 100,
        validityParameterExpectedValue: 'myString',
        validityParameterId: 100,
        validityParameterMask: 'myString',
        validityParameterName: 'myString',
      },
      {
        collectionInterval: 'myString',
        forwardingStatusRidSid: 100,
        forwardingStatusTypeSubtype: 1,
        generationMode: 'myString',
        lastUpdateModeApid: '',
        lastUpdateModeCollectInterval: 100,
        lastUpdateModeFwdStatusTypeRidSid: 100,
        lastUpdateModeFwdStatusTypeSubtype: 1,
        lastUpdateModeGenMode: 1,
        lastUpdateModeSid: 100,
        lastUpdateModeStatus: 1,
        lastUpdateModeSubSamplingRatio: 1,
        lastUpdateModeValidParamExpValue: 100,
        lastUpdateModeValidParamId: 100,
        lastUpdateModeValidParamMask: 100,
        lastUpdateTimeCollectInterval: 1531403224583,
        lastUpdateTimeFwdStatusTypeRidSid: 1531403224583,
        lastUpdateTimeFwdStatusTypeSubtype: 1531403224583,
        lastUpdateTimeGenMode: 1531403224583,
        lastUpdateTimeSid: 1531403224583,
        lastUpdateTimeStatus: 1531403224583,
        lastUpdateTimeSubSamplingRatio: 1531403224583,
        lastUpdateTimeValidParamExpValue: 1531403224583,
        lastUpdateTimeValidParamId: 1531403224583,
        lastUpdateTimeValidParamMask: 1531403224583,
        packetApid: 100,
        packetApidName: 'myString',
        packetName: 'myString',
        packetType: 'myString',
        pusMmePacketParameter: [
          {
            lastUpdateModeFilteredStatus: 1,
            lastUpdateModeStoreId: 1,
            lastUpdateTimeFilteredStatus: 1531403224583,
            lastUpdateTimeStoreId: 1531403224583,
            parameterFilteredStatus: 'myString',
            parameterId: 1,
            parameterName: 'myString',
            parameterOrder: 1,
            uniqueId: 1,
          },
        ],
        pusMmePacketStore: [
          {
            lastUpdateModeStoreId: 1,
            lastUpdateModeStoreStatus: 1,
            lastUpdateModeSubSamplingRatio: 1,
            lastUpdateTimeStoreId: 1531403224583,
            lastUpdateTimeStoreStatus: 1531403224583,
            lastUpdateTimeSubSamplingRatio: 1531403224583,
            storeId: 1,
            storeName: 'myString',
            storeStatus: 1,
            subSamplingRatio: 1,
            uniqueId: 1,
          },
        ],
        serviceApid: 100,
        serviceApidName: 'myString',
        sid: 100,
        sidLabel: 'myString',
        status: 'ENABLED',
        subsamplingRatio: 1,
        uniqueId: 100,
        validityParameterExpectedValue: 'myString',
        validityParameterId: 100,
        validityParameterMask: 'myString',
        validityParameterName: 'myString',
      },
      {
        collectionInterval: 'myString',
        forwardingStatusRidSid: 100,
        forwardingStatusTypeSubtype: 1,
        generationMode: 'myString',
        lastUpdateModeApid: '',
        lastUpdateModeCollectInterval: 100,
        lastUpdateModeFwdStatusTypeRidSid: 100,
        lastUpdateModeFwdStatusTypeSubtype: 1,
        lastUpdateModeGenMode: 1,
        lastUpdateModeSid: 100,
        lastUpdateModeStatus: 1,
        lastUpdateModeSubSamplingRatio: 1,
        lastUpdateModeValidParamExpValue: 100,
        lastUpdateModeValidParamId: 100,
        lastUpdateModeValidParamMask: 100,
        lastUpdateTimeCollectInterval: 1531403224583,
        lastUpdateTimeFwdStatusTypeRidSid: 1531403224583,
        lastUpdateTimeFwdStatusTypeSubtype: 1531403224583,
        lastUpdateTimeGenMode: 1531403224583,
        lastUpdateTimeSid: 1531403224583,
        lastUpdateTimeStatus: 1531403224583,
        lastUpdateTimeSubSamplingRatio: 1531403224583,
        lastUpdateTimeValidParamExpValue: 1531403224583,
        lastUpdateTimeValidParamId: 1531403224583,
        lastUpdateTimeValidParamMask: 1531403224583,
        packetApid: 100,
        packetApidName: 'myString',
        packetName: 'myString',
        packetType: 'myString',
        pusMmePacketParameter: [
          {
            lastUpdateModeFilteredStatus: 1,
            lastUpdateModeStoreId: 1,
            lastUpdateTimeFilteredStatus: 1531403224583,
            lastUpdateTimeStoreId: 1531403224583,
            parameterFilteredStatus: 'myString',
            parameterId: 1,
            parameterName: 'myString',
            parameterOrder: 1,
            uniqueId: 1,
          },
        ],
        pusMmePacketStore: [
          {
            lastUpdateModeStoreId: 1,
            lastUpdateModeStoreStatus: 1,
            lastUpdateModeSubSamplingRatio: 1,
            lastUpdateTimeStoreId: 1531403224583,
            lastUpdateTimeStoreStatus: 1531403224583,
            lastUpdateTimeSubSamplingRatio: 1531403224583,
            storeId: 1,
            storeName: 'myString',
            storeStatus: 1,
            subSamplingRatio: 1,
            uniqueId: 1,
          },
        ],
        serviceApid: 100,
        serviceApidName: 'myString',
        sid: 100,
        sidLabel: 'myString',
        status: 'ENABLED',
        subsamplingRatio: 1,
        uniqueId: 100,
        validityParameterExpectedValue: 'myString',
        validityParameterId: 100,
        validityParameterMask: 'myString',
        validityParameterName: 'myString',
      },
    ],
    keep: [
      0,
      1,
      2,
    ],
  },
  windowId: '9303fcb4-9410-4320-b817-216177f7da1d',
  onCommandCellDoubleClick: () => null,
};

describe('viewManager/PUSMMEView/Components/View/PUSMMEView', () => {
  describe('PUSMMEView :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUSMMEView, propsStub, stateTest);
    });
  });

  describe('PUSMMEView :: renderInvald', () => {
    test('snapshot', () => {
      const tree = renderer.create(renderInvald('this is an error message'))
        .toJSON()
      ;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('PUSMMEView :: isValid', () => {
    [null, undefined, []].map(apids =>
      [null, undefined].map(applicationProcessId =>
        it('should return false with invalid data', () => {
          expect(isValid(apids, applicationProcessId)).toBe(false);
        })
      )
    );
    it('should return true with valid data', () => {
      expect(isValid(['ORBIT'], 0)).toBe(true);
    });
  });
});
