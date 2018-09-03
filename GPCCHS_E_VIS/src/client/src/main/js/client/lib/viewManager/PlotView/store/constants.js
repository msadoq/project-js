import _ from 'lodash/fp';

export function addConstant(stateConf, action) {
  const { constant } = action.payload;
  if (!constant || !constant.label) {
    return stateConf;
  }
  const constantId = constant.id || getUniqueConstantId(stateConf, constant.label);
  return _.set(`constants[${constantId}]`, { ...constant, id: constantId }, stateConf);
}

export function updateConstant(stateConf, action) {
  const { constant, constantId } = action.payload;
  if (!constant || !constantId) {
    return stateConf;
  }
  return _.set(`constants[${constantId}]`, { ...constant, id: constantId }, stateConf);
}

export function removeConstant(stateConf, action) {
  const { constantId } = action.payload;
  if (!constantId) {
    return stateConf;
  }
  return _.update('constants', constants => _.omit(constantId, constants), stateConf);
}

function getUniqueConstantId(stateConf, label) {
  const id = _.snakeCase(_.trim(_.deburr(label)));
  // check id isn't already defined
  let isUnique = false;
  let index = 1;
  let finalId = id;
  const { constants } = stateConf;
  while (!isUnique) {
    if (!constants[finalId]) {
      isUnique = true;
    } else {
      finalId = id.concat('_', index);
      index += 1;
    }
  }
  return finalId;
}
