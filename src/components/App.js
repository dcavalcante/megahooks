import React from 'react';
import Options from './Options';
import Game from './Game';
import Finish from './Finish';
import useOptions from '../utils/useOptions';

function App(props) {
  const [options, game, set, backgrounds] = useOptions();
  
  const component = {
    playing: (
      <Game {...set} {...options} {...game} />
      ),
    finished: (
      <Finish {...set} {...options} {...game} />
    ),
    options: (
      <Options {...options} {...set}>
        {backgrounds}
      </Options>
    )
  }

  return component[game.status];
}

export default App;
