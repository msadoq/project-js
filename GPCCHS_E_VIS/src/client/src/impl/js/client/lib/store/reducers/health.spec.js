import globalConstants from 'common/constants';
import { freezeMe } from '../../common/test';
import * as actions from '../actions/health';
import reducer from './health';

describe('store:health:reducer', () => {
  it('should returns initial state', () => {
    const r = reducer(undefined, {});
    r.should.have.a.property('dcStatus', null);
    r.should.have.a.property('hssStatus', null);
    r.should.have.a.property('lastPubSubTimestamp', null);
  });
  it('should ignore unknown action', () => {
    const state = freezeMe({
      dcStatus: globalConstants.DC_STATUS_HEALTHY,
      hssStatus: true,
      lastPubSubTimestamp: 42,
    });
    reducer(state, {}).should.equal(state);
  });
  it('should update dc status', () => {
    const state = reducer(
      freezeMe({
        dcStatus: globalConstants.DC_STATUS_HEALTHY,
        hssStatus: true,
        lastPubSubTimestamp: 42,
      }),
      actions.updateDcStatus(globalConstants.DC_STATUS_CONGESTION)
    );
    state.should.have.a.property('lastPubSubTimestamp', 42);
    state.should.have.a.property('dcStatus', globalConstants.DC_STATUS_CONGESTION);
    state.should.have.a.property('hssStatus', true);
  });
  it('should update hss status', () => {
    const state = reducer(
      freezeMe({
        dcStatus: globalConstants.DC_STATUS_HEALTHY,
        hssStatus: true,
        lastPubSubTimestamp: 42,
      }),
      actions.updateHssStatus(false)
    );
    state.should.have.a.property('lastPubSubTimestamp', 42);
    state.should.have.a.property('dcStatus', globalConstants.DC_STATUS_HEALTHY);
    state.should.have.a.property('hssStatus', false);
  });
  it('should update last pubsub timestamp', () => {
    const state = reducer(
      freezeMe({
        dcStatus: globalConstants.DC_STATUS_HEALTHY,
        hssStatus: true,
        lastPubSubTimestamp: 42,
      }),
      actions.updateLastPubSubTimestamp(91)
    );
    state.should.have.a.property('lastPubSubTimestamp', 91);
    state.should.have.a.property('dcStatus', globalConstants.DC_STATUS_HEALTHY);
    state.should.have.a.property('hssStatus', true);
  });
});
