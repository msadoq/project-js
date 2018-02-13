import React from 'react';
import { stub } from 'sinon';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SaveVisualizationToggle from './SaveVisualizationToggle';

describe('SaveVisualizationToggle', () => {
  test('should be displayed as active when a isActive prop', () => {
    expect(renderer.create(
      <SaveVisualizationToggle isActive handleClick={() => {}} />
    )).toMatchSnapshot();
  });
  test('should not be displayed as active when no isActive prop', () => {
    expect(renderer.create(
      <SaveVisualizationToggle handleClick={() => {}} />
    )).toMatchSnapshot();
  });

  test('should call callback method when clicked', () => {
    const handleClick = jest.fn();
    const toggle = shallow(<SaveVisualizationToggle handleClick={handleClick} />);
    expect(handleClick.mock.calls.length).toEqual(0);
    toggle.find('button').simulate('click');
    expect(handleClick.mock.calls.length).toEqual(1);
  });
});
