import React from 'react';
// import renderer from 'react-test-renderer';
import _ from 'lodash/fp';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MonitoringStateColors } from './EntryPointMonitoringStateColors';

describe('EntryPointMonitoringStateColors', () => {
  it('not visible', () => {
    const tree = _.compose(
      toJson,
      shallow)(<MonitoringStateColors
        visible={false}
        setVisible={v => v}
      />);
    expect(tree).toMatchSnapshot();
  });
  it('visible', () => {
    const tree = _.compose(
      toJson,
      shallow)(<MonitoringStateColors
        visible
        setVisible={v => v}
      />);
    expect(tree).toMatchSnapshot();
  });
  it('click on title', () => {
    let visible = false;

    const getComponent = _.compose(
      shallow,
      () => (<MonitoringStateColors
        visible={visible}
        setVisible={(val) => {
          visible = val;
        }}
      />)
    );

    const wrapper = getComponent();
    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.find('h4 a').simulate('click');
    expect(toJson(getComponent())).toMatchSnapshot();
  });
});
