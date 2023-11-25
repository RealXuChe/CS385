"use client";
import React, { useState } from "react";
import Plot from "react-plotly.js";

const App: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  const plotFunction = () => {
    try {
      const xValues = [];
      const yValues = [];

      for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(eval(expression));
      }

      const plotData = [
        {
          type: "scatter",
          mode: "lines",
          x: xValues,
          y: yValues,
        },
      ];

      setData(plotData);
    } catch (error) {
      console.error("Invalid expression:", error);
      setData([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Function Image Plotter</h1>
      </header>
      <main>
        <label>
          Input function expression:
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
        </label>
        <button onClick={plotFunction}>Draw an image</button>

        <Plot
          data={data}
          layout={{
            width: 800,
            height: 400,
            title: "Function image",
            xaxis: { title: "X-axis" },
            yaxis: { title: "Y-axis" },
          }}
        />
      </main>
    </div>
  );
};

export default App;
