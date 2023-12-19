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
    conductivityResult: 0,
  });

  const inputRef = useRef({
    Conductivity: { conductivity: 0, fromUnit: "", toUnit: "" },
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
  const handleConductivityConvert = () => {
    const { conductivity, fromUnit, toUnit } = inputRef.current.Conductivity;
    const result = UnitConverter.convertConductivity(
      conductivity,
      fromUnit,
      toUnit,
    );
    setState({ ...state, conductivityResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Conductivity</h2>
            <TextField
              style={textfieldStyle}
              label="Value"
              onChange={(e) =>
                (inputRef.current.Conductivity.conductivity =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="conductivityFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="capacitanceFromUnitLabel"
                value={inputRef.current.Conductivity.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Conductivity.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="S/m">S/m</MenuItem>
                <MenuItem value="kS/m">kS/m</MenuItem>
                <MenuItem value="mS/m">mS/m</MenuItem>
                <MenuItem value="µS/cm">µS/cm</MenuItem>
                <MenuItem value="Ω·m">Ω·m</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="conductivityToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="conductivityToUnitLabel"
                value={inputRef.current.Conductivity.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Conductivity.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="S/m">S/m</MenuItem>
                <MenuItem value="kS/m">kS/m</MenuItem>
                <MenuItem value="mS/m">mS/m</MenuItem>
                <MenuItem value="µS/cm">µS/cm</MenuItem>
                <MenuItem value="Ω·m">Ω·m</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button onClick={handleConductivityConvert}>Convert</Button>
            <p>Result: {state.conductivityResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
