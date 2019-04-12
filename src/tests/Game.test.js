import React from 'react';
import Game from '../components/Game';
import useOptions from '../utils/useOptions';
import {mount} from 'enzyme';
import { act } from 'react-dom/test-utils';

function GameComponent() {
	const [options, game, set, backgrounds] = useOptions('playing');
	// const [options, game, set, ...] = useOptions('playing');
	return (<Game {...set} {...options} {...game} />
	);
}

function parseCards(cards) {
  return cards.map((card,i) => {
    const {value, matched, flipping} = card.props()
    return {i, value, matched, flipping}
  });
}

function solveCards(cards) {
  let solved = {};
  cards.forEach((card, i) => {
    const {value} = card.props();
    solved[value] = solved[value] ? 
      [...solved[value], i] 
			: [i];    
  });
  return solved;
}

function clickSolved(solved, cards) {
	for (let pair in solved) {
    solved[pair].forEach(index => {
      act(() => {cards.at(index).simulate('click')})
    });
	}
}

jest.useFakeTimers();

describe('Flip', () => {
  const wrapper = mount(<GameComponent />);
  let cards = wrapper.find('.deck Card');
  const solved = solveCards(cards);
  // let p = parseCards(wrapper.find('.deck Card'));
  expect(wrapper.find(Game).prop('status')).toBe('playing');

  test('Flip a card', () => {
    let card = wrapper.find('Card').at(solved.a[0]);
    act(() => {
      card.simulate('click');
    });
    card.update();
    card = wrapper.find('Card').at(solved.a[0]);
    expect(card.prop('flipping')).toBeTruthy();
    
  });
  test('Flipped card does nothing', () => {
    let card = wrapper.find('Card').at(solved.a[0]);
    expect(card.prop('flipping')).toBeTruthy();
    act(() => {
      card.simulate('click');
    });
    card.update();
    card = wrapper.find('Card').at(solved.a[0]);
    expect(card.prop('flipping')).toBeTruthy();
  })

  test('Make a mistake', () => {
    let card = wrapper.find('Card').at(solved.e[0]);
    act(() => {
      card.simulate('click');
    });
    card.update();
    card = wrapper.find('Card').at(solved.e[0]);
    expect(card.prop('flipping')).toBeTruthy();
  });
  test('Cannot flip immediately after mistake', () => {
    let card = wrapper.find('Card').at(solved.a[0]);
    expect(card.prop('flipping')).toBeTruthy();
    card = wrapper.find('Card').at(solved.e[0]);
    expect(card.prop('flipping')).toBeTruthy();
    card = wrapper.find('Card').at(solved.i[0]);
    act(() => {
      card.simulate('click');
    });
    card.update();
    card = wrapper.find('Card').at(solved.i[0]);
    expect(card.prop('flipping')).toBeFalsy();

  });
  test('Can flip after timeout', () => {
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function), 1500
    );    
    act(() => {
      jest.advanceTimersByTime(1500);
    })

    let card = wrapper.find('Card').at(solved.i[0]);
    act(() => {
      card.simulate('click');
    });
    card.update();
    card = wrapper.find('Card').at(solved.i[0]);
    expect(card.prop('flipping')).toBeTruthy();
  });

  test('Make a match', () => {
    let card = wrapper.find('Card').at(solved.i[0]);
    act(() => {
      card.simulate('click');
    });
    card = wrapper.find('Card').at(solved.i[1]);
    act(() => {
      card.simulate('click');
    });
    card.update();
    card = wrapper.find('Card').at(solved.i[0]);
    expect(card.prop('flipping')).toBeFalsy();
    expect(card.prop('matched')).toBeTruthy();
    card = wrapper.find('Card').at(solved.i[1]);
    expect(card.prop('flipping')).toBeFalsy();
    expect(card.prop('matched')).toBeTruthy();


  });
  test('Matched card does nothing', () => {
    let card = wrapper.find('Card').at(solved.i[0]);
    expect(card.prop('matched')).toBeTruthy();
    act(() => {
      card.simulate('click');
    });
    card.update();
    card = wrapper.find('Card').at(solved.i[0]);
    expect(card.prop('flipping')).toBeFalsy();
  });
  
});

describe('Solve', () => {
  test('Flawless victory', () => {
    let wrapper = mount(<GameComponent />);  
    const cards = wrapper.find('.deck Card');
    let p = parseCards(wrapper.find('.deck Card'));
    expect(wrapper.find(Game).prop('status')).toBe('playing');
    const solved = solveCards(cards);
    clickSolved(solved, cards);
    wrapper.update();
  
    // p = parseCards(wrapper.find('.deck Card'));
    let {status, errors} = wrapper.find(Game).props();
    expect(status).toBe('finished');
    expect(errors).toBe(0);
  });

  

  test('A single mistake', () => {
    let wrapper = mount(<GameComponent />);  
    const cards = wrapper.find('.deck Card');
    const solved = solveCards(cards);

    let card = wrapper.find('Card').at(solved.a[0]);
    act(() => {
      card.simulate('click');
    });
    card = wrapper.find('Card').at(solved.e[1]);
    act(() => {
      card.simulate('click');
    });

    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function), 1500
    );    
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    clickSolved(solved, cards);
    wrapper.update();

    let {status, errors} = wrapper.find(Game).props();
    expect(status).toBe('finished');
    expect(errors).toBe(1);
    
  });
});

describe('Click nav buttons', () => {
  let wrapper = mount(<GameComponent />);  
  const cards = wrapper.find('.deck Card');
  let p = parseCards(wrapper.find('.deck Card'));
  expect(wrapper.find(Game).prop('status')).toBe('playing');
  const solved = solveCards(cards);
  const buttons = wrapper.find('nav button');

  test('Restart', () => {
    let card = wrapper.find('Card').at(solved.a[0]);
    act(() => {card.simulate('click');});
    card = wrapper.find('Card').at(solved.e[0]);
    act(() => {card.simulate('click');});
    act(() => {jest.advanceTimersByTime(1500);});
    let errors = wrapper.find('.errors strong').text();
    expect(errors).toBe('1');

    card = wrapper.find('Card').at(solved.i[0]);
    act(() => {card.simulate('click');});
    card = wrapper.find('Card').at(solved.i[1]);
    act(() => {card.simulate('click');});
    card = wrapper.find('Card').at(solved.o[1]);
    act(() => {card.simulate('click');});
    p = parseCards(wrapper.find('.deck Card'));
    let r = p.reduce((result, current) => { 
      return result.flipping || current.flipping 
        || result.matched || current.matched 
        || result;
    }, false)
    expect(r).toBeTruthy();
    act(() => {
      buttons.filterWhere(b => b.text() === 'Reshuffle')
        .simulate('click');
    })
    expect(wrapper.find(Game).prop('status')).toBe('playing');
    card.update();
    p = parseCards(wrapper.find('.deck Card'));
    r = p.reduce((result, current) => { 
      return result.flipping || current.flipping 
        || result.matched || current.matched 
        || result;
    }, false)
    expect(r).toBeFalsy();
    errors = wrapper.find('.errors strong').text();
    expect(errors).toBe('0');
    
  });
  test('Back', () => {
    buttons.filterWhere(b => b.text() === 'Back')
      .simulate('click');
      expect(wrapper.find(Game).prop('status')).toBe('options');

  });
})
