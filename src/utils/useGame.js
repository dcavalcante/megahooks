import React, {useState, useEffect} from "react";
import {genDeck} from './';
import audio from '../utils/audio';
import Card from '../components/Card';

function useGame(bg) {

  const [errors, setErrors] = useState(0);
  const [matches, setMatch] = useState([]);
  const [flipping, setFlip] = useState({i:[],v:[]});
  const [deck, setDeck] = useState(genDeck());

  useEffect(() => {
    if (flipping.i.length === 2) {
      checkFlip(flipping);
    }
  }, [flipping]);

  function checkFlip(f) {
    if (f.v[0] === f.v[1]) {
      audio.result('match');
      setMatch([...matches, f.v[0]]);
      setFlip({i:[], v:[]});
    } else {
      setErrors(() => errors + 1);
      setTimeout(() => {
        audio.result('error');
        setFlip({i:[], v:[]});
      }, 1500);
    }
  }

  function reshuffle() {
    audio.result('shuffle');
    setFlip({i:[], v:[]});
    setMatch([]);
    setErrors(0);
    setTimeout(() => setDeck(genDeck()), 600);
  }
  
  function cardClick(value, index) {
    const {i, v} = flipping;
    if (i.length < 2) {
      audio.play('flip');
      setFlip({i:[...i, index],v:[...v, value]});
    }
  }

  const cards = deck.map((value, i) => (
    <Card key={i} bg={bg}
      onClick={() => cardClick(value, i)}
      value={value} 
      matched={matches.includes(value)}
      flipping={flipping.i.includes(i)}
    />
  ));
  
  const finished = matches.length === deck.length / 2;

  return [cards, reshuffle, errors, finished];
}

export default useGame;
