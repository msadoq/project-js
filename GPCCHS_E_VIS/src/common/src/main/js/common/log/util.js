// Returns a timer function to measure time in ms between to calls
const getTimer = () => {
  let prev;
  let curr;
  return () => {
    curr = +new Date();
    const diff = curr - (prev || curr);
    prev = curr;
    return diff;
  };
};

const rest = (args, nb) => Array.prototype.slice.call(args, nb);

module.exports = {
  getTimer,
  rest,
};
