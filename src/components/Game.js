import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft, faRandom } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import useGame from '../utils/useGame';
import PropTypes from 'prop-types';

function Game(props) {
  const {bg, stop, finish} = props;
  const [cards, reshuffle, errors, finished] = useGame(bg);

  useEffect(() => {
    if (finished) finish(errors);
  }, [finished]);

  return (
    <main className={"game " + bg}>
      <Header />
      <nav>
        <button onClick={stop}>
          <FontAwesomeIcon icon={faHandPointLeft} />
          Back
        </button>
        <span className="errors">
          Errors: <strong>{errors}</strong>
        </span>
        <button onClick={reshuffle}>
          <FontAwesomeIcon icon={faRandom} />
          Reshuffle
        </button>
      </nav>
      <div className="deck fadein">
        {cards}
      </div>
      {/* <button onClick={() => finish(errors)}>Finish</button> */}
    </main>
  )
}

Game.propTypes = {
  bg: PropTypes.string.isRequired,
  stop: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired,
}

export default Game;