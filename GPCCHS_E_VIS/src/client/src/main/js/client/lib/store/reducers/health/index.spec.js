import globalConstants from 'common/constants';
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/health';
import healthReducer from '.';

const reducer = freezeArgs(healthReducer);

describe('store:health:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.have.a.property('dcStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    r.should.have.a.property('hssStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    r.should.have.a.property('mainStatus', globalConstants.HEALTH_STATUS_HEALTHY);
    r.should.have.a.property('windowsStatus')
      .that.is.an('object');
    Object.keys(r.windowsStatus).should.have.lengthOf(0);
    r.should.have.a.property('lastPubSubTimestamp', null);
  });
  it('should ignore unknown action', () => {
    const state = {
      dcStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      hssStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      mainStatus: globalConstants.HEALTH_STATUS_HEALTHY,
      lastPubSubTimestamp: 42,
      windowsStatus: { id42: 42 },
    };
    reducer(state, {}).should.equal(state);
  });
  it('should update dc status', () => {
    reducer(undefined, actions.updateDcStatus(globalConstants.HEALTH_STATUS_CRITICAL))
      .should.have.a.property('dcStatus', globalConstants.HEALTH_STATUS_CRITICAL);
  });
  it('should update hss status', () => {
    reducer(undefined, actions.updateHssStatus(globalConstants.HEALTH_STATUS_WARNING))
      .should.have.a.property('hssStatus', globalConstants.HEALTH_STATUS_WARNING);
  });
  it('should update main status', () => {
    reducer(undefined, actions.updateMainStatus(globalConstants.HEALTH_STATUS_HEALTHY))
      .should.have.a.property('mainStatus', globalConstants.HEALTH_STATUS_HEALTHY);
  });
  it('should update last pubsub timestamp', () => {
    reducer(undefined, actions.updateLastPubSubTimestamp(91))
      .should.have.a.property('lastPubSubTimestamp', 91);
  });
  it('should update window status', () => {
    const state = { windowsStatus: { id91: 91 } };
    reducer(state, actions.updateWindowStatus('id42', 42))
      .should.have.properties({
        windowsStatus: { id91: 91, id42: 42 },
      });
  });
});
