/* Here is some react utils */

const getWrappedInstance = i => (i.getWrappedInstance ? i.getWrappedInstance() : i);

export default {
  getWrappedInstance,
};
