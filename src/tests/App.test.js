import React from 'react';
import App from '../components/App';
import {shallow} from 'enzyme';

test('Render without crashing', () => {
  shallow(<App />)
});
