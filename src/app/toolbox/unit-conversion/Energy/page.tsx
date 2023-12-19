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
    energyResult: 0,
  });

  const inputRef = useRef({
    Energy: { energy: 0, fromUnit: "", toUnit: "" },
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
  const handleEnergyConvert = () => {
    const { energy, fromUnit, toUnit } = inputRef.current.Energy;
    const result = UnitConverter.convertEnergy(energy, fromUnit, toUnit);
    setState({ ...state, energyResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Energy</h2>
            <TextField
              style={textfieldStyle}
              label="value"
              onChange={(e) =>
                (inputRef.current.Energy.energy =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="energyFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="energyFromUnitLabel"
                value={inputRef.current.Energy.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Energy.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="MJ">MJ</MenuItem>
                <MenuItem value="kJ">kJ</MenuItem>
                <MenuItem value="J">J</MenuItem>
                <MenuItem value="kW·h">kW·h</MenuItem>
                <MenuItem value="Mcal">Mcal</MenuItem>
                <MenuItem value="kcal">kcal</MenuItem>
                <MenuItem value="cal">cal</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="energyToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="energytoUnitLabel"
                value={inputRef.current.Energy.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Energy.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="MJ">MJ</MenuItem>
                <MenuItem value="kJ">kJ</MenuItem>
                <MenuItem value="J">J</MenuItem>
                <MenuItem value="kW·h">kW·h</MenuItem>
                <MenuItem value="Mcal">Mcal</MenuItem>
                <MenuItem value="kcal">kcal</MenuItem>
                <MenuItem value="cal">cal</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button onClick={handleEnergyConvert}>Convert</Button>
            <p>Result: {state.energyResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
