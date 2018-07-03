
// const { decode, getType } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:PUS:onInitialize');

const { incomingPus } = require('store/actions/pus');

// const { pop } = require('../../../common/callbacks');
// const { add: addMessage } = require('../../../store/actions/messages');

/**
 * Triggered on pus request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (buffers, getStore) => {
  logger.silly('called');
  const timestamp = Date.now();
  const store = getStore();
  const pus11 = {
    dataToInject: {
      1530092041881: {
        Pus011Model: {
          maxNoTc: 100,
          scheduleStatus: 1,
          apid: 100,
          noFreeCommands: 100,
          lastUpdateTimeNoFreeCommands: timestamp,
          freeSpace: 100,
          lastUpdateTimeFreeSpace: timestamp,
          spaceInNumberOfCommands: true,
          noSubSchedule: 100,
          pusElement: {
            lastUpdateMode: 2,
            lastUpdateTime: timestamp,
          },
          groundDate: timestamp,
          status: 1,
          pus011Apid: [
            {
              status: 1,
              apid: 100,
              pusElement: {
                lastUpdateMode: 2,
                lastUpdateTime: timestamp,
              },
            },
          ],
          useTimeShifts: true,
          lastUpdateModeFreeSpace: 100,
          lastUpdateModeNoFreeCommands: 100,
          lastUpdateModeScheduleStatus: 100,
          lastUpdateTimeScheduleStatus: timestamp,
        },
        Pus011SubSchedule: [
          {
            ssId: 100,
            status: 1,
            executionTimeFirstTc: timestamp,
            apid: 100,
            pusElement: {
              lastUpdateMode: 2,
              lastUpdateTime: timestamp,
            },
            groundDate: timestamp,
            ssIdLabel: 'mySTRING',
            lastUpdateModeStatus: 1,
            lastUpdateTimeStatus: timestamp,
            lastUpdateModeExecTimeFirstTc: 1,
            lastUpdateTimeExecTimeFirstTc: timestamp,
            lastUpdateModeSsId: 1,
            lastUpdateTimeSsId: timestamp,
          },
        ],
        Pus011Apid: [
          {
            status: 1,
            apid: 100,
            pusElement: {
              lastUpdateMode: 2,
              lastUpdateTime: timestamp,
            },
          },
        ],
        Pus011Command: [
          {
            commandApid: 100,
            commandBinaryProfile: 'Buffer.alloc(4, 1)',
            commandGroundStatus: 1,
            commandName: 'mySTRING',
            commandSequenceCount: 100,
            commandStatus: 1,
            currentExecutionTime: timestamp,
            initialExecutionTime: timestamp,
            commandSourceId: 100,
            commandSsId: 100,
            totalTimeShiftOffset: -100,
            pus011EncapsulatingTc: {
              sourceId: 100,
              commandApid: 100,
              sequenceCount: 100,
            },
            pus011CommandParameters: [
              {
                parameterName: 'mySTRING',
                parameterValue: 100,
              },
            ],
            pus011TimeShift: [
              {
                applicationTime: timestamp,
                timeShiftOffset: -100,
              },
            ],
            invalidBinaryTcDetected: false,
            apid: 100,
            pusElement: {
              lastUpdateMode: 2,
              lastUpdateTime: timestamp,
            },
            groundDate: timestamp,
            lastUpdateModeBinProf: 2,
            lastUpdateTimeBinProf: timestamp,
            lastUpdateModeGroundStatus: 2,
            lastUpdateTimeGroundStatus: timestamp,
            lastUpdateModeStatus: 2,
            lastUpdateTimeStatus: timestamp,
            lastUpdateModeInitExecTime: 2,
            lastUpdateTimeInitExecTime: timestamp,
            lastUpdateModeTotalShiftOffset: 2,
            lastUpdateTimeCurrExecTime: timestamp,
            lastUpdateModeCurrExecTime: 2,
            lastUpdateTimeTotalShiftOffset: timestamp,
            lastUpdateModeCommandId: 2,
            lastUpdateTimeCommandId: timestamp,
          },
        ],
      },
    },
  };
  store.dispatch(incomingPus(pus11));
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
