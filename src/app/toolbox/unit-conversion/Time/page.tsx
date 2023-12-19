"use client";
import React, { useState, useRef } from "react";
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
  const [state, setState] = useState({
    timeResult: 0,
  });

  const inputRef = useRef({
    Time: { time: 0, fromUnit: "", toUnit: "" },
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
  const handleTimeConvert = () => {
    const { time, fromUnit, toUnit } = inputRef.current.Time;
    const result = UnitConverter.convertTime(time, fromUnit, toUnit);
    setState({ ...state, timeResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Time</h2>
            <TextField
              style={textfieldStyle}
              label="value"
              onChange={(e) =>
                (inputRef.current.Time.time = parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="timeFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="timeFromUnitLabel"
                value={inputRef.current.Time.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Time.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Years">Years</MenuItem>
                <MenuItem value="Months">Months</MenuItem>
                <MenuItem value="Weeks">Weeks</MenuItem>
                <MenuItem value="Days">Days</MenuItem>
                <MenuItem value="h">h</MenuItem>
                <MenuItem value="min">min</MenuItem>
                <MenuItem value="s">s</MenuItem>
                <MenuItem value="ms">ms</MenuItem>
                <MenuItem value="µs">µs</MenuItem>
                <MenuItem value="ns">ns</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="timeToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="timetoUnitLabel"
                value={inputRef.current.Time.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Time.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Years">Years</MenuItem>
                <MenuItem value="Months">Months</MenuItem>
                <MenuItem value="Weeks">Weeks</MenuItem>
                <MenuItem value="Days">Days</MenuItem>
                <MenuItem value="h">h</MenuItem>
                <MenuItem value="min">min</MenuItem>
                <MenuItem value="s">s</MenuItem>
                <MenuItem value="ms">ms</MenuItem>
                <MenuItem value="µs">µs</MenuItem>
                <MenuItem value="ns">ns</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button onClick={handleTimeConvert}>Convert</Button>
            <p>Result: {state.timeResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
