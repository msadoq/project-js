const createTempStore = () => {
  const queue = [];
  return {
    dispatch: action => queue.push(action),
    replaceStore: (store) => {
      queue.forEach(action => store.dispatch(action));
      return store;
    },
  };
};

export default createTempStore;
