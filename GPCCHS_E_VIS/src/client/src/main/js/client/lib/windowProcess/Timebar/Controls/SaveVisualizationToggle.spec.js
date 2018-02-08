import React from 'react';
import { stub } from 'sinon';
import { shallow } from 'enzyme';
import SaveVisualizationToggle from './SaveVisualizationToggle';

describe('SaveVisualizationToggle', () => {
  test('should be displayed as active when a isActive prop', () => {
    const toggle = shallow(<SaveVisualizationToggle isActive handleClick={() => {}} />);
    const button = toggle.find('button');
    expect(button.props().className).toBe('active');
  });
  test('should not be displayed as active when no isActive prop', () => {
    const toggle = shallow(<SaveVisualizationToggle isActive handleClick={() => {}} />);
    const button = toggle.find('button');
    expect(button.props.className).not.toBe('active');
  });

  test('should call callback method when clicked', () => {
    const handleClick = stub();
    const toggle = shallow(<SaveVisualizationToggle handleClick={handleClick} />);
    expect(handleClick.calledOnce).toBe(false);
    toggle.find('button').simulate('click');
    expect(handleClick.calledOnce).toBe(true);
  });
});
