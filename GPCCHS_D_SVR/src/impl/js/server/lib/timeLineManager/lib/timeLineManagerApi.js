const { timelineColl } = require('../../io/loki');

const addTimeLine = (timeLineJson) => timelineColl
  .insert(JSON.parse(timeLineJson));

const updateTimeLine = (timeLineLokiId, timeLineUpdates) => {
  // On récupère la timeLine avec son lokiId
  const timeLine = timelineColl.get(parseInt(timeLineLokiId, 10));
  const jsonUpdates = JSON.parse(timeLineUpdates);

  // On boucle sur les modifications à apporter
  for (const update of jsonUpdates.updates) {
    const attributeName = jsonUpdates.updates[update].attributeName;
    const attributeValue = jsonUpdates.updates[update].attributeValue;
    // on met à jour la timeLine
    timeLine.timeLine[attributeName] = attributeValue;
  }
  // on stock la timeline
  return timelineColl.update(timeLine);
};

const getTimeLineById = (id) => timelineColl
  .get(id);

const findTimeLineById = (id) => timelineColl
  .find({ 'timeLine.id': parseInt(id, 10) });

const deleteTimeLineByFindId = (id) => timelineColl
  .removeWhere({ 'timeLine.id': parseInt(id, 10) });

const getAllTimeLines = () => timelineColl
  .find();

exports.addTimeLine = addTimeLine;
exports.updateTimeLine = updateTimeLine;
exports.getTimeLineById = getTimeLineById;
exports.findTimeLineById = findTimeLineById;
exports.getAllTimeLines = getAllTimeLines;
exports.deleteTimeLineByFindId = deleteTimeLineByFindId;
