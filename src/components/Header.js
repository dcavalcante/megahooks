import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faAtom } from '@fortawesome/free-solid-svg-icons'

function Header(props) {
  return (
    <h1>
      <FontAwesomeIcon 
        icon={faBrain} 
        className="brain"  
      />
      MeGa Hooks
      <FontAwesomeIcon 
        icon={faAtom} 
        className="atom" 
      />
    </h1>
  )
}

export default Header;