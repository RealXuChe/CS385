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
    inductanceResult: 0,
  });

  const inputRef = useRef({
    Inductance: { inductance: 0, fromUnit: "", toUnit: "" },
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
  const handleInductanceConvert = () => {
    const { inductance, fromUnit, toUnit } = inputRef.current.Inductance;
    const result = UnitConverter.convertInductance(
      inductance,
      fromUnit,
      toUnit,
    );
    setState({ ...state, inductanceResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Inductance</h2>
            <TextField
              style={textfieldStyle}
              label="Value"
              onChange={(e) =>
                (inputRef.current.Inductance.inductance =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="inductanceFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="inductanceFromUnitLabel"
                value={inputRef.current.Inductance.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Inductance.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="nH">nH</MenuItem>
                <MenuItem value="µH">µH</MenuItem>
                <MenuItem value="mH">mH</MenuItem>
                <MenuItem value="H">H</MenuItem>
                <MenuItem value="kH">kH</MenuItem>
                <MenuItem value="MH">MH</MenuItem>
                <MenuItem value="GH">GH</MenuItem>
                <MenuItem value="abH">abH</MenuItem>
                <MenuItem value="Wb/A">Wb/A</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="inductanceToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="inductancetoUnitLabel"
                value={inputRef.current.Inductance.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Inductance.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="nH">nH</MenuItem>
                <MenuItem value="µH">µH</MenuItem>
                <MenuItem value="mH">mH</MenuItem>
                <MenuItem value="H">H</MenuItem>
                <MenuItem value="kH">kH</MenuItem>
                <MenuItem value="MH">MH</MenuItem>
                <MenuItem value="GH">GH</MenuItem>
                <MenuItem value="abH">abH</MenuItem>
                <MenuItem value="Wb/A">Wb/A</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button onClick={handleInductanceConvert}>Convert</Button>
            <p>Result: {state.inductanceResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
