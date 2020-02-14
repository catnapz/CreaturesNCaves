import React from 'react';
import logo from '../logo.svg';
import Counter from './Counter';
import HealthDisplay from './HealthDisplay';
import './Home.scss'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="full_page_header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World
        </a>
      </header>

      <HealthDisplay />
      <Counter />
    </div>
  );
}

export default App;
