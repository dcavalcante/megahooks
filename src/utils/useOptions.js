import React, {useState} from 'react';
import Card from '../components/Card';
import sources from '../utils/sources';
import audio from '../utils/audio';

function useOptions(status='options') {
  const [options, setOptions] = useState({bg:sources.bg[0]});
  const [game, setGame] = useState({status}); 

  function cardClick(i) {
    setOptions({...options, bg:sources.bg[i]});
    audio.result('drop');
  }

  const backgrounds = sources.bg.map((bg, i) => (
    <Card key={i} bg={bg}
      onClick={() => cardClick(i)} 
      selected={sources.bg[i] === options.bg}
    />
  ));

  const set = {
    start: () => {
      audio.result('shuffle');
      setGame({status: 'playing'});
    },
    stop: () => {
      audio.result('drop');
      setGame({status:'options'});
    },
    finish: errors => {
      audio.play('cheer');
      setGame({status: 'finished', errors});
    }
  }

  return [options, game, set, backgrounds];
}

export default useOptions;