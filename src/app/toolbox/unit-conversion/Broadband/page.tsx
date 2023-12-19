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
    bandwidthResult: 0,
  });

  const inputRef = useRef({
    bandwidth: { speed: 0, fromUnit: "", toUnit: "" },
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
  const handleBandwidthConvert = () => {
    const { speed, fromUnit, toUnit } = inputRef.current.bandwidth;
    const result = UnitConverter.convertBandwidth(speed, fromUnit, toUnit);
    setState({ ...state, bandwidthResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        {/* Network Bandwidth Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Data Transmission</h2>
            <TextField
              style={textfieldStyle}
              label="Speed"
              onChange={(e) =>
                (inputRef.current.bandwidth.speed =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="bandwidthFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="bandwidthFromUnitLabel"
                value={inputRef.current.bandwidth.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.bandwidth.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="bps">bps</MenuItem>
                <MenuItem value="Kbps">Kbps</MenuItem>
                <MenuItem value="Mbps">Mbps</MenuItem>
                <MenuItem value="Gbps">Gbps</MenuItem>
                <MenuItem value="Tbps">Tbps</MenuItem>
                <MenuItem value="Pbps">Pbps</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="bandwidthToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                labelId="bandwidthToUnitLabel"
                value={inputRef.current.bandwidth.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.bandwidth.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="bps">bps</MenuItem>
                <MenuItem value="Kbps">Kbps</MenuItem>
                <MenuItem value="Mbps">Mbps</MenuItem>
                <MenuItem value="Gbps">Gbps</MenuItem>
                <MenuItem value="Tbps">Tbps</MenuItem>
                <MenuItem value="Pbps">Pbps</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button onClick={handleBandwidthConvert}>Convert</Button>
            <p>Result: {state.bandwidthResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
