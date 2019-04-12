import React from 'react';
import Finish from '../components/Finish';
import useOptions from '../utils/useOptions';
import {shallow, mount} from 'enzyme';

function FinishComponent() {
  // let [options, game, set, ...] = useOptions('finished');
  let [options, game, set, backgrounds] = useOptions('finished');
  return (<Finish {...set} {...options} {...game} />
	);
}

it('Renders without crashing', () => {
	shallow(<FinishComponent />);
});

it('Restart game', () => {
  let wrapper = mount(<FinishComponent />);  
  expect(wrapper.find(Finish).prop('status')).toBe('finished');  
  const buttons = wrapper.find('nav button');
  buttons.filterWhere(b => b.text() === 'Restart')
    .simulate('click');
  expect(wrapper.find(Finish).prop('status')).toBe('playing');
});

it('Return to options', () => {
  let wrapper = mount(<FinishComponent />);  
  expect(wrapper.find(Finish).prop('status')).toBe('finished');  
  const buttons = wrapper.find('nav button');
  buttons.filterWhere(b => b.text() === 'Options')
    .simulate('click');
  expect(wrapper.find(Finish).prop('status')).toBe('options');
});