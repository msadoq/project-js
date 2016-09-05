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
  createArrayParam(cmdList.timelineUpdate, 'timeLines');
  const tlUpd = { id: tl.id };
  tlUpd[param] = tl[param];
  cmdList.timelineUpdate.timeLines.push(tlUpd);
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
              cmdList.visuWindowUpdate[current.path[2]] = current.rhs;
              break;
            case 'slideWindow':
              // Add slideWindow under visuWindowUpdate
              createObjectParam(cmdList, 'visuWindowUpdate');
              const visuW = cmdList.visuWindowUpdate;
              createObjectParam(visuW, 'slideWindow');
              visuW.slideWindow[current.path[2]] = current.rhs;
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
      for (let i = 0; i < newTls.length; i++) {
        const tl = newTls[i];
        const index = getIndex(oldTls, tl.id);
        if (index < 0) {
          // Add action in cmdList
          if (!cmdList) cmdList = {};
          createArrayParam(cmdList, 'timelineAdded');
          cmdList.timelineAdded.push(tl);
        } else {
          // Check for updates
          if (oldTls[index].name !== tl.name) addTlUpdate(cmdList,tl,'name');
          if (oldTls[index].offset !== tl.offset) addTlUpdate(cmdList,tl,'offset');
          if (oldTls[index].kind !== tl.kind) {
            addTlUpdate(cmdList,tl,'kind');
            if (tl.kind === 'Session') addTlUpdate(cmdList,tl,'sessionId');
            else if (tl.kind === 'Dataset') addTlUpdate(cmdList,tl,'dsPath');
            else if (tl.kind === 'Recordset') addTlUpdate(cmdList,tl,'rsPath');
          }
        }
      }
      // deletion
      for (let i = 0; i < oldTls.length; i++) {
        const tl = oldTls[i];
        if (getIndex(newTls, tl.id) < 0) {
          // Remove action in cmdList
          if (!cmdList) cmdList = {};
          createArrayParam(cmdList, 'timelineRemoved');
          cmdList.timelineRemoved.push(tl);
        }
      }
  }
  return cmdList;
};
