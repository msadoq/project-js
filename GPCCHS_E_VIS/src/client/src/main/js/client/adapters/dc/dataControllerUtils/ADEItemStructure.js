const encode = data => ({
  itemName: data.itemName,
  unit: data.unit,
  children : ((!data.children || data.children === null) ? undefined : data.children.map(child => encode(child))),
});

const decode = data => ({
  itemName: data.itemName,
  unit: data.unit,
  children : ((!data.children || data.children === null || data.children.length === 0 ) ? undefined : data.children.map(child => decode(child))),
});

module.exports = {
  encode,
  decode,
};
