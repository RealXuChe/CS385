"use client";
import React, { useState, useRef, useEffect } from "react";
import Plot from "react-plotly.js";
import { Button, TextField, Container, Paper } from "@mui/material";

const Home: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const graphRef = useRef<any>(null);

  const toolName = "Function_diagram";

  const formatDate = (date: Date) => {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2)
    );
  };

  const [history, setHistory] = useState<string[]>([]);
  const [isZooming, setIsZooming] = useState(false);

  const plotFunction = (xRange: [number, number]) => {
    try {
      const xValues = [];
      const yValues = [];

      const processedExpression = expression
        .replace(/\bsin\b/g, "Math.sin")
        .replace(/\bcos\b/g, "Math.cos")
        .replace(/\btan\b/g, "Math.tan")
        .replace(/\blog\b/g, "Math.log")
        .replace(/\bexp\b/g, "Math.exp")
        .replace(/\^/g, "**");

      const func = new Function("x", `return ${processedExpression}`);

      for (let x = xRange[0]; x <= xRange[1]; x += 0.1) {
        xValues.push(x);
        yValues.push(func(x));
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

      if (expression.trim() !== "" && !isZooming) {
        if (!history.includes(expression)) {
          setHistory((prevHistory) => [...prevHistory, expression]);
          saveHistory(expression);
        }
      }

      setIsZooming(false);
    } catch (error) {
      console.error("Invalid expression:", error);
      setData([]);
    }
  };

  const handleRelayout = (eventData: any) => {
    const xRange: [number, number] = [
      eventData["xaxis.range[0]"],
      eventData["xaxis.range[1]"],
    ];

    if (xRange[0] !== -10 || xRange[1] !== 10) {
      setIsZooming(true);
    }

    plotFunction(xRange);
  };

  const saveHistory = (text: string) => {
    let rawInfo = localStorage.getItem(toolName);
    if (rawInfo == null) {
      let newInfo = {
        query: [text],
        time: [formatDate(new Date())],
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    } else {
      let parsedInfo = JSON.parse(rawInfo);
      let queries = parsedInfo["query"];
      let times = parsedInfo["time"];
      let nowQuery = text;
      let nowTime = formatDate(new Date());
      queries.push(nowQuery);
      times.push(nowTime);
      let newInfo = {
        query: queries,
        time: times,
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    }
  };

  const loadHistoryImage = (expression: string) => {
    try {
      const xValues = [];
      const yValues = [];

      const processedExpression = expression
        .replace(/\bsin\b/g, "Math.sin")
        .replace(/\bcos\b/g, "Math.cos")
        .replace(/\btan\b/g, "Math.tan")
        .replace(/\blog\b/g, "Math.log")
        .replace(/\bexp\b/g, "Math.exp")
        .replace(/\^/g, "**");

      const func = new Function("x", `return ${processedExpression}`);

      for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(func(x));
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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      setExpression(history);
      loadHistoryImage(history);
    }
  }, []);

  return (
    <Container
      maxWidth="md"
      style={{
        backgroundColor: "rgb(243, 244, 246)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Function Image Plotter</h1>
        <TextField
          label="Input function expression"
          variant="outlined"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          onClick={() => plotFunction([-10, 10])}
          style={{ backgroundColor: "#6366f1", color: "#fff" }}
        >
          Draw an image
        </Button>
      </Paper>

      <Plot
        ref={graphRef}
        data={data}
        layout={{
          width: 800,
          height: 400,
          title: "Function image",
          xaxis: { title: "X-axis" },
          yaxis: { title: "Y-axis" },
          paper_bgcolor: "rgb(243, 244, 246)",
        }}
        onRelayout={handleRelayout}
      />
    </Container>
  );
};

export default Home;
