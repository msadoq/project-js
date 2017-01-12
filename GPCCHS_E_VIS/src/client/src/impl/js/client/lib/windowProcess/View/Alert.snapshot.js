import React from 'react';
import R from 'ramda';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
  Alert,
  Danger,
} from './Alert';

describe('Alert', () => {
  it('not closeable', () => {
    const tree = R.pipe(
      shallow,
      toJson
    )(
      <Alert>
        Test
      </Alert>);
    expect(tree).toMatchSnapshot();
  });
  it('not visible', () => {
    const tree = R.pipe(
      shallow,
      toJson
    )(
      <Alert
        visible={false}
        setVisible={v => v}
      >
        Test
      </Alert>);
    expect(tree).toMatchSnapshot();
  });
  it('visible', () => {
    const tree = R.pipe(
      shallow,
      toJson
    )(
      <Alert
        visible
        setVisible={v => v}
      >
        Test
      </Alert>);
    expect(tree).toMatchSnapshot();
  });
  it('click on title', () => {
    let visible = false;

    const getComponent = R.compose(
      shallow,
      () => (<Alert
        visible={visible}
        setVisible={(val) => {
          visible = val;
        }}
      >
        Test
      </Alert>
    ));

    const wrapper = getComponent();
    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.find('Button').simulate('click');
    expect(toJson(getComponent())).toMatchSnapshot();
  });
  it('Danger', () => {
    const tree = R.pipe(
      shallow,
      toJson
    )(
      <Danger>
        Test
      </Danger>);
    expect(tree).toMatchSnapshot();
  });
});
