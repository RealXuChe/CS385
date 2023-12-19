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
    capacitanceResult: 0,
  });

  const inputRef = useRef({
    Capacitance: { capacitance: 0, fromUnit: "", toUnit: "" },
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
    const { capacitance, fromUnit, toUnit } = inputRef.current.Capacitance;
    const result = UnitConverter.convertCapacitance(
      capacitance,
      fromUnit,
      toUnit,
    );
    setState({ ...state, capacitanceResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Capacitance</h2>
            <TextField
              style={textfieldStyle}
              label="Value"
              onChange={(e) =>
                (inputRef.current.Capacitance.capacitance =
                  parseFloat(e.target.value) || 0)
              }
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
            <Button onClick={handleCapacitanceConvert}>Convert</Button>
            <p>Result: {state.capacitanceResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
