/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './viewActions';
import reducer, { getView, getConnectedData } from './viewReducer';

describe('store:views', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.be.an('object').that.is.empty;
    });
    it('unknown action', () => {
      reducer({ myViewId: { title: 'Title' } }, {})
        .should.eql({ myViewId: { title: 'Title' } });
    });
    describe('add', () => {
      it('add', () => {
        const state = reducer(
          undefined,
          actions.add('myViewId', 'plot', { setting: 'value' })
        );
        state.myViewId.should.eql({
          title: 'Unknown',
          type: 'plot',
          configuration: { setting: 'value' },
        });
      });
      it('add empty', () => {
        const state = reducer(
          undefined,
          actions.add('myViewId')
        );
        state.myViewId.should.eql({
          title: 'Unknown',
          type: null,
          configuration: {},
        });
      });
    });
    describe('remove', () => {
      it('remove', () => {
        const state = reducer(
          { myViewId: { title: 'Title' } },
          actions.remove('myViewId')
        );
        state.should.not.have.property('myViewId');
      });
      it('remove unknown', () => {
        const state = reducer(
          { myViewId: { title: 'Title' } },
          actions.remove('foo')
        );
        state.should.have.property('myViewId');
      });
    });
    // describe('un/mount connected data', () => {
    //   it('mount', () => {
    //     let state = reducer(
    //       { myViewId: { connectedData: [] } },
    //       actions.mountConnectedData('myViewId', 'myconnectedDataId')
    //     );
    //     state.myViewId.connectedData.should.eql(['myconnectedDataId']);
    //     state = reducer(
    //       state,
    //       actions.mountConnectedData('myViewId', 'another')
    //     );
    //     state.myViewId.connectedData.should.eql(['myconnectedDataId', 'another']);
    //   });
    //   it('unmount', () => {
    //     let state = reducer(
    //       { myViewId: { connectedData: ['myViewId', 'another'] } },
    //       actions.unmountConnectedData('myViewId', 'myViewId')
    //     );
    //     state.myViewId.connectedData.should.eql(['another']);
    //     state = reducer(
    //       state,
    //       actions.unmountConnectedData('myViewId', 'another')
    //     );
    //     state.myViewId.connectedData.should.eql([]);
    //   });
    // });
  //   describe('addAndMount/unmountAndRemove', () => {
  //     const { dispatch, getState } = getStore({ views: { myViewId: { connectedData: ['ep1'] } } });
  //     let newconnectedDataId;
  //     it('addAndMount', () => {
  //       dispatch(actions.addAndMount('myViewId'));
  //       getState().views.myViewId.connectedData.should.be.an('array').with.lengthOf(2);
  //       newconnectedDataId = getState().views.myViewId.connectedData[1];
  //       getState().connectedData[newconnectedDataId].should.be.an('object');
  //     });
  //     it('unmountAndRemove', () => {
  //       dispatch(actions.unmountAndRemove('myViewId', newconnectedDataId));
  //       getState().views.myViewId.connectedData.should.be.an('array').with.lengthOf(1);
  //       should.not.exist(getState().connectedData[newconnectedDataId]);
  //     });
  //   });
  });
  describe('selectors', () => {
    it('getView', () => {
      const { getState } = getStore({
        views: {
          myViewId: { title: 'Title 1' },
        },
      });
      getView(getState(), 'myViewId').should.have.property('title', 'Title 1');
      should.not.exist(getView(getState(), 'unknownId'));
    });
    it('getConnectedData', () => {
      const { getState } = getStore({
        views: {
          myViewId: { type: 'PlotView', configuration: { plotViewEntryPoints: [
            { connectedDataX: { uuid: 'ep1' }, connectedDataY: { uuid: 'ep2' } },
          ] } },
          myOtherId: { type: 'TextView', configuration: { textViewEntryPoints: [
            { connectedData: { uuid: 'ep3' } },
            { connectedData: { uuid: 'ep4' } },
          ] } },
        },
        connectedData: { ep1: {}, ep2: {}, ep3: {} },
      });
      getConnectedData(getState(), 'myViewId').should.eql([
        { connectedDataId: 'ep1' },
        { connectedDataId: 'ep2' },
      ]);
      getConnectedData(getState(), 'myOtherId').should.eql([
        { connectedDataId: 'ep3' },
      ]);
    });
  });
});
