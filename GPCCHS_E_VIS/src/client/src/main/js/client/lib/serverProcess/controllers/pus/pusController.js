
// const { decode, getType } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:PUS:onInitialize');

const { incomingPus } = require('store/actions/pus');

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
  const timestamp = Date.now();
  console.log(timestamp);
  const store = getStore();
  const yann = {

    Pus011Model: {
      maxNoTc: 100,
      scheduleStatus: 100, // either 100 (ENABLED) / 200 (DISABLED)
      lastUpdateTimeScheduleStatus: timestamp,
      apid: 100,
      noFreeCommands: 100,
      lastUpdateTimeNoFreeCommands: timestamp,
      freeSpace: 100,
      lastUpdateTimeFreeSpace: timestamp,
      spaceInNumberOfCommands: true,
      noSubSchedule: 100,
      status: 100, // either 100 (ENABLED) / 200 (DISABLED)
      pus011Apid: [
        {
          status: 100, // either 100 (ENABLED) / 200 (DISABLED)
          apid: 100,
          lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
          lastUpdateTime: timestamp,
        },
        {
          status: 100, // either 100 (ENABLED) / 200 (DISABLED)
          apid: 100,
          lastUpdateMode: 'TC', // either TM / TC / TIMEOUT
          lastUpdateTime: timestamp,
        },
      ],
      lastUpdateModeFreeSpace: timestamp,
      lastUpdateModeNoFreeCommands: timestamp,
      lastUpdateModeScheduleStatus: timestamp,
      // scheduleStatus: 'ENABLED',
      // availableSpace: '1000',
      // spaceType: 'Bytes',
      // lastUpdateTime: timestamp,
      // lastUpdateType: 'TM',
    },
    Pus011SubSchedule: [
      {
        ssId: 100,
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        lastUpdateModeStatus: timestamp,
        lastUpdateTimeStatus: timestamp,
        executionTimeFirstTc: 1000,
        apid: 100,
        ssIdLabel: 'mySTRING',
        lastUpdateModeSubScheduleId: timestamp,
        lastUpdateTimeSubscheduleId: timestamp,
        lastUpdateModeFirstTcTime: timestamp,
        lastUpdateTimeFirstTcTime: timestamp,
      },
      {
        ssId: 100,
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        lastUpdateModeStatus: timestamp,
        lastUpdateTimeStatus: timestamp,
        executionTimeFirstTc: 1000,
        apid: 100,
        ssIdLabel: 'mySTRING',
        lastUpdateModeSubScheduleId: timestamp,
        lastUpdateTimeSubscheduleId: timestamp,
        lastUpdateModeFirstTcTime: timestamp,
        lastUpdateTimeFirstTcTime: timestamp,
      }, {
        ssId: 100,
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        lastUpdateModeStatus: timestamp,
        lastUpdateTimeStatus: timestamp,
        executionTimeFirstTc: 1000,
        apid: 100,
        ssIdLabel: 'mySTRING',
        lastUpdateModeSubScheduleId: timestamp,
        lastUpdateTimeSubscheduleId: timestamp,
        lastUpdateModeFirstTcTime: timestamp,
        lastUpdateTimeFirstTcTime: timestamp,
      }, {
        ssId: 100,
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        lastUpdateModeStatus: timestamp,
        lastUpdateTimeStatus: timestamp,
        executionTimeFirstTc: 1000,
        apid: 100,
        ssIdLabel: 'mySTRING',
        lastUpdateModeSubScheduleId: timestamp,
        lastUpdateTimeSubscheduleId: timestamp,
        lastUpdateModeFirstTcTime: timestamp,
        lastUpdateTimeFirstTcTime: timestamp,
      },
    ],
    Pus011Apid: [
      {
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        apid: 100,
        lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTime: timestamp,
      },
      {
        status: 200, // either 100 (ENABLED) / 200 (DISABLED)
        apid: 100,
        lastUpdateMode: 'TC', // either TM / TC / TIMEOUT
        lastUpdateTime: timestamp,
      },
      {
        status: 100, // either 100 (ENABLED) / 200 (DISABLED)
        apid: 100,
        lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTime: timestamp,
      },
      {
        status: 200, // either 100 (ENABLED) / 200 (DISABLED)
        apid: 100,
        lastUpdateMode: 'TC', // either TM / TC / TIMEOUT
        lastUpdateTime: timestamp,
      },
    ],
    Pus011Command: [
      {
        commandApid: 100,
        commandBinaryProfile: Buffer.alloc(4, 1),
        lastUpdateModeBinProf: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTimeBinProf: timestamp,
        commandGroundStatus: 100,
        lastUpdateModeGroundStatus: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTimeGroundStatus: timestamp,
        commandName: 'mySTRING',
        commandSequenceCount: 100,
        commandStatus: 100,
        lastUpdateModeStatus: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTimeStatus: timestamp,
        currentExecutionTime: timestamp,
        lastUpdateModeCurrentExecTime: timestamp,
        lastUpdateTimeCurrentExecTime: timestamp,
        initialExecutionTime: timestamp,
        commandSourceId: 100,
        commandSsId: 100,
        totalTimeShiftOffset: -100,
        pus011CommandParameters: [
          {
            parameterName: 'mySTRING',
            parameterValue: 'mySTRING',
            parameterDescription: 'mySTRING',
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: timestamp,
          },
          {
            parameterName: 'mySTRING',
            parameterValue: 'mySTRING',
            parameterDescription: 'mySTRING',
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: timestamp,
          },
          {
            parameterName: 'mySTRING',
            parameterValue: 'mySTRING',
            parameterDescription: 'mySTRING',
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: timestamp,
          },
        ],
        pus011TimeShift: [
          {
            applicationTime: timestamp,
            timeShiftOffset: -100,
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: timestamp,
          },
          {
            applicationTime: timestamp,
            timeShiftOffset: -100,
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: timestamp,
          },
          {
            applicationTime: timestamp,
            timeShiftOffset: -100,
            lastUpdateMode: 'TM', // either TM / TC / TIMEOUT
            lastUpdateTime: timestamp,
          },
        ],
        apid: 100,
        commandDescription: 'mySTRING',
        commandApidName: 'mySTRING',
        lastUpdateModeCommand: 'TM', // either TM / TC / TIMEOUT
        lastUpdateTimeCommand: timestamp,
      },
    ],
  };
  store.dispatch(incomingPus(yann));
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
