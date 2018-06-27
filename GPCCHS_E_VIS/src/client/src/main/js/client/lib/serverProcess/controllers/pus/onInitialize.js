
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
  const pus11 = {
    dataToInject: {
      1530092041881: {
        Pus011Model: {
          maxNoTc: 100,
          scheduleStatus: 1,
          apid: 100,
          noFreeCommands: 100,
          lastUpdateTimeNoFreeCommands: 1527520025823,
          freeSpace: 100,
          lastUpdateTimeFreeSpace: 1527520025823,
          spaceInNumberOfCommands: true,
          noSubSchedule: 100,
          pusElement: {
            lastUpdateMode: 2,
            lastUpdateTime: 1527520025823,
          },
          groundDate: 1527520025823,
          status: 1,
          pus011Apid: [
            {
              status: 1,
              apid: 100,
              pusElement: {
                lastUpdateMode: 2,
                lastUpdateTime: 1527520025823,
              },
            },
          ],
          useTimeShifts: true,
          lastUpdateModeFreeSpace: 100,
          lastUpdateModeNoFreeCommands: 100,
          lastUpdateModeScheduleStatus: 100,
          lastUpdateTimeScheduleStatus: 1527520025823,
        },
        Pus011SubSchedule: [
          {
            ssId: 100,
            status: 1,
            executionTimeFirstTc: 1527520025823,
            apid: 100,
            pusElement: {
              lastUpdateMode: 2,
              lastUpdateTime: 1527520025823,
            },
            groundDate: 1527520025823,
            ssIdLabel: 'mySTRING',
            lastUpdateModeStatus: 1,
            lastUpdateTimeStatus: 1527520025823,
            lastUpdateModeExecTimeFirstTc: 1,
            lastUpdateTimeExecTimeFirstTc: 1527520025823,
            lastUpdateModeSsId: 1,
            lastUpdateTimeSsId: 1527520025823,
          },
        ],
        Pus011Apid: [
          {
            status: 1,
            apid: 100,
            pusElement: {
              lastUpdateMode: 2,
              lastUpdateTime: 1527520025823,
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
            currentExecutionTime: 1527520025823,
            initialExecutionTime: 1527520025823,
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
                applicationTime: 1527520025823,
                timeShiftOffset: -100,
              },
            ],
            invalidBinaryTcDetected: false,
            apid: 100,
            pusElement: {
              lastUpdateMode: 2,
              lastUpdateTime: 1527520025823,
            },
            groundDate: 1527520025823,
            lastUpdateModeBinProf: 2,
            lastUpdateTimeBinProf: 1527520025823,
            lastUpdateModeGroundStatus: 2,
            lastUpdateTimeGroundStatus: 1527520025823,
            lastUpdateModeStatus: 2,
            lastUpdateTimeStatus: 1527520025823,
            lastUpdateModeInitExecTime: 2,
            lastUpdateTimeInitExecTime: 1527520025823,
            lastUpdateModeTotalShiftOffset: 2,
            lastUpdateTimeCurrExecTime: 1527520025823,
            lastUpdateModeCurrExecTime: 2,
            lastUpdateTimeTotalShiftOffset: 1527520025823,
            lastUpdateModeCommandId: 2,
            lastUpdateTimeCommandId: 1527520025823,
          },
        ],
      },
    },
  };
  store.dispatch(incomingPusRange(pus11));
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
