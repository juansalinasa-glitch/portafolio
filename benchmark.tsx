import React from 'react';
import { renderToString } from 'react-dom/server';
import { AlgorithmLab } from './src/components/AlgorithmLab.js';

const start = performance.now();
for (let i = 0; i < 50000; i++) {
  renderToString(<AlgorithmLab />);
}
const end = performance.now();

console.log(`Render time: ${end - start} ms`);
