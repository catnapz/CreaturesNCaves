import * as React from 'react';
import { connect } from 'react-redux';
import HealthDisplay from './HealthDisplay';

const Home = () => (
  <div>
    <div>
      <HealthDisplay />
    </div>
    <h1>Welcome to Creatures &amp; Caves</h1>
  </div>
);

export default connect()(Home);
