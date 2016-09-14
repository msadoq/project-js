const database = require('../lib/io/loki');

const collection = database.addCollection('subscriptions');

collection.retrieveByMeta = ({
  catalog,
  parameter,
  type,
  timestamp,
  session,
}) => collection.find({
  $and: [
    { catalog },
    { parameter },
    { type },
    // search for subscription concerned by this parameter timestamp
    { 'visuWindow.lower': { $lte: timestamp } },
    { 'visuWindow.upper': { $gte: timestamp } },
    // TODO : rperrot is session field systematic? (in case of dataSet, recordSet)
    { sessionId: session },
  ],
});

module.exports = collection;
