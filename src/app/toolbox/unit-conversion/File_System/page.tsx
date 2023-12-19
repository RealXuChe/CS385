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
    fileSizeResult: 0,
  });

  const inputRef = useRef({
    fileSize: { size: 0, fromUnit: "", toUnit: "" },
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

  const handleFileSizeConvert = () => {
    const { size, fromUnit, toUnit } = inputRef.current.fileSize;
    const result = UnitConverter.convertFileSize(size, fromUnit, toUnit);
    setState({ ...state, fileSizeResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        {/* File Size Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>File Storage</h2>
            <TextField
              style={textfieldStyle}
              label="Size"
              onChange={(e) =>
                (inputRef.current.fileSize.size =
                  parseFloat(e.target.value) || 0)
              }
            />
            <FormControl fullWidth>
              <InputLabel id="fromUnitLabelFile" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
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
              <InputLabel id="toUnitLabelFile" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
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
      </Grid>
    </div>
  );
}
