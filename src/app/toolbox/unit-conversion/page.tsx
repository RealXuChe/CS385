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

class UnitConverter {
  static convertStorageSize(
    size: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      B: 1,
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
      TB: 1024 * 1024 * 1024 * 1024,
      PB: 1024 * 1024 * 1024 * 1024 * 1024,
      EB: 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
    };

    return (size * units[fromUnit]) / units[toUnit];
  }

  static convertClockFrequency(
    frequency: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      Hz: 1,
      kHz: 1000,
      MHz: 1000 * 1000,
      GHz: 1000 * 1000 * 1000,
    };

    return (frequency * units[fromUnit]) / units[toUnit];
  }

  static convertFileSize(
    size: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      Sector: 512,
      Cluster: 4096,
      Block: 8192,
      AllocationUnit: 1024 * 1024,
    };

    return (size * units[fromUnit]) / units[toUnit];
  }

  static convertBandwidth(
    speed: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      bps: 1,
      Kbps: 1000,
      Mbps: 1000 * 1000,
      Gbps: 1000 * 1000 * 1000,
      Tbps: 1000 * 1000 * 1000 * 1000,
    };

    return (speed * units[fromUnit]) / units[toUnit];
  }
}

export default function UnitConversionTool() {
  const [state, setState] = useState({
    storageSizeResult: 0,
    clockFrequencyResult: 0,
    fileSizeResult: 0,
    bandwidthResult: 0,
  });

  const inputRef = useRef({
    storageSize: { size: 0, fromUnit: "", toUnit: "" },
    clockFrequency: { frequency: 0, fromUnit: "", toUnit: "" },
    fileSize: { size: 0, fromUnit: "", toUnit: "" },
    bandwidth: { speed: 0, fromUnit: "", toUnit: "" },
  });

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "16px",
  };

  const paperStyle = {
    padding: "16px",
    textAlign: "center",
    color: "#000",
  };

  const handleStorageSizeConvert = () => {
    const { size, fromUnit, toUnit } = inputRef.current.storageSize;
    const result = UnitConverter.convertStorageSize(size, fromUnit, toUnit);
    setState({ ...state, storageSizeResult: result });
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

  const handleFileSizeConvert = () => {
    const { size, fromUnit, toUnit } = inputRef.current.fileSize;
    const result = UnitConverter.convertFileSize(size, fromUnit, toUnit);
    setState({ ...state, fileSizeResult: result });
  };

  const handleBandwidthConvert = () => {
    const { speed, fromUnit, toUnit } = inputRef.current.bandwidth;
    const result = UnitConverter.convertBandwidth(speed, fromUnit, toUnit);
    setState({ ...state, bandwidthResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        {/* Storage Size Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Storage Size</h2>
            <TextField
              style={{ marginBottom: "4px" }}
              label="Size"
              onChange={(e) =>
                (inputRef.current.storageSize.size =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="fromUnitLabel">From Unit</InputLabel>
              <Select
                style={{ marginBottom: "4px" }}
                labelId="fromUnitLabel"
                value={inputRef.current.storageSize.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.storageSize.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="KB">KB</MenuItem>
                <MenuItem value="MB">MB</MenuItem>
                <MenuItem value="GB">GB</MenuItem>
                <MenuItem value="TB">TB</MenuItem>
                <MenuItem value="PB">PB</MenuItem>
                <MenuItem value="EB">EB</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="toUnitLabel">To Unit</InputLabel>
              <Select
                labelId="toUnitLabel"
                value={inputRef.current.storageSize.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.storageSize.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="KB">KB</MenuItem>
                <MenuItem value="MB">MB</MenuItem>
                <MenuItem value="GB">GB</MenuItem>
                <MenuItem value="TB">TB</MenuItem>
                <MenuItem value="PB">PB</MenuItem>
                <MenuItem value="EB">EB</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleStorageSizeConvert}>Convert</Button>
            <p>Result: {state.storageSizeResult}</p>
          </Paper>
        </Grid>

        {/* Clock Frequency Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Clock Frequency</h2>
            <TextField
              style={{ marginBottom: "4px" }}
              label="Frequency"
              onChange={(e) =>
                (inputRef.current.clockFrequency.frequency =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="fromUnitLabelClock">From Unit</InputLabel>
              <Select
                style={{ marginBottom: "4px" }}
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
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="toUnitLabelClock">To Unit</InputLabel>
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
              </Select>
            </FormControl>
            <Button onClick={handleClockFrequencyConvert}>Convert</Button>
            <p>Result: {state.clockFrequencyResult}</p>
          </Paper>
        </Grid>

        {/* File Size Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>File Storage</h2>
            <TextField
              style={{ marginBottom: "4px" }}
              label="Size"
              onChange={(e) =>
                (inputRef.current.fileSize.size =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="fromUnitLabelFile">From Unit</InputLabel>
              <Select
                style={{ marginBottom: "4px" }}
                labelId="fromUnitLabelFile"
                value={inputRef.current.fileSize.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.fileSize.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Sector">Sector</MenuItem>
                <MenuItem value="Cluster">Cluster</MenuItem>
                <MenuItem value="Block">Block</MenuItem>
                <MenuItem value="AllocationUnit">AllocationUnit</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="toUnitLabelFile">To Unit</InputLabel>
              <Select
                labelId="toUnitLabelFile"
                value={inputRef.current.fileSize.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.fileSize.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Sector">Sector</MenuItem>
                <MenuItem value="Cluster">Cluster</MenuItem>
                <MenuItem value="Block">Block</MenuItem>
                <MenuItem value="AllocationUnit">AllocationUnit</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleFileSizeConvert}>Convert</Button>
            <p>Result: {state.fileSizeResult}</p>
          </Paper>
        </Grid>

        {/* Network Bandwidth Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Network Bandwidth</h2>
            <TextField
              style={{ marginBottom: "4px" }}
              label="Speed"
              onChange={(e) =>
                (inputRef.current.bandwidth.speed =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="bandwidthFromUnitLabel">From Unit</InputLabel>
              <Select
                style={{ marginBottom: "4px" }}
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
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="bandwidthToUnitLabel">To Unit</InputLabel>
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
