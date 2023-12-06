// src/problems/ContainsDuplicateProblem.js

import React, { useState, useRef } from 'react';
import * as d3 from 'd3';
import './ContainsDuplicateProblem.css';

const ContainsDuplicateProblem = () => {
  const svgRef = useRef();

  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');

  const updateArray = (inputArray) => {
    setArray(inputArray);
    setError('');
    setCurrentStep(0);
  };

  const containsDuplicate = () => {
    const numSet = new Set();
    let foundDuplicate = false;

    for (let i = 0; i < array.length; i++) {
      const currentNum = array[i];

      // Visualization
      visualizeHashSet(numSet, i);

      if (numSet.has(currentNum)) {
        foundDuplicate = true;
        break;
      }

      numSet.add(currentNum);
    }

    if (foundDuplicate) {
      setError('Duplicate found!');
    } else {
      setError('No duplicates found.');
    }
  };

  const visualizeHashSet = (numSet, currentIndex) => {
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const cellSize = 30;

    // Visualize array
    svg
      .selectAll('rect.array-rect')
      .data(array)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * cellSize)
      .attr('y', 0)
      .attr('width', cellSize)
      .attr('height', cellSize * 1.5)
      .style('fill', (d, i) => (i === currentIndex ? 'red' : 'blue'))
      .style('stroke', 'white')
      .style('stroke-width', 2);

    // Visualize HashSet
    svg
      .selectAll('rect.hashset-rect')
      .data(Array.from(numSet))
      .enter()
      .append('rect')
      .attr('x', (d) => d * cellSize)
      .attr('y', cellSize * 2)
      .attr('width', cellSize)
      .attr('height', cellSize * 1.5)
      .style('fill', 'green')
      .style('stroke', 'white')
      .style('stroke-width', 2);

    // Render text
    svg
      .selectAll('text')
      .data(array)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * cellSize + cellSize / 2)
      .attr('y', 30)
      .text((d) => d)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '20px');

    svg
      .selectAll('text.hashset-text')
      .data(Array.from(numSet))
      .enter()
      .append('text')
      .attr('x', (d) => d * cellSize + cellSize / 2)
      .attr('y', cellSize * 3)
      .text((d) => d)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '20px');
  };

  return (
    <div className="problem-container">
      <h1 className="title">Contains Duplicate Visualization</h1>
      <div className="input-container">
        <label htmlFor="arrayInput">Array:</label>
        <input
          type="text"
          id="arrayInput"
          placeholder="Enter array, e.g., 1, 2, 3"
          value={array.join(', ')}
          onChange={(e) => updateArray(e.target.value.split(',').map(Number))}
        />
      </div>
      <button className="check-duplicate-button" onClick={containsDuplicate}>
        Check for Duplicate
      </button>

      {error && <p className="error">{error}</p>}

      <div className="visualization">
        <svg ref={svgRef} width={300} height={150}></svg>
      </div>
    </div>
  );
};

export default ContainsDuplicateProblem;

