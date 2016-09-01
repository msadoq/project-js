class Cache {
  constructor() {
    this.data = [];
  }
  insert (data) {
    this.data.push(data);
  };
};

module.exports = { Cache };
