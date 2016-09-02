//const debug = require('../io/debug')('timeBar:tbUpdate');
const diff = require('deep-diff').diff;

// Check presence of id in table
function isIdPresent(table, id) {
  // Number of timelines already declared
  const length = table.length;
  // Check if new Id is already declared in timeline table
  for (let i = 0; i < length; i++) {
    if (table[i].id === id) return true;
  }
  return false;
}


module.exports = (oldTimebar, newTimebar) => {
  let cmdList;
  // Comparison between timebars when this is not initialization or saving
  switch (newTimebar.data.action) {
    case 'initialUpd':
      break;
    case 'tbSaving':
      break;
    default:
      // Get current timebar to process differences
      const isTlNumberDifferent =
        (oldTimebar.data.timeLines.length !== newTimebar.data.timeLines.length);

      // Get differences between versions
      const result = diff(oldTimebar, newTimebar);
      if (!result) break;
      cmdList = {};
      for (key in result) {
        const current = result[key];

        if (current.kind === 'E') {
          switch (current.path[1]) {
            // ---------- Visualization window updates
            case 'visuWindow':
              // Update of parameter of visuWindow
              if (!Object.getOwnPropertyDescriptor(cmdList, 'visuWindowUpdate')) {
                cmdList.visuWindowUpdate = {};
              }
              cmdList.visuWindowUpdate[current.path[2]] = current.rhs;
              break;
            case 'slideWindow':
              // Add slideWindow under visuWindowUpdate
              if (!Object.getOwnPropertyDescriptor(cmdList, 'visuWindowUpdate')) {
                cmdList.visuWindowUpdate = {};
              }
              const visuW = cmdList.visuWindowUpdate;
              if (!Object.getOwnPropertyDescriptor(visuW, 'slideWindow')) visuW.slideWindow = {};
              visuW.slideWindow[current.path[2]] = current.rhs;
              break;
            case 'extUpperBound':
              // Add extUpperBound under visuWindowUpdate
              if (!Object.getOwnPropertyDescriptor(cmdList, 'visuWindowUpdate')) {
                cmdList.visuWindowUpdate = {};
              }
              cmdList.visuWindowUpdate.extUpperBound = current.rhs;
              break;
            // ---------- Timelines updates
            case 'timeLines':
              // -- Check for addition or deletion because treatment is different
              if (isTlNumberDifferent) break;

              // Update of a timeline parameter
              if (!Object.getOwnPropertyDescriptor(cmdList, 'timelineUpdate')) {
                cmdList.timelineUpdate = {};
                cmdList.timelineUpdate.timelines = [];
              }
              // Get ID from index
              const index = current.path[current.path.length - 2];
              const tlId = newTimebar.data.timeLines[index].id;
              const item = { id: tlId };
              item[current.path[current.path.length - 1]] = current.rhs;
              cmdList.timelineUpdate.timelines.push(item);
              break;
            case 'masterId':
              if (!Object.getOwnPropertyDescriptor(cmdList, 'timelineUpdate')) {
                cmdList.timelineUpdate = {};
              }
              cmdList.timelineUpdate.masterId = current.rhs;
              break;
            case 'offsetFromUTC':
              if (!Object.getOwnPropertyDescriptor(cmdList, 'timelineUpdate')) {
                cmdList.timelineUpdate = {};
              }
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
              cmdList.timeSpec = current.rhs;
              break;
            default:
              // case for action
          }
        } else if (current.kind === 'A') {
          // Timeline added or removed
          if (current.item) {
            if (current.item.kind === 'N') {
              // ---------- Timeline added
              // Add action in cmdList
              if (!Object.getOwnPropertyDescriptor(cmdList, 'timelineAdded')) {
                cmdList.timelineAdded = [];
              }
              // Check if the timeline is the good one using its unique id
              if (!isIdPresent(oldTimebar.data.timeLines, current.item.rhs.id)) {
                cmdList.timelineAdded.push(current.item.rhs);
              } else {
                // Find the new one
                // for example in case of adding at the beginning
                const newLength = newTimebar.data.timeLines.length;
                for (let inew = 0; inew < newLength; inew++) {
                  if (!isIdPresent(oldTimebar.data.timeLines, newTimebar.data.timeLines[inew].id)) {
                    // Add command in cmdList
                    cmdList.timelineAdded.push(newTimebar.data.timeLines[inew]);
                    break;
                  }
                }
              }
            } else if (current.item.kind === 'D') {
              // ---------- Timeline removed
              if (!Object.getOwnPropertyDescriptor(cmdList, 'timelineRemoved')) {
                cmdList.timelineRemoved = [];
              }
              // Check if the timeline is the good one using its unique id
              if (isIdPresent(newTimebar.data.timeLines, current.item.lhs.id)) {
                // Find the timeline missing
                const oldLength = oldTimebar.data.timeLines.length;
                for (let iold = 0; iold < oldLength; iold++) {
                  if (!isIdPresent(newTimebar.data.timeLines, oldTimebar.data.timeLines[iold].id)) {
                    // Add command in cmdList
                    cmdList.timelineRemoved.push(oldTimebar.data.timeLines[iold]);
                    break;
                  }
                }
              } else {
                cmdList.timelineRemoved.push(current.item.lhs);
              }
            }
          }
        } else {
          // **** Case for timelines deletion and creation:
          // Nothing to do because event appears also with kind 'A'
          // These are due to the different types of timelines
          // **** Case for action update : nothing to do ?
        }
      }
  }
  return cmdList;
};
