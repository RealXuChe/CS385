"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { UnitConverter } from "@/app/toolbox/unit-conversion/UnitConverter/unitconverter";

export default function UnitConversionTool() {
  const toolName = "unit-conversion";
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

  const saveHistory = (
    unit: string,
    size: string,
    fromunit: string,
    tounit: string,
  ) => {
    let rawInfo = localStorage.getItem(toolName);
    if (rawInfo == null) {
      // 如果当前工具的历史记录是空的，则创建仅包含当前询问记录的数组
      let newInfo = {
        query: [[unit, size, fromunit, tounit]],
        time: [formatDate(new Date())],
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    } else {
      // 如果当前工具已有历史记录，则追加当前询问记录到数组末尾
      let parsedInfo = JSON.parse(rawInfo);
      let queries = parsedInfo["query"];
      let times = parsedInfo["time"];
      let nowQuery = [unit, size, fromunit, tounit];
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
  const [state, setState] = useState({
    capacitance: "",
    capacitanceResult: 0,
  });

  const inputRef = useRef({
    Capacitance: { fromUnit: "", toUnit: "" },
  });

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "50%",
    paddingTop: "32px",
  };

  const paperStyle = {
    padding: "32px",
    textAlign: "center",
    color: "#000",
    width: "260%",
    marginLeft: "-130%",
  };

  const inputlabelStyle = {
    background: `linear-gradient(to bottom, transparent 30%, white 30%)`,
    backgroundClip: "padding-box",
  };

  const textfieldStyle = {
    marginBottom: "7px",
  };

  const selectStyle1 = {
    marginBottom: "7px",
  };
  const handleCapacitanceConvert = () => {
    const { fromUnit, toUnit } = inputRef.current.Capacitance;
    const result = UnitConverter.convertCapacitance(
      parseFloat(state.capacitance),
      fromUnit,
      toUnit,
    );
    setState({ ...state, capacitanceResult: result });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      const sysval = history.split(",").slice(1);
      const sta = [sysval[0], 0];

      Object.keys(state).forEach((key, index) => {
        (state as any)[key] = sta[index];
      });
      inputRef.current.Capacitance.fromUnit = sysval[1];
      inputRef.current.Capacitance.toUnit = sysval[2];
      handleCapacitanceConvert();
    }
  }, []);

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Capacitance</h2>
            <TextField
              style={textfieldStyle}
              label="Value"
              value={state.capacitance}
              onChange={(e) => {
                setState({ ...state, capacitance: e.target.value });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="capacitanceFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="capacitanceFromUnitLabel"
                value={inputRef.current.Capacitance.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Capacitance.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="F">F</MenuItem>
                <MenuItem value="daF">daF</MenuItem>
                <MenuItem value="hF">hF</MenuItem>
                <MenuItem value="kF">kF</MenuItem>
                <MenuItem value="MF">MF</MenuItem>
                <MenuItem value="GF">GF</MenuItem>
                <MenuItem value="dF">dF</MenuItem>
                <MenuItem value="cF">cF</MenuItem>
                <MenuItem value="mF">mF</MenuItem>
                <MenuItem value="µF">µF</MenuItem>
                <MenuItem value="nF">nF</MenuItem>
                <MenuItem value="pF">pF</MenuItem>
                <MenuItem value="C/V">C/V</MenuItem>
                <MenuItem value="abF">abF</MenuItem>
                <MenuItem value="statF">statF</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="capacitanceToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="capacitanceToUnitLabel"
                value={inputRef.current.Capacitance.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Capacitance.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="F">F</MenuItem>
                <MenuItem value="daF">daF</MenuItem>
                <MenuItem value="hF">hF</MenuItem>
                <MenuItem value="kF">kF</MenuItem>
                <MenuItem value="MF">MF</MenuItem>
                <MenuItem value="GF">GF</MenuItem>
                <MenuItem value="dF">dF</MenuItem>
                <MenuItem value="cF">cF</MenuItem>
                <MenuItem value="mF">mF</MenuItem>
                <MenuItem value="µF">µF</MenuItem>
                <MenuItem value="nF">nF</MenuItem>
                <MenuItem value="pF">pF</MenuItem>
                <MenuItem value="C/V">C/V</MenuItem>
                <MenuItem value="abF">abF</MenuItem>
                <MenuItem value="statF">statF</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button
              onClick={(e) => {
                handleCapacitanceConvert();
                saveHistory(
                  "Capacitance",
                  state.capacitance,
                  inputRef.current.Capacitance.fromUnit,
                  inputRef.current.Capacitance.toUnit,
                );
              }}
            >
              Convert
            </Button>
            <p>Result: {state.capacitanceResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
