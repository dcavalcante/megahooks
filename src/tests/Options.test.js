import React from 'react';
import Options from '../components/Options';
import useOptions from '../utils/useOptions';
import sources from '../utils/sources';
import {mount} from 'enzyme';

function OptComponent() {
	const [options, game, set, backgrounds] = useOptions();
	return (
		<Options {...options} {...set} {...game}>
      {backgrounds}
    </Options>
	);
}

test('Change each option', () => {
	let wrapper = mount(<OptComponent />);
	wrapper.find('.deck Card').forEach((card, index) => {
		card.simulate('click');
		expect(wrapper.find(Options).prop('bg')).toBe(sources.bg[index]);
	});
});

test('Start the game', () => {
	let wrapper = mount(<OptComponent />);
	wrapper.find('nav button').first().simulate('click');
	expect(wrapper.find(Options).prop('status')).toBe("playing");
});
