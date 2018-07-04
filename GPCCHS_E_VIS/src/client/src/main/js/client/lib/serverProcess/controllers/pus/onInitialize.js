
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
          serviceApid: 100, // affiché en haut de la vue
          status: 1, // inutilisé
          spaceInNumberOfCommands: true, // détermine si l’on doit afficher “noFreeCommands” ou “freeSpace” dans la vue
          scheduleStatus: 1, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue
          lastUpdateTimeScheduleStatus: 1527520025823, // Tooltip sur scheduleStatus
          lastUpdateModeScheduleStatus: 100,  // Tooltip sur scheduleStatus
          noFreeCommands: 100, // affiché dans la vue si spaceInNumberOfCommands est a false
          lastUpdateTimeNoFreeCommands: 1527520025823, // Tooltip sur noFreeCommands
          lastUpdateModeNoFreeCommands: 100, // Tooltip sur noFreeCommands
          freeSpace: 100,  // affiché dans la vue si spaceInNumberOfCommands est a true
          lastUpdateTimeFreeSpace: 1527520025823,  // Tooltip sur freeSpace
          lastUpdateModeFreeSpace: 100, // Tooltip sur freeSpace
          serviceApidName: 'myString', // affiché en haut de la vue
          uniqueId: 100, // inutilisé
          pus011Apid: [
            {
              apid: 100, // à afficher dans le tableau Enabled AP
              lastUpdateModeApid: 1, // Tooltip sur apid / apidName
              lastUpdateTimeApid: 1527520025823, // Tooltip sur apid / apidName
              status: 1,  // inutilisé
              lastUpdateModeStatus: 1,  // inutilisé
              lastUpdateTimeStatus: 1527520025823,  // inutilisé
              serviceApid: 100, // inutilisé
              serviceApidName: 'myString', // inutilisé
              apidName: 'myString', // A afficher dans le tableau Enabled AP
              uniqueId: 1, // inutilisé
            },
          ],
          Pus011SubSchedule: [
            {
              serviceApid: 100, // inutilisé
              ssId: 100, // A afficher dans le tableau SubSchedules
              status: 1, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue
              ssIdLabel: 'myString', // A afficher dans le tableau SubSchedules
              lastUpdateModeSubScheduleId: 1, // Tooltip sur ssId
              lastUpdateTimeSubscheduleId: 1527520025823, // Tooltip sur ssId
              lastUpdateModeStatus: 1, // Tooltip sur Status
              lastUpdateTimeStatus: 1527520025823, // Tooltip sur Status
              lastUpdateModeExecTimeFirstTc: 1, // inutilisé
              lastUpdateTimeExecTimeFirstTc: 1527520025823, // inutilisé
              serviceApidName: 'myString', // inutilisé
              uniqueId: 1527520025823, // inutilisé
            },
          ],
          Pus011Command: [
            {
              uniqueId: 100, // Inutilisé
              commandApid: 100, // Inutilisé
              commandApidName: 'myString', // Inutilisé
              commandName: 'myString', // A afficher dans le tableau Commands
              commandDescription: 'myString', // A afficher dans le tableau Commands
              commandSequenceCount: 100, // A afficher dans le tableau Commands
              commandSourceId: 100, // A afficher dans le tableau Commands
              commandSsId: 100, // Inutilisé
              serviceApid: 100, // Inutilisé
              lastUpdateModeCommandId: 2, // Inutilisé
              lastUpdateTimeCommandId: 1527520025823, // Inutilisé
              commandBinaryProfile: Buffer.alloc(4, 1), // A afficher dans la popin
              lastUpdateModeBinProf: 2, // Tooltip dans la popin
              lastUpdateTimeBinProf: 1527520025823, // Tooltip dans la popin
              commandGroundStatus: 1, // A afficher dans le tableau Commands
              lastUpdateModeGroundStatus: 2, // Tooltip sur commandGroundStatus
              lastUpdateTimeGroundStatus: 1527520025823, // Tooltip sur commandGroundStatus
              commandStatus: 1, // A afficher dans le tableau Commands
              lastUpdateModeStatus: 2, // Tooltip sur status
              lastUpdateTimeStatus: 1527520025823, // Tooltip sur status
              currentExecutionTime: 1527520025823, // A afficher dans le tableau Commands
              lastUpdateModeCurrentExecTime: 1, // Tooltip sur currentExecutionTime
              lastUpdateTimeCurrentExecTime: 1527520025823, // Tooltip sur currentExecutionTime
              initialExecutionTime: 1527520025823, // A afficher dans le tableau Commands
              lastUpdateModeInitialExecTime: 1, // Tooltip sur initialExecutionTime
              lastUpdateTimeInitialExecTime: 1527520025823, // Tooltip sur initialExecutionTime
              totalTimeShiftOffset: -100, // A afficher dans le tableau Commands
              lastUpdateModeTotalTimeShiftOffset: 2, // Tooltip sur totalTimeShiftOffset
              lastUpdateTimeTotalTimeShiftOffset: 1527520025823, // Tooltip sur totalTimeShiftOffset
              serviceApidName: 'myString', // Inutilisé
              pus011CommandParameters: [
                {
                  parameterName: 'myString', // Affiché dans la popin au dblClick sur une command
                  parameterValue: 100, // Affiché dans la popin au dblClick sur une command
                  parameterDescription: 'myString', // Affiché dans la popin au dblClick sur une command
                  lastUpdateMode: 2, // Tooltip sur les trois précédents champs
                  lastUpdateTime: 1527520025823, // Tooltip sur les trois précédents champs
                },
              ],
              pus011TimeShift: [
                {
                  applicationTime: 1527520025823, // Affiché dans la popin au dbleClick sur une command
                  timeShiftOffset: -100, // Affiché dans la popin au dbleClick sur une command
                  lastUpdateMode: 2, // Tooltip sur les trois précédents champs
                  lastUpdateTime: 1527520025823, // Tooltip sur les trois précédents champs
                },
              ],
            },
          ],
        },
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
