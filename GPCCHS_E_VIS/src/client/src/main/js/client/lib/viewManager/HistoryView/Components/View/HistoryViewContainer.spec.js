import React from 'react';

import { mockStore, freezeMe } from 'common/jest';

import { shallow } from 'enzyme';
import HistoryViewContainer from './HistoryViewContainer';
import { openEditor } from '../../../../store/actions/pages';
import mockInitialState from './mockInitialState';
import mockStateWithData from './mockStateWithData';

const initialState = freezeMe(mockInitialState);

const _createContainerWrapper = (store, props) => shallow(
  <HistoryViewContainer {...props} />,
  {
    context: {
      store,
    },
  }
);

describe('HistoryView :: render', () => {
  const store = mockStore(initialState);

  const viewId = '5ab8717a-57e1-4027-a3b5-34aa76ea2c09';
  const props = {
    viewId,
    openEditor,
  };

  test('renders empty data set correctly', () => {
    const wrapper = _createContainerWrapper(store, props);
    expect(wrapper.dive()).toMatchSnapshot();
  });


  test('renders correctly received data with one configured entry point', () => {
    const updatedStore = mockStore(mockStateWithData);
    const wrapper = _createContainerWrapper(updatedStore, props);
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
