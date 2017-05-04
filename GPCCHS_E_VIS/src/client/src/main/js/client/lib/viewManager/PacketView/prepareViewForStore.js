import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'PacketView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Packet View',
  configuration: {
    entryPoints: [],
  },
});

export default _.pipe(
    getDefaultView
);
