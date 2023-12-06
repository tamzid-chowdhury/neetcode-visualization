// src/TwoSumVisualization.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TwoSumVisualization = ({ array, targetSum }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!array || !array.length || !targetSum) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();

    // D3.js code for Two Sum visualization
    const svg = d3.select(svgRef.current);
    const cellSize = 50;  // Define cellSize here

    const indices = findTwoSum(array, targetSum);

    // Render the array with colors and animations
    svg.selectAll('rect')
      .data(array)
      .enter().append('rect')
      .attr('x', (d, i) => i * cellSize)
      .attr('y', 30)
      .attr('width', cellSize)
      .attr('height', cellSize*2)
      .style('fill', (d, i) => indices.includes(i) ? 'red' : 'blue')
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .transition()
      .duration(500)
      .attr('y', 0);

    // Render the array text
    svg.selectAll('text')
    .data(array)
    .enter().append('text')
    .attr('x', (d, i) => i * cellSize + cellSize / 2)
    .attr('y', 25)
    .text(d => d)
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .style('font-size', '12px')  // Set an initial smaller font size
    .style('opacity', 0)
    .transition()
    .delay(500)
    .duration(500)
    .style('font-size', '20px')  // Grow to the desired font size
    .style('opacity', 1);

  }, [array, targetSum]);

  const findTwoSum = (nums, target) => {
    const numIndices = new Map();

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (numIndices.has(complement)) {
        return [numIndices.get(complement), i];
      }
      numIndices.set(nums[i], i);
    }

    return [];
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <svg ref={svgRef} width={array.length * 30} height={30} />
    </div>
  );
};

export default TwoSumVisualization;
