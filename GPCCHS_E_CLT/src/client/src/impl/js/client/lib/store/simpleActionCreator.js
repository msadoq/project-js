export default function simpleActionCreator(type, ...argNames) {
  if (!type || typeof type !== 'string') {
    throw new Error('simpleActionCreator require a valid type as first parameter');
  }
  return (...args) => {
    const action = {
      type,
      payload: {},
    };
    argNames.forEach((arg, index) => {
      action.payload[argNames[index]] = args[index];
    });
    return action;
  };
}
