'use client';
import React, { useState, useRef } from 'react';
import Plot from 'react-plotly.js';
import { Button, TextField, Container, Paper } from '@mui/material';

const Home: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const graphRef = useRef<any>(null); 

  const plotFunction = (xRange: [number, number]) => {
    try {
      const xValues = [];
      const yValues = [];

      const processedExpression = expression
        .replace(/\bsin\b/g, 'Math.sin')
        .replace(/\bcos\b/g, 'Math.cos')
        .replace(/\btan\b/g, 'Math.tan')
        .replace(/\blog\b/g, 'Math.log')
        .replace(/\bexp\b/g, 'Math.exp')
        .replace(/\^/g, '**');

      const func = new Function('x', `return ${processedExpression}`);

      for (let x = xRange[0]; x <= xRange[1]; x += 0.1) {
        xValues.push(x);
        yValues.push(func(x));
      }

      const plotData = [
        {
          type: 'scatter',
          mode: 'lines',
          x: xValues,
          y: yValues,
        },
      ];

      setData(plotData);
    } catch (error) {
      console.error('Invalid expression:', error);
      setData([]);
    }
  };

  const handleRelayout = (eventData: any) => {
    const xRange: [number, number] = [
      eventData['xaxis.range[0]'],
      eventData['xaxis.range[1]']
    ];

    alert(
      'ZOOM!' + '\n\n' +
      'Event data:' + '\n' +
      JSON.stringify(eventData) + '\n\n' +
      'x-axis start:' + xRange[0] + '\n' +
      'x-axis end:' + xRange[1]
    );

    plotFunction(xRange);
  };

  return (
    <Container maxWidth="md" style={{ backgroundColor: 'rgb(243, 244, 246)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Function Image Plotter</h1>
        <TextField
          label="Input function expression"
          variant="outlined"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" onClick={() => plotFunction([-10, 10])} style={{ backgroundColor: '#6366f1', color: '#fff' }}>
          Draw an image
        </Button>
      </Paper>

      <Plot
        ref={graphRef}
        data={data}
        layout={{
          width: 800,
          height: 400,
          title: 'Function image',
          xaxis: { title: 'X-axis' },
          yaxis: { title: 'Y-axis' },
          paper_bgcolor: 'rgb(243, 244, 246)',
        }}
        onRelayout={handleRelayout} 
      />
    </Container>
  );
};

export default Home;