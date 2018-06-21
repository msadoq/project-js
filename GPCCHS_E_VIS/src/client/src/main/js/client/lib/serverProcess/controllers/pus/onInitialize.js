
// const { decode, getType } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:PUS:onInitialize');

const { incomingPusRange } = require('store/actions/pus');

// const { pop } = require('../../../common/callbacks');
// const { add: addMessage } = require('../../../store/actions/messages');

/**
 * Triggered on DC domain request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (buffers, getStore) => {
  logger.silly('called');
  const store = getStore();
  const yann = {

    Pus011Model: {
      maxNoTc: 100,
      scheduleStatus: 100, // either 100 (ENABLED) / 200 (DISABLED)
      lastUpdateTimeScheduleStatus: 1527520025823,
      apid: 100,
      noFreeCommands: 100,
      lastUpdateTimeNoFreeCommands: 1527520025823,
      freeSpace: 100,
      lastUpdateTimeFreeSpace: 1527520025823,
      spaceInNumberOfCommands: true,
      noSubSchedule: 100,
      status: 100, // either 100 (ENABLED) / 200 (DISABLED)
      pus011Apid: [
        {
          status: 100, // either 100 (ENABLED) / 200 (DISABLED)
          apid: 100,
          lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
          lastUpdateTime: 1527520025823,
        },
        {
          status: 100, // either 100 (ENABLED) / 200 (DISABLED)
          apid: 100,
          lastUpdateMode: 'TC', // either TM / TC / TIMEOUT
          lastUpdateTime: 1527520025823,
        },
      ],
      lastUpdateModeFreeSpace: 1527520025823,
      lastUpdateModeNoFreeCommands: 1527520025823,
      lastUpdateModeScheduleStatus: 1527520025823,
      // scheduleStatus: 'ENABLED',
      // availableSpace: '1000',
      // spaceType: 'Bytes',
      // lastUpdateTime: 1527520025823,
      // lastUpdateType: 'TM',
    },
    Pus011SubSchedule: [
      {
        ssId: 100,
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        lastUpdateModeStatus: 1527520025823,
        lastUpdateTimeStatus: 1527520025823,
        executionTimeFirstTc: 1000,
        apid: 100,
        ssIdLabel: 'mySTRING',
        lastUpdateModeSubScheduleId: 1527520025823,
        lastUpdateTimeSubscheduleId: 1527520025823,
        lastUpdateModeFirstTcTime: 1527520025823,
        lastUpdateTimeFirstTcTime: 1527520025823,
      },
      {
        ssId: 100,
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        lastUpdateModeStatus: 1527520025823,
        lastUpdateTimeStatus: 1527520025823,
        executionTimeFirstTc: 1000,
        apid: 100,
        ssIdLabel: 'mySTRING',
        lastUpdateModeSubScheduleId: 1527520025823,
        lastUpdateTimeSubscheduleId: 1527520025823,
        lastUpdateModeFirstTcTime: 1527520025823,
        lastUpdateTimeFirstTcTime: 1527520025823,
      }, {
        ssId: 100,
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        lastUpdateModeStatus: 1527520025823,
        lastUpdateTimeStatus: 1527520025823,
        executionTimeFirstTc: 1000,
        apid: 100,
        ssIdLabel: 'mySTRING',
        lastUpdateModeSubScheduleId: 1527520025823,
        lastUpdateTimeSubscheduleId: 1527520025823,
        lastUpdateModeFirstTcTime: 1527520025823,
        lastUpdateTimeFirstTcTime: 1527520025823,
      }, {
        ssId: 100,
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        lastUpdateModeStatus: 1527520025823,
        lastUpdateTimeStatus: 1527520025823,
        executionTimeFirstTc: 1000,
        apid: 100,
        ssIdLabel: 'mySTRING',
        lastUpdateModeSubScheduleId: 1527520025823,
        lastUpdateTimeSubscheduleId: 1527520025823,
        lastUpdateModeFirstTcTime: 1527520025823,
        lastUpdateTimeFirstTcTime: 1527520025823,
      },
    ],
    Pus011Apid: [
      {
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        apid: 100,
        lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTime: 1527520025823,
      },
      {
        status: 200, // either 100 (ENABLED) / 200 (DISABLED)
        apid: 100,
        lastUpdateMode: 'TC', // either TM / TC / TIMEOUT
        lastUpdateTime: 1527520025823,
      },
      {
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        apid: 100,
        lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTime: 1527520025823,
      },
      {
        status: 200, // either 100 (ENABLED) / 200 (DISABLED)
        apid: 100,
        lastUpdateMode: 'TC', // either TM / TC / TIMEOUT
        lastUpdateTime: 1527520025823,
      },
    ],
    Pus011Command: [
      {
        commandApid: 100,
        commandBinaryProfile: Buffer.alloc(4, 1),
        lastUpdateModeBinProf: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTimeBinProf: 1527520025823,
        commandGroundStatus: 100,
        lastUpdateModeGroundStatus: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTimeGroundStatus: 1527520025823,
        commandName: 'mySTRING',
        commandSequenceCount: 100,
        commandStatus: 100,
        lastUpdateModeStatus: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTimeStatus: 1527520025823,
        currentExecutionTime: 1527520025823,
        lastUpdateModeCurrentExecTime: 1527520025823,
        lastUpdateTimeCurrentExecTime: 1527520025823,
        initialExecutionTime: 1527520025823,
        commandSourceId: 100,
        commandSsId: 100,
        totalTimeShiftOffset: -100,
        pus011CommandParameters: [
          {
            parameterName: 'mySTRING',
            parameterValue: 'mySTRING',
            parameterDescription: 'mySTRING',
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: 1527520025823,
          },
          {
            parameterName: 'mySTRING',
            parameterValue: 'mySTRING',
            parameterDescription: 'mySTRING',
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: 1527520025823,
          },
          {
            parameterName: 'mySTRING',
            parameterValue: 'mySTRING',
            parameterDescription: 'mySTRING',
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: 1527520025823,
          },
        ],
        pus011TimeShift: [
          {
            applicationTime: 1527520025823,
            timeShiftOffset: -100,
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: 1527520025823,
          },
          {
            applicationTime: 1527520025823,
            timeShiftOffset: -100,
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: 1527520025823,
          },
          {
            applicationTime: 1527520025823,
            timeShiftOffset: -100,
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: 1527520025823,
          },
        ],
        apid: 100,
        commandDescription: 'mySTRING',
        commandApidName: 'mySTRING',
        lastUpdateModeCommand: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTimeCommand: 1527520025823,
      },
    ],
  };
  store.dispatch(incomingPusRange(yann));
  // const buffer = buffers[0];
  // const callback = pop(requestId);

  // try {
  //   const { pusWholeModel /* ,delta */ } = decode('pusActor.pusUtils.PusOnInitialize', buffer);
  //   const { /* modelUniqueId, */ pusName, payload } = pusWholeModel;
  //   // console.log('Type ', getType(pusName));
  //   const pusDecoded = decode(getType(pusName), payload);
  //   logger.info(pusDecoded);
  //   // callback(null, domains);
  // } catch (e) {
  //   logger.error('error on processing buffer', e);
  //   getStore().dispatch(addMessage('global', 'warning',//     'error on processing header buffer '.concat(e)));
  //   // callback(e);
  // }
};
