const { diff } = require('deep-diff');
const _ = require('lodash');

let cmdList;
function createObjectParamOnCmdList(param, keyNames) {
  if (!cmdList) {
    cmdList = {};
  }
  let current = cmdList;
  let final = cmdList;
  _.forEach(keyNames, (element) => {
    current = final;
    if (!Object.getOwnPropertyDescriptor(current, element)) {
      current[element] = {};
    }
    final = current[element];
  });
  if (!Object.getOwnPropertyDescriptor(final, param)) {
    final[param] = {};
  }
}

function createArrayParamOnCmdList(param, keyNames) {
  if (!cmdList) {
    cmdList = {};
  }
  let current = cmdList;
  let final = current;
  _.forEach(keyNames, (element) => {
    current = final;
    if (!Object.getOwnPropertyDescriptor(current, element)) {
      current[element] = {};
    }
    final = current[element];
  });
  if (!Object.getOwnPropertyDescriptor(final, param)) {
    final[param] = [];
  }
}

function addTlUpdate(tl, param) {
  if (!cmdList) {
    cmdList = {};
  }
  createObjectParamOnCmdList(tl.id, ['timelineUpdate', 'timelines']);
  cmdList.timelineUpdate.timelines[tl.id][param] = tl[param];
}

module.exports = (oldTb, newTb) => {
  // Comparison between timebars when this is not initialization or saving
  switch (newTb.actionType) {
    case 'initialUpd':
      cmdList = undefined;
      break;
    case 'tbSaving':
      cmdList = undefined;
      break;
    default: {
      // Take timeline tables to make specific Comparison
      const newTimebar = JSON.parse(JSON.stringify(newTb));
      let newTls = [];
      if (newTimebar.timelines) {
        newTls = newTimebar.timelines.splice(0, newTimebar.timelines.length);
      }
      const oldTimebar = JSON.parse(JSON.stringify(oldTb));
      let oldTls = [];
      if (oldTimebar.timelines) {
        oldTls = oldTimebar.timelines.splice(0, oldTimebar.timelines.length);
      }
      // Get differences between versions
      const result = diff(oldTimebar, newTimebar);
      if (result) {
        cmdList = {};
      }
      _.each(result, (current) => {
        if (current.kind === 'E') {
          switch (current.path[0]) {
            // ---------- Visualization window updates
            case 'visuWindow':
              // Update of parameter of visuWindow
              createObjectParamOnCmdList('visuWindowUpdate');
              cmdList.visuWindowUpdate.lower = newTb.visuWindow.lower;
              cmdList.visuWindowUpdate.upper = newTb.visuWindow.upper;
              cmdList.visuWindowUpdate.current = newTb.visuWindow.current;
              break;
            case 'slideWindow':
              // Add slideWindow under visuWindowUpdate
              createObjectParamOnCmdList('slideWindow', ['visuWindowUpdate']);
              cmdList.visuWindowUpdate.slideWindow.lower = newTimebar.slideWindow.lower;
              cmdList.visuWindowUpdate.slideWindow.upper = newTimebar.slideWindow.upper;
              break;
            case 'extUpperBound':
              createObjectParamOnCmdList('visuWindowUpdate');
              cmdList.visuWindowUpdate.extUpperBound = current.rhs;
              break;
            case 'masterId':
              createObjectParamOnCmdList('timelineUpdate');
              cmdList.timelineUpdate.masterId = current.rhs;
              break;
            case 'offsetFromUTC':
              createObjectParamOnCmdList('timelineUpdate');
              cmdList.timelineUpdate.offsetFromUTC = current.rhs;
              break;
            // ---------- Other updates
            case 'mode':
              cmdList.modeUpdate = current.rhs;
              break;
            case 'playingState':
              cmdList.playingStateUpdate = current.rhs;
              break;
            case 'speed':
              cmdList.speedUpdate = current.rhs;
              break;
            case 'timeSpec':
              cmdList.timeSpecUpdate = current.rhs;
              break;
            case 'id':
              cmdList.idUpdate = current.rhs;
              break;
            default:
            // case for actions
          }
          // } else {
          //   // **** Case for action update : nothing to do ?
        }
      });
      // --- timeline treatment
      // addition
      _.forEach(newTls, (element) => {
        const oldTl = _.find(oldTls, { id: element.id }); // TODO compare uuid?
        if (!oldTl) {
          // Add action in cmdList
          createArrayParamOnCmdList('timelineAdded');
          cmdList.timelineAdded.push(element);
        } else {
          // Check for updates
          // if (oldTl.name !== element.name) {
          //   addTlUpdate(element, 'name');
          // }
          if (oldTl.offset !== element.offset) {
            addTlUpdate(element, 'offset');
          }
          if (oldTl.kind !== element.kind) {
            addTlUpdate(element, 'kind');
            if (element.kind === 'Session') {
              addTlUpdate(element, 'sessionId');
            } else if (element.kind === 'Dataset') {
              addTlUpdate(element, 'dsPath');
            } else if (element.kind === 'Recordset') {
              addTlUpdate(element, 'rsPath');
            }
          } else {
            switch (element.kind) {
              case 'Session':
                if (oldTl.sessionId !== parseInt(element.sessionId)) {
                  addTlUpdate(element, 'sessionId');
                }
                break;
              case 'Dataset':
                if (oldTl.dsPath !== element.dsPath) {
                  addTlUpdate(element, 'dsPath');
                }
                break;
              case 'Recordset':
                if (oldTl.rsPath !== element.rsPath) {
                  addTlUpdate(element, 'rsPath');
                }
                break;
              default:
                // debug.debug('Unknown kind', element.kind);
            }
          }
        }
      });
      // deletion
      _.forEach(oldTls, (element) => {
        const oldTl = _.find(newTls, { id: _.get(element, 'id') });
        if (!oldTl) {
          createArrayParamOnCmdList('timelineRemoved');
          cmdList.timelineRemoved.push(element);
        }
      });
    }
  }
  return cmdList;
};
