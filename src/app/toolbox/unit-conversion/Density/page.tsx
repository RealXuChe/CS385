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
    densityResult: 0,
  });

  const inputRef = useRef({
    Density: { density: 0, fromUnit: "", toUnit: "" },
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
  const handleDensityConvert = () => {
    const { density, fromUnit, toUnit } = inputRef.current.Density;
    const result = UnitConverter.convertDensity(density, fromUnit, toUnit);
    setState({ ...state, densityResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Density</h2>
            <TextField
              style={textfieldStyle}
              label="Value"
              onChange={(e) =>
                (inputRef.current.Density.density =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="densityFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="densityFromUnitLabel"
                value={inputRef.current.Density.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Density.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="kg/cm³">kg/cm³</MenuItem>
                <MenuItem value="kg/dm³">kg/dm³</MenuItem>
                <MenuItem value="kg/m³">kg/m³</MenuItem>
                <MenuItem value="g/cm³">g/cm³</MenuItem>
                <MenuItem value="g/dm³">g/dm³</MenuItem>
                <MenuItem value="kg/dm³">kg/dm³</MenuItem>
                <MenuItem value="g/m³">g/m³</MenuItem>
                <MenuItem value="oz/gal">oz/gal</MenuItem>
                <MenuItem value="lb/ft³">lb/ft³</MenuItem>
                <MenuItem value="lb/in³">lb/in³</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="densityToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="densitytoUnitLabel"
                value={inputRef.current.Density.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Density.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="kg/cm³">kg/cm³</MenuItem>
                <MenuItem value="kg/dm³">kg/dm³</MenuItem>
                <MenuItem value="kg/m³">kg/m³</MenuItem>
                <MenuItem value="g/cm³">g/cm³</MenuItem>
                <MenuItem value="g/dm³">g/dm³</MenuItem>
                <MenuItem value="kg/dm³">kg/dm³</MenuItem>
                <MenuItem value="g/m³">g/m³</MenuItem>
                <MenuItem value="oz/gal">oz/gal</MenuItem>
                <MenuItem value="lb/ft³">lb/ft³</MenuItem>
                <MenuItem value="lb/in³">lb/in³</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button onClick={handleDensityConvert}>Convert</Button>
            <p>Result: {state.densityResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
