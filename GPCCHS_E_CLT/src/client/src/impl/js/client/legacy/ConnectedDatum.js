// import React, { Component, PropTypes } from 'react';
// import _ from 'lodash';
// import debug from '../../utils/windowDebug';
// import { getWebsocket } from '../../websocket/windowWebsocket';
// import queries from '../../connectedData/queries';
//
// const logger = debug('connectedDatum');
//
// export default class ConnectedData extends Component {
//   static propTypes = {
//     viewId: PropTypes.string,
//     interval: PropTypes.object.isRequired,
//     connectedDatum: PropTypes.object.isRequired,
//   };
//   componentDidMount() {
//     const { viewId, connectedDatum, interval } = this.props;
//     const q = queries(viewId, connectedDatum, null, interval);
//     this.sendQueries(q);
//   }
//   componentWillReceiveProps(nextProps) {
//     const { viewId, connectedDatum, interval } = this.props;
//     const q = queries(viewId, connectedDatum, nextProps.interval, interval);
//     this.sendQueries(q);
//   }
//   render() {
//     const interval =
//       `${this.props.interval.lower}<${this.props.interval.current}<${this.props.interval.upper}`;
//
//     return <div>{`${this.props.connectedDatum.localId} // ${interval}`}</div>;
//   }
//   sendQueries(queriesToProceed) {
//     if (!queriesToProceed.length) {
//       return;
//     }
//
//     _.each(queriesToProceed, (payload) => {
//       logger.debug('viewQuery', payload.localId, payload.interval);
//       getWebsocket().write({ event: 'viewQuery', payload });
//     });
//   }
// }
