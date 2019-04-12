import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Header from './Header';
import PropTypes from 'prop-types';

function Options(props) {
  const {children, start, bg} = props;
  return (
    <main className={"app " + bg}>
      <Header />
      <nav>  
        <button onClick={start}>
          <FontAwesomeIcon icon={faPlay} />
          Play
        </button>
        <a className="button" href="https://github.com/dcavalcante/megahooks">
          <FontAwesomeIcon icon={faGithub} />
          Github
        </a>
      </nav>
      
      <ul className="deck options fadein">
        {children}
      </ul>
    </main>
  )
};

Options.propTypes = {
  start: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  bg: PropTypes.string.isRequired,
}

export default Options;