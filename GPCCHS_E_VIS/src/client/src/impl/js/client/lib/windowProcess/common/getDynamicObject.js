const getCache = () => {
  const cache = {};
  return (obj) => {
    const key = Object.keys(obj).concat(Object.values(obj)).join('-');
    if (!cache[key]) {
      cache[key] = obj;
    }
    return cache[key];
  };
};

export default getCache;
