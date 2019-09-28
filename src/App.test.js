import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Loan from './Loan/Loan';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loan />, div);
  ReactDOM.unmountComponentAtNode(div);
});
