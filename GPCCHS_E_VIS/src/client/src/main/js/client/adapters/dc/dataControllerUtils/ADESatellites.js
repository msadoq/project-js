const ADESatellite = require('./ADESatellite');

module.exports = {
  encode: data => ({
    satellites:  _map(data.satellites, p => ADESatellite.encode(p)),
  }),
  decode: data => ({
    satellites:  _map(data.satellites, p => ADESatellite.decode(p)),
  }),
};