const debug = require('../io/debug')('timeBar:tbUpdate');
const diff = require('deep-diff').diff;
const _ = require('lodash');


// Get index of id in table
function getIndex(table, id) {
  // Number of timelines already declared
  // const length = table.length;
  // // Check if new Id is already declared in timeline table
  // for (let i = 0; i < length; i++) {
  //   if (table[i].id === id) {
  //     return i;
  //   }
  // }
  const a = _.filter(table, item => {
    if (item.id === id) {
    return item.id === id;
  }});
  return -1;
}

let cmdList;
function createObjectParamOnCmdList(param, keyNames) {
  if (!cmdList) {
    cmdList = {};
  }
  let current = cmdList;
  let final = cmdList;
  _.forEach(keyNames, element => {
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
  _.forEach(keyNames, element => {
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
  createObjectParamOnCmdList(tl.id, ['timelineUpdate', 'timeLines']);
  cmdList.timelineUpdate.timeLines[tl.id][param] = tl[param];
}

module.exports = (oldTb, newTb) => {
  // Comparison between timebars when this is not initialization or saving
  switch (newTb.action) {
    case 'initialUpd':
      cmdList = undefined;
      break;
    case 'tbSaving':
      cmdList = undefined;
      break;
    default: {
      // Take timeline tables to make specific Comparison
      const newTimebar = JSON.parse(JSON.stringify(newTb));
      const newTls = newTimebar.timeLines.splice(0, newTimebar.timeLines.length);
      const oldTimebar = JSON.parse(JSON.stringify(oldTb));
      const oldTls = oldTimebar.timeLines.splice(0, oldTimebar.timeLines.length);

      // Get differences between versions
      const result = diff(oldTimebar, newTimebar);
      if (result) {
        cmdList = {};
      }
      _.each(result, current => {
        if (current.kind === 'E') {
          switch (current.path[0]) {
            // ---------- Visualization window updates
            case 'visuWindow':
              // Update of parameter of visuWindow
              createObjectParamOnCmdList('visuWindowUpdate');
              if (current.path[1] === 'current') {
                cmdList.visuWindowUpdate.current = current.rhs;
              } else {
                createObjectParamOnCmdList('bounds', ['visuWindowUpdate']);
                cmdList.visuWindowUpdate.bounds.lower = newTb.visuWindow.lower;
                cmdList.visuWindowUpdate.bounds.upper = newTb.visuWindow.upper;
              }
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
            default:
              // case for action
          }
        // } else {
        //   // **** Case for action update : nothing to do ?
        }
      });
      // --- timeline treatment
      // addition
      _.forEach(newTls, element => {
        const oldTl = _.find(oldTls, { id: element.id });
        if (!oldTl) {
          // Add action in cmdList
          createArrayParamOnCmdList('timelineAdded');
          cmdList.timelineAdded.push(element);
        } else {
          // Check for updates
          if (oldTl.name !== element.name) {
            addTlUpdate(element, 'name');
          }
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
                if (oldTl.sessionId !== element.sessionId) {
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
                debug.debug('Unknown kind', element.kind);
            }
          }
        }
      });
      // deletion
      _.forEach(oldTls, element => {
        const oldTl = _.find(newTls, { id: element.id });
        if (!oldTl) {
          createArrayParamOnCmdList('timelineRemoved');
          cmdList.timelineRemoved.push(element);
        }
      });
    }
  }
  return cmdList;
};
