// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TwoSumProblem from './problems/TwoSumProblem';
import ContainsDuplicateProblem from './problems/ContainsDuplicateProblem'; // Import the new problem component
import './App.css';

const Home = () => (
  <div className="home">
    <h1 className="title">Algorithm Visualizations</h1>
    <ul>
      <li>
        <Link to="/two-sum">Two Sum</Link>
      </li>
      <li>
        <Link to="/contains-duplicate">Contains Duplicate</Link>
      </li>
      {/* Add more problems here */}
    </ul>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/two-sum" element={<TwoSumProblem />} />
      <Route path="/contains-duplicate" element={<ContainsDuplicateProblem />} /> {/* Add the new route */}
      {/* Add more routes for additional problems */}
    </Routes>
  </Router>
);

export default App;
