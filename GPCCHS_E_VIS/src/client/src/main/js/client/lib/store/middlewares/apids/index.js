/* eslint-disable no-unused-vars */
import _ from 'lodash';
import { getTupleId, REQUESTING } from 'store/reducers/catalogs';
import { WS_APIDS_ASK } from 'store/types';
import { addApids } from 'store/actions/apids';
import { dc } from '../../../serverProcess/ipc';

const MAIN_FUNCTION_NAME = 'GENE_TF_LCCSDSAPID_CALIBRATOR';

// @todo uncomment when adelamar querry is finalized
// const asyncApidsFetcher = (sessionId, domainId, cb) =>
//   dc.retrieveApids({ sessionId, domainId }, cb);

const asyncApidsFetcher = (sessionId, domainId, cb) => (
  setTimeout(
    () => {
      cb(
        {
          functions: [
            {
              FunctionName: 'GENE_TF_LCCSDSAPID_CALIBRATOR',
              ApplicationProcess: [
                {
                  apidRawValue: '0',
                  apidName: 'TIMEPACKET',
                },
                {
                  apidRawValue: '1',
                  apidName: 'ATTITUDE',
                },
                {
                  apidRawValue: '2',
                  apidName: 'ORBIT',
                },
                {
                  apidRawValue: '3',
                  apidName: 'POWERMGT',
                },
                {
                  apidRawValue: '4',
                  apidName: 'SATELLITE',
                },
                {
                  apidRawValue: '5',
                  apidName: 'MISSION',
                },
                {
                  apidRawValue: '6',
                  apidName: 'FILEMGT',
                },
                {
                  apidRawValue: '7',
                  apidName: 'TELEMETRYMGT',
                },
                {
                  apidRawValue: '8',
                  apidName: 'OBCPENGINE1',
                },
                {
                  apidRawValue: '9',
                  apidName: 'OBCPENGINE2',
                },
                {
                  apidRawValue: '10',
                  apidName: 'TCFILEMGT',
                },
                {
                  apidRawValue: '2047',
                  apidName: 'IDLEPACKET',
                },
              ],
            },
          ],
        }
      );
    }, 1000
  )
);

/**
 * @param state
 * @param sessionId
 * @param domainId
 * @returns boolean
 */
export const areApidsLoaded = (state, { sessionId, domainId }) =>
  state.apids &&
  Object.keys(state.apids).includes(getTupleId(domainId, sessionId)) &&
  state.apids[getTupleId(domainId, sessionId)] !== REQUESTING
;

const apidsMiddleware = ({ dispatch, getState }) => next => (action) => {
  const state = getState();

  if (action.type === WS_APIDS_ASK) {
    const { sessionId, domainId } = action.payload;

    if (areApidsLoaded(state, { sessionId, domainId })) {
      return next(action);
    }

    asyncApidsFetcher(
      sessionId,
      domainId,
      (results) => {
        const functions = _.get(results, 'functions', []);
        const interpretationFunction = _.find(functions, ['FunctionName', MAIN_FUNCTION_NAME]);
        const apids = _.get(interpretationFunction, 'ApplicationProcess', []);
        dispatch(
          addApids(
            getTupleId(domainId, sessionId),
            apids
          )
        );
      }
    );
  }

  return next(action);
};

export default apidsMiddleware;
