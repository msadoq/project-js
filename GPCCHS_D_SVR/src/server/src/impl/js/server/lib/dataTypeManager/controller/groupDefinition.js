const JS = require('../protoFile/groupDefinition.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const GroupDefinition = JS.GroupDefinition;

exports.binToJson = (payload) => {
  const decoded = GroupDefinition.decode(payload);
  const groupDefinition = {
    name: decoded.name.value,    description: decoded.description.value,    objectType: decoded.objectType.value,    domain: decoded.domain.value,    instanceIds: decoded.instanceIds.value
  };
  return groupDefinition;
};
