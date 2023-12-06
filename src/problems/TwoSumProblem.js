// src/problems/TwoSumProblem.js

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './TwoSumProblem.css';

const TwoSumProblem = () => {
  const svgRef = useRef();

  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [targetSum, setTargetSum] = useState(11);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');

  const updateArray = (inputArray) => {
    setArray(inputArray);
    setError('');
    setCurrentStep(0);
  };

  const updateTargetSum = (inputTargetSum) => {
    setTargetSum(inputTargetSum);
    setError('');
    setCurrentStep(0);
  };

  const randomizeArray = () => {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < 10) {
      uniqueNumbers.add(Math.floor(Math.random() * 10) + 1);
    }

    const randomArray = Array.from(uniqueNumbers);
    const isValidArray = hasPossibleAnswer(randomArray, targetSum);

    if (!isValidArray) {
      setError('No possible answer for the generated array and target sum.');
    } else {
      setArray(randomArray);
      setError('');
      setCurrentStep(0);
    }
  };

  const hasPossibleAnswer = (nums, target) => {
    const numIndices = new Map();

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (numIndices.has(complement)) {
        return true;
      }
      numIndices.set(nums[i], i);
    }

    return false;
  };

  const generateSteps = (nums, target) => {
    const numIndices = new Map();
    const steps = [];

    let found = false;

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const currentIndices = [i, j];
        const isMatch = nums[i] + nums[j] === target;

        steps.push({
          array: [...nums],
          targetSum: target,
          indices: currentIndices,
          isMatch,
        });

        if (isMatch) {
          found = true;
          break;
        }
      }

      if (found) {
        break;
      }
    }

    return steps;
  };

  const steps = generateSteps(array, targetSum);

  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (!array || !array.length || !targetSum) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const cellSize = 30;
    const transitionDuration = 800;

    const { array: currentArray, indices, isMatch } = steps[currentStep];

    svg
      .selectAll('rect')
      .data(currentArray)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * cellSize)
      .attr('y', 0)
      .attr('width', cellSize)
      .attr('height', cellSize * 1.5)
      .style('fill', (d, i) => {
        if (indices.includes(i)) {
          return isMatch ? 'green' : '#DAA520';
        }
        return 'blue';
      })
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .style('opacity', 0)
      .transition()
      .duration(transitionDuration)
      .attr('y', 0)
      .style('opacity', 1);

    svg
      .selectAll('text')
      .data(currentArray)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * cellSize + cellSize / 2)
      .attr('y', 30)
      .text((d) => d)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '20px')
      .style('opacity', 0)
      .transition()
      .delay(transitionDuration / 2)
      .duration(transitionDuration / 2)
      .style('opacity', 1);
  }, [array, targetSum, currentStep, steps]);

  return (
    <div className="problem-container">
      <h2 className="title">Two Sum Visualization</h2>
      <h5 className="description">Given an array of integers nums and a target, return the two numbers that add up to target.</h5>
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
      <div className="input-container">
        <label htmlFor="targetSumInput">Target Sum:</label>
        <input
          type="number"
          id="targetSumInput"
          placeholder="Enter target sum"
          value={targetSum}
          onChange={(e) => updateTargetSum(Number(e.target.value))}
        />
      </div>
      <button className="generate-button" onClick={randomizeArray}>
        Randomize Array
      </button>

      {error && <p className="error">{error}</p>}

      <div className="visualization">
        <svg ref={svgRef} width={300} height={100}></svg>
      </div>

      <div className="matching-message-container" style={{ marginTop: '-40px' }}>
        {steps[currentStep].isMatch ? (
          <div style={{ color: 'green' }}>Matching!</div>
        ) : (
          <div style={{ color: 'red' }}>Not Matching!</div>
        )}
      </div>

      <div className="step-navigation">
        <button className="step-button" onClick={prevStep} disabled={currentStep === 0}>
          Previous Step
        </button>
        <span className="step-indicator">{`Step ${currentStep + 1} of ${totalSteps}`}</span>
        <button className="step-button" onClick={nextStep} disabled={currentStep === totalSteps - 1}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default TwoSumProblem;
