import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSlidersH, 
  faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import audio from '../utils/audio';
import Header from './Header';
import PropTypes from 'prop-types';

function Finish(props) {
  useEffect(() => {
    audio.play('cheer');
  }, [])
  
  const {bg, errors, stop, start} = props;
  const time = errors > 1 ? 'times' : 'time';

  return (
    <div className={"finish " + bg}>
      
      <div className="content">
        <Header />
        <h3>Congrats! <span aria-label="clap" role="img">👏👏👏</span></h3>
        <p>You only missed <strong>{errors}</strong> {time}!</p>
        <nav>  
          <button onClick={start}>
            <FontAwesomeIcon icon={faRedo} />
            Restart
          </button>
          <button onClick={stop}>
            <FontAwesomeIcon icon={faSlidersH} />
            Options
          </button>
          <a className="button" href="https://github.com/dcavalcante/megahooks">
            <FontAwesomeIcon icon={faGithub} />
            Github
          </a>
        </nav>
      </div>
    </div>
  )
}

Finish.propTypes = {
  bg: PropTypes.string.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired,
  errors: PropTypes.number,
}

export default Finish;