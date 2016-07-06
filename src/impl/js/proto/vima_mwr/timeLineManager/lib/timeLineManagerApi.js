var loki = require('lokijs');
var timeLinedb = new loki('timeLine.json');

var timeLines = timeLinedb.addCollection('timeLines');

var addTimeLine = function(timeLineJson) {
    return timeLines.insert(JSON.parse(timeLineJson));
}

var updateTimeLine = function(timeLineLokiId, timeLineUpdates) {
    // On récupère la timeLine avec son lokiId
    var timeLine = timeLines.get(parseInt(timeLineLokiId));
    var jsonUpdates = JSON.parse(timeLineUpdates);
    var attributeName;
    var attributeValue;
    
    //on boucle sur les modifications à apporter
    for (var update in jsonUpdates.updates) {
        attributeName = jsonUpdates.updates[update].attributeName;
        attributeValue = jsonUpdates.updates[update].attributeValue;
        // on met à jour la timeLine
        timeLine.timeLine[attributeName] = attributeValue;
    }
    // on stock la timeline
    return timeLines.update(timeLine);
}

var getTimeLineById = function(id) {
    return timeLines.get(id);
}

var findTimeLineById = function(id) {
    return timeLines.find({'timeLine.id' : parseInt(id)});
}

var deleteTimeLineByFindId = function(id) {
    return timeLines.removeWhere({'timeLine.id' : parseInt(id)});
}

var getAllTimeLines = function() {
    return timeLines.find();
}

exports.addTimeLine = addTimeLine;
exports.updateTimeLine = updateTimeLine;
exports.getTimeLineById = getTimeLineById;
exports.findTimeLineById = findTimeLineById;
exports.getAllTimeLines = getAllTimeLines;
exports.deleteTimeLineByFindId = deleteTimeLineByFindId;
