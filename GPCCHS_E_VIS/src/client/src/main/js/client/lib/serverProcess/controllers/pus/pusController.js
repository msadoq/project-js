
// const { decode, getType } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:PUS:onInitialize');

const { incomingPus } = require('store/actions/pus');
const { VM_VIEW_PUS11, VM_VIEW_PUS14 } = require('viewManager/constants');
// const { pop } = require('../../../common/callbacks');
// const { add: addMessage } = require('../../../store/actions/messages');

/**
 * Triggered on pus request response.
 *
 * - decode and pass to registered callback
 *
 * @param buffers
 * @param getStore
 */
module.exports = (buffers, getStore) => {
  logger.silly('called');
  const timestamp = Date.now();
  const store = getStore();
  const pus11 = {
    pus011Model: {
      serviceApid: 100, // affiché en haut de la vue
      status: 1, // inutilisé
      spaceInNumberOfCommands: true, // détermine si l’on doit afficher “noFreeCommands” ou “freeSpace” dans la vue
      scheduleStatus: 1, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue
      lastUpdateTimeScheduleStatus: timestamp, // Tooltip sur scheduleStatus
      lastUpdateModeScheduleStatus: 1,  // Tooltip sur scheduleStatus
      noFreeCommands: 100, // affiché dans la vue si spaceInNumberOfCommands est a false
      lastUpdateTimeNoFreeCommands: timestamp, // Tooltip sur noFreeCommands
      lastUpdateModeNoFreeCommands: 1, // Tooltip sur noFreeCommands
      freeSpace: 100,  // affiché dans la vue si spaceInNumberOfCommands est a true
      lastUpdateTimeFreeSpace: timestamp,  // Tooltip sur freeSpace
      lastUpdateModeFreeSpace: 1, // Tooltip sur freeSpace
      serviceApidName: 'myString', // affiché en haut de la vue
      uniqueId: 100, // inutilisé
      pus011Apid: [
        {
          apid: 100, // à afficher dans le tableau Enabled AP
          lastUpdateModeApid: 1, // Tooltip sur apid / apidName
          lastUpdateTimeApid: timestamp, // Tooltip sur apid / apidName
          status: Math.floor(Math.random() * 2) + 1,  // only display enabled apids (2) and hide disabled (1)
          lastUpdateModeStatus: 1,  // inutilisé
          lastUpdateTimeStatus: timestamp,  // inutilisé
          serviceApid: 100, // inutilisé
          serviceApidName: 'myString', // inutilisé
          apidName: 'myString', // A afficher dans le tableau Enabled AP
          uniqueId: 1, // inutilisé
        },
      ],
      pus011SubSchedule: [
        {
          serviceApid: 100, // inutilisé
          ssId: 100, // A afficher dans le tableau SubSchedules
          status: 1, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue
          ssIdLabel: 'myString', // A afficher dans le tableau SubSchedules
          lastUpdateModeSubScheduleId: 1, // Tooltip sur ssId & ssIdLabel
          lastUpdateTimeSubscheduleId: timestamp, // Tooltip sur ssId & ssIdLabel
          lastUpdateModeStatus: 1, // Tooltip sur Status
          lastUpdateTimeStatus: timestamp, // Tooltip sur Status
          lastUpdateModeExecTimeFirstTc: 1, // inutilisé
          lastUpdateTimeExecTimeFirstTc: timestamp, // inutilisé
          serviceApidName: 'myString', // inutilisé
          uniqueId: timestamp, // inutilisé
        },
      ],
      pus011Command: [
        {
          uniqueId: 100, // inutilisé dans la vue
          commandApid: 100, // A afficher dans le tableau Commands
          commandApidName: 'mySTRING', // A afficher dans le tableau Commands
          commandName: 'mySTRING', // A afficher dans le tableau Commands
          commandDescription: 'mySTRING', // A afficher dans le tableau Commands
          commandSequenceCount: 100, // A afficher dans le tableau Commands
          commandSourceId: 100, // A afficher dans le tableau Commands
          commandSsId: 100, // A afficher dans le tableau Commands
          serviceApid: 100, // inutilisé dans la vue
          lastUpdateModeCommandId: 2, // Tooltip sur commandSsId
          lastUpdateTimeCommandId: timestamp, // Tooltip sur commandSsId
          commandBinaryProfile: 'Buffer.alloc(4, 1)', // A afficher dans la popin
          lastUpdateModeBinProf: 2, // Tooltip dans la popin
          lastUpdateTimeBinProf: timestamp, // Tooltip dans la popin
          commandGroundStatus: 1, // A afficher dans le tableau Commands
          lastUpdateModeGroundStatus: 2, // Tooltip sur commandGroundStatus
          lastUpdateTimeGroundStatus: timestamp, // Tooltip sur commandGroundStatus
          commandStatus: 1, // A afficher dans le tableau Commands. Si 3 (DELETED), supprimer l’entrée du state
          lastUpdateModeStatus: 2, // Tooltip sur status
          lastUpdateTimeStatus: timestamp, // Tooltip sur status
          currentExecutionTime: timestamp, // A afficher dans le tableau Commands
          lastUpdateModeCurrentExecTime: 1, // Tooltip sur currentExecutionTime
          lastUpdateTimeCurrentExecTime: timestamp, // Tooltip sur currentExecutionTime
          initialExecutionTime: timestamp, // A afficher dans le tableau Commands
          lastUpdateModeInitialExecTime: 1, // Tooltip sur initialExecutionTime
          lastUpdateTimeInitialExecTime: timestamp, // Tooltip sur initialExecutionTime
          totalTimeShiftOffset: -100, // A afficher dans le tableau Commands
          lastUpdateModeTotalTimeShiftOffset: 2, // Tooltip sur totalTimeShiftOffset
          lastUpdateTimeTotalTimeShiftOffset: timestamp, // Tooltip sur totalTimeShiftOffset
          serviceApidName: 'myString', // Inutilisé dans la vue
          pus011CommandParameters: [
            {
              parameterName: 'myString', // Affiché dans la popin au dblClick sur une command
              parameterValue: 100, // Affiché dans la popin au dblClick sur une command
              parameterDescription: 'myString', // Affiché dans la popin au dblClick sur une command
              lastUpdateMode: 2, // Tooltip sur les trois précédents champs
              lastUpdateTime: timestamp, // Tooltip sur les trois précédents champs
            },
          ],
          pus011TimeShift: [
            {
              applicationTime: timestamp, // Affiché dans la popin au dbleClick sur une command
              timeShiftOffset: -100, // Affiché dans la popin au dbleClick sur une command
              lastUpdateMode: 2, // Tooltip sur les trois précédents champs
              lastUpdateTime: timestamp, // Tooltip sur les trois précédents champs
            },
          ],
        },
      ],
    },
  };
  const pus14 = {
    pus014Model: {
      pus014TmPacket: [
        {
          packetApid: 100, // A afficher dans le tableau de packets
          forwardingStatus: 1, // A afficher dans le tableau de packets
          lastUpdateModeFwdStatus: 1, // Tooltip sur forwardingStatus
          lastUpdateTimeFwdStatus: 1527520025823,  // Tooltip sur forwardingStatus
          packetApidName: 'myString', // A afficher dans le tableau de packets
          serviceApid: 100, // Inutilisé dans la vue
          packetName: 'myString',  // A afficher dans le tableau de packets
          serviceApidName: 'myString', // Inutilisé dans la vue
          lastUpdateModeRid: 100,  // Tooltip sur rid / ridLabel
          lastUpdateTimeRid: 1527520025823, // Tooltip sur rid / ridLabel
          rid: 100,  // A afficher dans le tableau de packets
          ridLabel: 'myString', // A afficher dans le tableau de packets
          lastUpdateModeSid: 1, // Tooltip sur sid, sidLabel
          lastUpdateTimeSid: 1527520025823, // Tooltip sur sid, sidLabel
          lastUpdateModeSubSamplingRatio: 1, // Tooltip sur subsamplingRatio
          lastUpdateTimeSubSamplingRatio: 1527520025823, // Tooltip sur subsamplingRatio
          subsamplingRatio: 100, // A afficher dans le tableau de packets
          sid: 100, // A afficher dans le tableau de packets
          sidLabel: 'myString', // A afficher dans le tableau de packets
          lastUpdateModeTypeSubType: 1, // Tooltip sur serviceTpe, serviceSubType
          lastUpdateTimeTypeSubType: 1527520025823, // Tooltip sur serviceTpe, serviceSubType
          serviceTpe: 1, // A afficher dans le tableau de packets
          serviceSubType: 2, // A afficher dans le tableau de packets
          uniqueId: 100, // Inutilisé dans la vue
          status: 1, // Non affiché dans la vue.  Si 3 (DELETED), supprimer l’entrée du state
        },
      ],
      groundDate: 1527520025823, // Inutilisé dans la vue
      serviceApid: 100, // A afficher dans la vue
      status: 1, // Inutilisé dans la vue Si 3 (DELETED), supprimer l’entrée du state
      serviceApidName: 'myString', // A afficher dans la vue
      uniqueId: 100, // Inutilisé dans la vue
    },
  };
  store.dispatch(incomingPus({
    [VM_VIEW_PUS11]: pus11,
    [VM_VIEW_PUS14]: pus14,
  }));

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
