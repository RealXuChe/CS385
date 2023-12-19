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
    powerResult: 0,
  });

  const inputRef = useRef({
    Power: { power: 0, fromUnit: "", toUnit: "" },
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
  const handlePowerConvert = () => {
    const { power, fromUnit, toUnit } = inputRef.current.Power;
    const result = UnitConverter.convertPower(power, fromUnit, toUnit);
    setState({ ...state, powerResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Power</h2>
            <TextField
              style={textfieldStyle}
              label="value"
              onChange={(e) =>
                (inputRef.current.Power.power = parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="powerFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="powerFromUnitLabel"
                value={inputRef.current.Power.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Power.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="MW">MW</MenuItem>
                <MenuItem value="kW">kW</MenuItem>
                <MenuItem value="W">W</MenuItem>
                <MenuItem value="mW">mW</MenuItem>
                <MenuItem value="hp">hp</MenuItem>
                <MenuItem value="ps">ps</MenuItem>
                <MenuItem value="J/s">J/s</MenuItem>
                <MenuItem value="ft·lb/s">ft·lb/s</MenuItem>
                <MenuItem value="Btu/s">Btu/s</MenuItem>
                <MenuItem value="cal/h">cal/h</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="powerToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="powerToUnitLabel"
                value={inputRef.current.Power.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Power.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="MW">MW</MenuItem>
                <MenuItem value="kW">kW</MenuItem>
                <MenuItem value="W">W</MenuItem>
                <MenuItem value="mW">mW</MenuItem>
                <MenuItem value="hp">hp</MenuItem>
                <MenuItem value="ps">ps</MenuItem>
                <MenuItem value="J/s">J/s</MenuItem>
                <MenuItem value="ft·lb/s">ft·lb/s</MenuItem>
                <MenuItem value="Btu/s">Btu/s</MenuItem>
                <MenuItem value="cal/h">cal/h</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button onClick={handlePowerConvert}>Convert</Button>
            <p>Result: {state.powerResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
