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
    clockFrequencyResult: 0,
  });

  const inputRef = useRef({
    clockFrequency: { frequency: 0, fromUnit: "", toUnit: "" },
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

  const handleClockFrequencyConvert = () => {
    const { frequency, fromUnit, toUnit } = inputRef.current.clockFrequency;
    const result = UnitConverter.convertClockFrequency(
      frequency,
      fromUnit,
      toUnit,
    );
    setState({ ...state, clockFrequencyResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        {/* Clock Frequency Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Frequency</h2>
            <TextField
              style={textfieldStyle}
              label="Frequency"
              onChange={(e) =>
                (inputRef.current.clockFrequency.frequency =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="fromUnitLabelClock" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="fromUnitLabelClock"
                value={inputRef.current.clockFrequency.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.clockFrequency.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Hz">Hz</MenuItem>
                <MenuItem value="kHz">kHz</MenuItem>
                <MenuItem value="MHz">MHz</MenuItem>
                <MenuItem value="GHz">GHz</MenuItem>
                <MenuItem value="THz">THz</MenuItem>
                <MenuItem value="PHz">PHz</MenuItem>
                <MenuItem value="EHz">EHz</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="toUnitLabelClock" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                labelId="toUnitLabelClock"
                value={inputRef.current.clockFrequency.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.clockFrequency.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Hz">Hz</MenuItem>
                <MenuItem value="kHz">kHz</MenuItem>
                <MenuItem value="MHz">MHz</MenuItem>
                <MenuItem value="GHz">GHz</MenuItem>
                <MenuItem value="THz">THz</MenuItem>
                <MenuItem value="PHz">PHz</MenuItem>
                <MenuItem value="EHz">EHz</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleClockFrequencyConvert}>Convert</Button>
            <p>Result: {state.clockFrequencyResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
