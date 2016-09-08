//const debug = require('../io/debug')('timeBar:tbUpdate');
const diff = require('deep-diff').diff;


// Get index of id in table
function getIndex(table, id) {
  // Number of timelines already declared
  const length = table.length;
  // Check if new Id is already declared in timeline table
  for (let i = 0; i < length; i++) {
    if (table[i].id === id) return i;
  }
  return -1;
}


function createObjectParam(object, param) {
  if (!Object.getOwnPropertyDescriptor(object, param)) object[param] = {};
}
function createArrayParam(object, param) {
  if (!Object.getOwnPropertyDescriptor(object, param)) object[param] = [];
}

function addTlUpdate(cmdList, tl, param) {
  if (!cmdList) cmdList = {};
  createObjectParam(cmdList, 'timelineUpdate');
  createObjectParam(cmdList.timelineUpdate, 'timeLines');
  createObjectParam(cmdList.timelineUpdate.timeLines, tl.id);
  cmdList.timelineUpdate.timeLines[tl.id][param] = tl[param];
}

module.exports = (oldTb, newTb) => {
  let cmdList;
  // Comparison between timebars when this is not initialization or saving
  switch (newTb.data.action) {
    case 'initialUpd':
      break;
    case 'tbSaving':
      break;
    default:
      // Take timeline tables to make specific Comparison
      const newTimebar = JSON.parse(JSON.stringify(newTb));
      const newTls = newTimebar.data.timeLines.splice(0, newTimebar.data.timeLines.length);
      const oldTimebar = JSON.parse(JSON.stringify(oldTb)) ;
      const oldTls = oldTimebar.data.timeLines.splice(0, oldTimebar.data.timeLines.length);

      // Get differences between versions
      const result = diff(oldTimebar, newTimebar);
      if (result) cmdList = {};
      for (key in result) {
        const current = result[key];

        if (current.kind === 'E') {
          switch (current.path[1]) {
            // ---------- Visualization window updates
            case 'visuWindow':
              // Update of parameter of visuWindow
              createObjectParam(cmdList, 'visuWindowUpdate');
              if (current.path[2] === 'current') {
                cmdList.visuWindowUpdate.current = current.rhs;
              } else {
                createObjectParam(cmdList.visuWindowUpdate, 'bounds');
                cmdList.visuWindowUpdate.bounds.lower = newTb.data.visuWindow.lower;
                cmdList.visuWindowUpdate.bounds.upper = newTb.data.visuWindow.upper;
              }
              break;
            case 'slideWindow':
              // Add slideWindow under visuWindowUpdate
              createObjectParam(cmdList, 'visuWindowUpdate');
              const visuW = cmdList.visuWindowUpdate;
              createObjectParam(visuW, 'slideWindow');
              cmdList.visuWindowUpdate.slideWindow.lower = newTimebar.data.slideWindow.lower;
              cmdList.visuWindowUpdate.slideWindow.upper = newTimebar.data.slideWindow.upper;
              break;
            case 'extUpperBound':
              // Add extUpperBound under visuWindowUpdate
              createObjectParam(cmdList, 'visuWindowUpdate');
              cmdList.visuWindowUpdate.extUpperBound = current.rhs;
              break;
            case 'masterId':
              createObjectParam(cmdList, 'timelineUpdate');
              cmdList.timelineUpdate.masterId = current.rhs;
              break;
            case 'offsetFromUTC':
              createObjectParam(cmdList, 'timelineUpdate');
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
      }
      // --- timeline treatment
      // addition
      newTls.forEach((element, index, array) => {
        const ind = getIndex(oldTls, element.id);
        if (ind < 0) {
          // Add action in cmdList
          if (!cmdList) cmdList = {};
          createArrayParam(cmdList, 'timelineAdded');
          cmdList.timelineAdded.push(element);
        } else {
          // Check for updates
          if (oldTls[ind].name !== element.name) addTlUpdate(cmdList, element, 'name');
          if (oldTls[ind].offset !== element.offset) addTlUpdate(cmdList, element, 'offset');
          if (oldTls[ind].kind !== element.kind) {
            addTlUpdate(cmdList, element, 'kind');
            if (element.kind === 'Session') addTlUpdate(cmdList, element, 'sessionId');
            else if (element.kind === 'Dataset') addTlUpdate(cmdList, element, 'dsPath');
            else if (element.kind === 'Recordset') addTlUpdate(cmdList, element, 'rsPath');
          } else {
            if (element.sessionId && oldTls[ind].sessionId !== element.sessionId) {
              addTlUpdate(cmdList, element, 'sessionId');
            } else if (element.dsPath && oldTls[ind].dsPath !== element.dsPath) {
              addTlUpdate(cmdList, element, 'dsPath');
            } else if (element.rsPath && oldTls[ind].rsPath !== element.rsPath) {
              addTlUpdate(cmdList, element, 'rsPath');
            }
          }
        }
      });
      // deletion
      oldTls.forEach((element, index, array) => {
        if (getIndex(newTls, element.id) < 0) {
          // Remove action in cmdList
          if (!cmdList) cmdList = {};
          createArrayParam(cmdList, 'timelineRemoved');
          cmdList.timelineRemoved.push(element);
        }
      });
  }
  return cmdList;
};
